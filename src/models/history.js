const db = require('../config/connection')

const history = {
    getAll: (search, field, sortType, offset, limit) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * , (SELECT COUNT(*) FROM history) AS count FROM history WHERE cashier LIKE '%${search}%' ORDER BY ${field} ${sortType} LIMIT ${offset}, ${limit}`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })

    },
    getDetail: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM history WHERE invoices='${id}'`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    insert: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO history (cashier, date, orders, amount) 
            VALUES ('${data.cashier}', '${data.date}', '${data.orders}','${data.amount}')`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    update: (id, data) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE history SET 
                cashier='${data.cashier}', 
                date='${data.date}', 
                orders='${data.orders}', 
                amount='${data.amount}' WHERE invoices='${id}'`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM history WHERE invoices='${id}'`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    }
}


module.exports = history