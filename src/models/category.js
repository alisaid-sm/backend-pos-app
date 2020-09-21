const db = require('../config/connection')

const category = {
    getAll: (search, field, sortType, offset, limit) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * , (SELECT COUNT(*) FROM category) AS count FROM category WHERE category LIKE '%${search}%' ORDER BY ${field} ${sortType} LIMIT ${offset}, ${limit}`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })

    },
    getAlldata: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * , (SELECT COUNT(*) FROM category) AS count FROM category`, (err, result) => {
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
            db.query(`SELECT * FROM category WHERE id_category='${id}'`, (err, result) => {
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
            db.query(`INSERT INTO category (category) 
            VALUES ('${data.category}')`, (err, result) => {
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
            db.query(`UPDATE category SET category='${data.category}' WHERE id_category='${id}'`, (err, result) => {
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
            db.query(`DELETE FROM category WHERE id_category='${id}'`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    }
}


module.exports = category