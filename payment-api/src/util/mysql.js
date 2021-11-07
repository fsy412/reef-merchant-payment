import mysql from 'mysql'
import { CONFIG } from '../config.js'
let db = mysql.createConnection({
    host: CONFIG.Host,
    user: CONFIG.User,
    password: CONFIG.Password,
    database: CONFIG.Db,
    port: CONFIG.Port
});

db.connect(err => {
    if (err) throw err;
    console.log(`mysql ${CONFIG.Db} connncted success!`);
})

export default db