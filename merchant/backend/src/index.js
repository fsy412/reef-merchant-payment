import Koa from 'koa';
import KoaRouter from 'koa-router';
import cors from '@koa/cors';
import request from 'request'
import { CONFIG } from './config.js'

const app = new Koa();
const router = new KoaRouter();

let notifications = []

export function requestApi(apiUrl, requestData) {
    return new Promise((resolve, reject) => {
        request({
            url: apiUrl,
            method: "POST",
            headers: {
                "apikey": CONFIG.APIKey,
                'Content-Type': 'application/json',
            },
            body: requestData
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body)
            } else {
                reject(error)
            }
        });
    })
}

function getBody(ctx) {
    return new Promise((resolve, reject) => {
        try {
            let recv = "";
            ctx.req.addListener('data', (data) => {
                recv += data
            })
            ctx.req.addListener("end", function () {
                resolve(recv)
            })
        } catch (err) {
            reject(err)
        }
    })
}

router.post("/payment", async (ctx) => {
    ctx.body = await requestApi(`${CONFIG.APIUrl}payment`)
})

router.get("/payment_history", async (ctx) => {
    ctx.body = await requestApi(`${CONFIG.APIUrl}payment_history`)
});

router.post("/payment_tx", async (ctx) => {
    let data = await getBody(ctx)
    console.log("/payment_tx", data)
    ctx.body = await requestApi(`${CONFIG.APIUrl}payment_tx`, data)
})

router.post("/search_payment_history", async (ctx) => {
    let data = await getBody(ctx)
    ctx.body = await requestApi(`${CONFIG.APIUrl}search_payment_history`, data)
})

router.post("/webhook", async (ctx) => {
    let body = await getBody(ctx)
    let { paymentAddress } = JSON.parse(body)
    console.log("/webhook ", paymentAddress)
    notifications.push(paymentAddress)
    ctx.body = {
        errcode: 0,
        errmsg: "success",
    }
});

router.post("/query_notification", async (ctx) => {
    if (notifications.length > 0) {
        ctx.body = {
            errcode: 0,
            errmsg: "success",
            data: { "paymentAddress": notifications[0] }
        }
        notifications = []
        return
    }
    ctx.body = {
        errcode: 0,
        errmsg: "success",
    }
})

app.use(cors()).use(router.routes()).use(router.allowedMethods());
console.log(`listening on port ${CONFIG.ListenPort}`)
app.listen(CONFIG.ListenPort, "127.0.0.1");