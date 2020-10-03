const db = require('../config/connection');

const product = {
    getAll: (search, field, sortType, offset, limit) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * , (SELECT COUNT(*) FROM product) AS count FROM product LEFT JOIN category ON product.id_category=category.id_category WHERE name LIKE '%${search}%' ORDER BY ${field} ${sortType} LIMIT ${offset}, ${limit}`, (err, result) => {
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
            db.query('SELECT * , (SELECT COUNT(*) FROM product) AS count FROM product LEFT JOIN category ON product.id_category=category.id_category', (err, result) => {
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
            db.query(`SELECT * FROM product LEFT JOIN category ON product.id_category=category.id_category WHERE id_product='${id}'`, (err, result) => {
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
            db.query(`INSERT INTO product (name, id_category, price, image) 
            VALUES ('${data.name}', '${data.id_category}', '${data.price}', '${data.image}')`, (err, result) => {
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
            db.query('UPDATE product SET ? WHERE id_product= ?', [data, id], (err, result) => {
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve(result);
                }
            });
        });
    },
    updatePatch: (id, data) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE product SET ? WHERE id_product=?', [data,id], (err, result) => {
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
            db.query('DELETE FROM product WHERE id_product=?', id, (err, result) => {
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve(result);
                }
            });
        });
    }
};


module.exports = product;