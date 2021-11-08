import Koa from "koa";
import KoaRouter from "koa-router";
import cors from '@koa/cors';

import { startPaymentService } from './service/payment_service.js'
import { payment, paymentHistory, paymentTx, searchPaymentHistory } from './api/payment.js'
import { register, login, merchantInfo } from './api/merchant.js'
import { merchantList, latestPayments, statistic } from "./api/pannel.js"
import { CONFIG } from './config.js'

const app = new Koa();
const router = new KoaRouter();

startPaymentService()

// payment
router.post("/api/payment", payment);
router.post("/api/payment_history", paymentHistory);
router.post("/api/payment_tx", paymentTx)
router.post("/api/search_payment_history", searchPaymentHistory)
// merchant
router.post("/api/merchant/register", register);
router.post("/api/merchant/login", login);
router.post("/api/merchant/info", merchantInfo)
// pannel
router.get("/api/merchant_list", merchantList);
router.get("/api/latest_payments", latestPayments);
router.get("/api/stat", statistic);

app.use(cors()).use(router.routes()).use(router.allowedMethods());
console.log(`listening on port ${CONFIG.ListenPort}`)
app.listen(CONFIG.ListenPort, "127.0.0.1");