
import { timeStampNow } from '../util/time.js'
import { getAddressBalance, transferToMainAccount } from './reef_service.js'
import { insertPaymentLog } from "../service/db_service.js"
import request from 'request'

const SECOND = 1
let payments = new Map();

function addPayment(payment) {
    payments.set(payment.address, payment);
}

export function createPayment(reefAddress, pair, webhook, merchantAccount) {
    let payment = {
        address: reefAddress,
        pair: pair,
        state: "paying",
        webhook: webhook,
        createTime: timeStampNow(),
        balance: 0,
        merchantAccount: merchantAccount,
        tx: "",
    }
    addPayment(payment)
}

export function updatePaymentTx(address, tx) {
    let payment = payments.get(address);
    payment.tx = tx
}

function webHookNotify(apiUrl, data) {
    console.log(`webhook notify:${apiUrl}, data:${data}`)
    return new Promise((resolve, reject) => {
        request({
            url: apiUrl,
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(data)
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body)
            } else {
                reject(error)
            }
        });
    })
}

async function update() {
    for (let [address, payment] of payments.entries()) {
        switch (payment.state) {
            case 'paying':
                let balance = await getAddressBalance(payment.address)
                if (balance != '0') {
                    payment.balance = balance
                    payment.state = 'transferring'
                    await webHookNotify(payment.webhook, { "paymentAddress": payment.address })
                } else {
                    if (timeStampNow() - payment.createTime > 30 * SECOND) {
                        payments.delete(address)
                    }
                }
                break
            case 'transferring':
                transferToMainAccount(payment.address, payment.merchantAccount, payment.balance, payment.pair)
                insertPaymentLog(payment.address, payment.merchantAccount, "", payment.balance, payment.tx)
                payment.state = 'done'
                break
            case 'done':
                payments.delete(address)
                break
            case 'timeout':
                payments.delete(address)
                break
            default:
        }
    }
}

setInterval(update, 1000);

export function startPaymentService() {

}