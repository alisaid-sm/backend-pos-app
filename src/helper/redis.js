const redis = require('redis');
const client = redis.createClient();

const _ = require('lodash');

const { successWithMeta } = require('../helper/response');

module.exports = {
    getProduct: (req, res, next) => {
        client.get('product', (err, data) => {
            if (data) {
                const dataRedis = JSON.parse(data); // <= data yang sebelumnya string dikonversi ke json
                const search = !req.query.search ? '' : req.query.search; // <= default search
                const field = !req.query.sort ? 'date' : req.query.sort;// <= default sort field
                const sortType = !req.query.sorttype ? 'desc' : req.query.sorttype; // <= default type sort
                const limit = !req.query.limit ? 10 : parseInt(req.query.limit); // <= default limit
                const page = !req.query.page ? 1 : parseInt(req.query.page); // <= default page
                const offset = page === 1 ? 0 : (page - 1) * limit; // default offset
                const result = _(dataRedis) // <= lodash
                    .filter(obj => {return obj.name.toLowerCase().includes(search.toLowerCase());}) // <= search
                    .drop(offset) // <= pagination offset
                    .take(limit) // <= pagination limit
                    .orderBy([field], [sortType]); // <= sort
                const stringresult = JSON.stringify(result); // <= hasil lodash di konversi ke string
                const jsonresult = JSON.parse(stringresult); // <= lalu di konversi ke json
                const totalRows = search !== '' ? jsonresult.length : dataRedis.length;
                const totalPage = Math.ceil(totalRows / limit);
                const meta = {
                    totalRows,
                    totalPage,
                    page
                };
                successWithMeta(res, result, meta, 'get data from redis success');
                
            } else {
                next();
            }
        });
    },
    getHistory: (req, res, next) => {
        client.get('history', (err, data) => {
            if (data) {
                const dataRedis = JSON.parse(data);
                const search = !req.query.search ? '' : req.query.search;
                const field = !req.query.sort ? 'id_history' : req.query.sort;
                const sortType = !req.query.sorttype ? 'asc' : req.query.sorttype;
                const limit = !req.query.limit ? 10 : parseInt(req.query.limit);
                const page = !req.query.page ? 1 : parseInt(req.query.page);
                const offset = page === 1 ? 0 : (page - 1) * limit; // default offset
                const result = _(dataRedis) // <= lodash
                    .filter(obj => {return obj.name.toLowerCase().includes(search.toLowerCase());}) // <= search
                    .drop(offset) // <= pagination offset
                    .take(limit) // <= pagination limit
                    .orderBy([field], [sortType]); // <= sort
                const stringresult = JSON.stringify(result); // <= hasil lodash di konversi ke string
                const jsonresult = JSON.parse(stringresult); // <= lalu di konversi ke json
                const totalRows = search !== '' ? jsonresult.length : dataRedis.length;
                const totalPage = Math.ceil(totalRows / limit);
                const meta = {
                    totalRows,
                    totalPage,
                    page
                };
                successWithMeta(res, result, meta, 'get data from redis success');
            } else {
                next();
            }
        });
    },
    getCategory: (req, res, next) => {
        client.get('category', (err, data) => {
            if (data) {
                const dataRedis = JSON.parse(data);
                const search = !req.query.search ? '' : req.query.search;
                const field = !req.query.sort ? 'id_category' : req.query.sort;
                const sortType = !req.query.sorttype ? 'asc' : req.query.sorttype;
                const limit = !req.query.limit ? 10 : parseInt(req.query.limit);
                const page = !req.query.page ? 1 : parseInt(req.query.page);
                const offset = page === 1 ? 0 : (page - 1) * limit; // default offset
                const result = _(dataRedis) // <= lodash
                    .filter(obj => {return obj.name.toLowerCase().includes(search.toLowerCase());}) // <= search
                    .drop(offset) // <= pagination offset
                    .take(limit) // <= pagination limit
                    .orderBy([field], [sortType]); // <= sort
                const stringresult = JSON.stringify(result); // <= hasil lodash di konversi ke string
                const jsonresult = JSON.parse(stringresult); // <= lalu di konversi ke json
                const totalRows = search !== '' ? jsonresult.length : dataRedis.length;
                const totalPage = Math.ceil(totalRows / limit);
                const meta = {
                    totalRows,
                    totalPage,
                    page
                };
                successWithMeta(res, result, meta, 'get data from redis success');
            } else {//662
                next();
            }
        });
    }
};