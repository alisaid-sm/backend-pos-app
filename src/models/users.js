const db = require('../config/connection')
const fs = require('fs')
const { NULL } = require('mysql2/lib/constants/types')

const users = {
    register: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO users SET ?`, data, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    login: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users WHERE email = ?`, data.email, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    updateRefreshToken: (token, id) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE users SET refreshToken= ? WHERE id= ?`, [token, id], (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    checkRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users WHERE refreshToken = ?`, refreshToken, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    }
}


module.exports = users