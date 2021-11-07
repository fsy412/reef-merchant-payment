import { selectMerchants, selectLatestPayments, selectStatistics } from "../service/db_service.js"

export async function merchantList(ctx) {
    let res = await selectMerchants()
    ctx.body = {
        errcode: 0,
        errmsg: "success",
        data: { res }
    }
}

export async function latestPayments(ctx) {
    let res = await selectLatestPayments()
    ctx.body = {
        errcode: 0,
        errmsg: "success",
        data: { res }
    }
}

export async function statistic(ctx) {
    let res = await selectStatistics()
    console.log('111', res)
    ctx.body = {
        errcode: 0,
        errmsg: "success",
        data: { res }
    }
}