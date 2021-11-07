import { getBody } from "../util/http.js"
import { insertMerchant } from "../service/db_service.js"

function genAPIkey(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

export async function register(ctx) {
    let body = await getBody(ctx)
    console.log('api payment', body)
    try {
        let { merchantName, account, webHookUrl } = JSON.parse(body)
        let apiKey = genAPIkey(40)
        await insertMerchant(merchantName, account, webHookUrl, apiKey)
        ctx.body = {
            errcode: 0,
            errmsg: "success",
            data: { apiKey }
        }
    }
    catch (error) {
        console.log("register", error)
    }
}

export async function login(ctx) {
    let body = await getBody(ctx)
    console.log('api payment', body)
    ctx.body = {
        errcode: 0,
        errmsg: "success",
    }
}