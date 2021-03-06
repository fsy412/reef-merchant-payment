import db from "../util/mysql.js"
import { timeStampNow } from "../util/time.js";

export function insertMerchant(merchantName, account, webHookUrl, apiKey) {
    let sql = 'INSERT INTO merchant(merchant_name, account, webhook, apikey, create_time) VALUES(?,?,?,?,?)';
    let params = [merchantName, account, webHookUrl, apiKey, timeStampNow()];
    db.query(sql, params, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
        }
    });
}

export function insertPaymentLog(paymentAddress, merchant, sender, balance, tx,) {
    let sql = 'INSERT INTO payment_log(payment_address, merchant, sender, balance, tx, create_time) VALUES(?,?,?,?,?,?)';
    let params = [paymentAddress, merchant, sender, balance / 1e18, tx, timeStampNow()];
    db.query(sql, params, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message, sql);
            return;
        }
    });
}

export async function selectPaymentLog(merchant) {
    return new Promise((resolve, reject) => {
        try {
            let sql = 'SELECT * FROM payment_log where merchant = ? order by create_time desc';
            let params = [merchant];
            db.query(sql, params, (err, results, fields) => {
                if (err) {
                    console.log('[SELECT ERROR] -', err.message);
                    reject(err)
                };
                resolve(results)
            });
        } catch (err) {
            reject(err)
        }
    })
}

export async function selectPaymentLogByAddress(address, merchant) {
    return new Promise((resolve, reject) => {
        try {
            let sql = `SELECT * FROM payment_log WHERE merchant='${merchant}' and payment_address LIKE '%${address}%'`;
            db.query(sql, (err, results, fields) => {
                if (err) {
                    console.log('[SELECT ERROR] -', err.message);
                    reject(err)
                };
                resolve(results)
            });
        } catch (err) {
            reject(err)
        }
    })
}

export async function getWebHookUrlAndMerchantAccount(apikey) {
    return new Promise((resolve, reject) => {
        try {
            let sql = 'SELECT webhook, account FROM merchant WHERE apikey = ?';
            let params = [apikey]
            db.query(sql, params, (err, results, fields) => {
                if (err) {
                    console.log('[SELECT ERROR] -', err.message);
                    reject(err)
                };
                resolve(results)
            });
        } catch (err) {
            reject(err)
        }
    })
}

export async function selectMerchants() {
    return new Promise((resolve, reject) => {
        try {
            let sql = 'SELECT * from merchant';
            db.query(sql, (err, results, fields) => {
                if (err) {
                    console.log('[SELECT ERROR] -', err.message);
                    reject(err)
                };
                resolve(results)
            });
        } catch (err) {
            reject(err)
        }
    })
}

export async function selectLatestPayments() {
    return new Promise((resolve, reject) => {
        try {
            let sql = 'SELECT * from payment_log order by create_time desc';
            db.query(sql, (err, results, fields) => {
                if (err) {
                    console.log('[SELECT ERROR] -', err.message);
                    reject(err)
                };
                resolve(results)
            });
        } catch (err) {
            reject(err)
        }
    })
}

export async function selectStatistics() {
    let totalReefs = new Promise((resolve, reject) => {
        let sql = 'SELECT SUM(balance)as num FROM payment_log;';
        db.query(sql, (err, results, fields) => {
            if (err) {
                console.log('[SELECT ERROR] -', err.message);
                reject(err)
            };
            resolve(results[0].num)
        });
    });
    let totalPayments = new Promise((resolve, reject) => {
        let sql = 'SELECT COUNT(*) as num FROM payment_log;';
        db.query(sql, (err, results, fields) => {
            if (err) {
                console.log('[SELECT ERROR] -', err.message);
                reject(err)
            };
            resolve(results[0].num)
        });
    });
    let totalMerchants = new Promise((resolve, reject) => {
        let sql = 'SELECT COUNT(*) as num FROM merchant;';
        db.query(sql, (err, results, fields) => {
            if (err) {
                console.log('[SELECT ERROR] -', err.message);
                reject(err)
            };
            resolve(results[0].num)
        });
    });

    return Promise.all([totalMerchants, totalPayments, totalReefs])
}


export async function selectMerchantInfo(account) {
    return new Promise((resolve, reject) => {
        try {
            let sql = 'SELECT * from merchant where account = ?';
            db.query(sql, [account], (err, results, fields) => {
                if (err) {
                    console.log('[SELECT ERROR] -', err.message);
                    reject(err)
                };
                resolve(results)
            });
        } catch (err) {
            reject(err)
        }
    })
}

let pingInterval = setInterval(() => {
    console.log('ping db')
    db.ping((err) => {
        if (err) {
            console.log('ping error: ' + JSON.stringify(err));
        }
    });
}, 3600000 * 3);