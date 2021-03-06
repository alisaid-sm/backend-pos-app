const db = require('../config/connection');

const history = {
    getAll: (search, field, sortType, offset, limit) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * , (SELECT COUNT(*) FROM history) AS count FROM history WHERE cashier LIKE '%${search}%' ORDER BY ${field} ${sortType} LIMIT ${offset}, ${limit}`, (err, result) => {
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve(result);
                }
            });
        });

    },
    getAlldata: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * , (SELECT COUNT(*) FROM history) AS count FROM history', (err, result) => {
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve(result);
                }
            });
        });

    },
    getDetail: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM history WHERE id_history='${id}'`, (err, result) => {
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve(result);
                }
            });
        });
    },
    insert: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO history (invoices, cashier) VALUES ('${data.invoices}', '${data.cashier}')`, (err, result) => {
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve(result);
                }
            });
        });
    },
    insertDetail: (data) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO history_detail SET ?', data, (err, result) => {
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve(result);
                }
            });
        });
    },
    update: (id, data) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE history SET 
                invoices='${data.invoices}', 
                cashier='${data.cashier}' WHERE id_history='${id}'`, (err, result) => {
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve(result);
                }
            });
        });
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM history WHERE id_history='${id}'`, (err, result) => {
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve(result);
                }
            });
        });
    },
    deleteDetail: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM history_detail WHERE id_history='${id}'`, (err, result) => {
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve(result);
                }
            });
        });
    }
};


module.exports = history;