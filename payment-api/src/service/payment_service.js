
import { timeStampNow } from '../util/time.js'
import { getAddressBalance, transferToMainAccount } from './reef_service.js'
import { insertPaymentLog } from "../service/db_service.js"
import request from 'request'
import crypto from 'crypto'
let md5 = crypto.createHash('md5');

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
        crateTime: timeStampNow(),
        payTime: 0,
        transferTime: 0,
        doneTime: 0,
        balance: 0,
        merchantAccount: merchantAccount,
        merchantApiKey: "",
        tx: "",
    }
    addPayment(payment)
}

export function updatePaymentTx(address, tx) {
    let payment = payments.get(address);
    payment.tx = tx
    payments.set(payment.address, payment)
}

function webHookNotify(apiUrl, params, sign) {
    console.log(`webhook notify:${apiUrl}, params:${params}, sign:${sign}`)
    return new Promise((resolve, reject) => {
        request({
            url: apiUrl,
            method: "POST",
            headers: { "sign": sign },
            data: params
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
                    await webHookNotify(payment.webhook, {}, "sign_xxxxxxxx")
                } else {
                    if (timeStampNow() - payment.crateTime > 30 * SECOND) {
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