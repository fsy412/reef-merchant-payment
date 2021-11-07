import { genReefPayAddress } from '../service/reef_service.js'
import { createPayment, updatePaymentTx, } from "../service/payment_service.js"
import { getWebHookUrlAndMerchantAccount, selectPaymentLog, selectPaymentLogByAddress } from "../service/db_service.js"
import { getBody } from "../util/http.js"

export async function payment(ctx) {
    let { address, newPair } = await genReefPayAddress(); // gen reef address
    let apiKey = ctx.request.headers['apikey']
    let res = await getWebHookUrlAndMerchantAccount(apiKey)
    let webhook = res[0].webhook
    let merchantAccount = res[0].account
    createPayment(address, newPair, webhook, merchantAccount)
    ctx.body = {
        errcode: 0,
        errmsg: "success",
        data: address
    }
}

export async function paymentTx(ctx) {
    let body = await getBody(ctx)
    try {
        let { paymentAddress, tx } = JSON.parse(body)
        updatePaymentTx(paymentAddress, tx)
    }
    catch (error) {
        console.log("paymentTx", error)
    }
    ctx.body = {
        errcode: 0,
        errmsg: "success",
    }
}

export async function paymentHistory(ctx) {
    let apiKey = ctx.request.headers['apikey']
    let data = await getWebHookUrlAndMerchantAccount(apiKey)
    let merchantAccount = data[0].account
    let res = await selectPaymentLog(merchantAccount)
    ctx.body = {
        errcode: 0,
        errmsg: "success",
        data: { res }
    }
}

export async function searchPaymentHistory(ctx) {
    let apiKey = ctx.request.headers['apikey']
    let body = await getBody(ctx)
    let { address } = JSON.parse(body)
    let data = await getWebHookUrlAndMerchantAccount(apiKey)
    let merchantAccount = data[0].account
    let res = await selectPaymentLogByAddress(address, merchantAccount)
    ctx.body = {
        errcode: 0,
        errmsg: "success",
        data: { res }
    }
}