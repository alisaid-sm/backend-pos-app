const historyModels = require('../models/history');
const redis = require('redis');
const client = redis.createClient();

const { success, failed, successWithMeta } = require('../helper/response');

const history = {
    getAll: (req, res) => {
        try {
            const search = !req.query.search ? '' : req.query.search;
            const field = !req.query.sort ? 'id_history' : req.query.sort;
            const sortType = !req.query.sorttype ? 'ASC' : req.query.sorttype;
            const limit = !req.query.limit ? 10 : parseInt(req.query.limit);
            const page = !req.query.page ? 1 : parseInt(req.query.page);
            const offset = page === 1 ? 0 : (page - 1) * limit;
            historyModels.getAll(search, field, sortType, offset, limit)
                .then((result) => {
                    client.set('history', JSON.stringify(result));
                    const totalRows = result[0].count;
                    const totalPage = Math.ceil(totalRows / limit);
                    const meta = {
                        totalRows,
                        totalPage,
                        page
                    };
                    successWithMeta(res, result, meta, 'Get all data success');
                })
                .catch((err) => {
                    failed(res, [], err.message);
                });
            historyModels.getAlldata()
                .then((result) => {
                    client.del('history');
                    client.set('history', JSON.stringify(result));
                })
                .catch((err) => {
                    failed(res, [], err.message);
                });
        } catch (error) {
            failed(res, [], 'internal server error');
        }

    },
    getDetail: (req, res) => {
        try {
            const id = req.params.id;
            historyModels.getDetail(id)
                .then((result) => {
                    success(res, result, 'Get detail data success');
                })
                .catch((err) => {
                    failed(res, [], err.message);
                });
        } catch (error) {
            failed(res, [], 'internal server error');
        }

    },
    insert: (req, res) => {
        try {
            const data = req.body;
            historyModels.insert(data)
            // console.log(data)
                .then((result) => {
                    console.log(result);
                    const idMaster = result.insertId;
                    const insertDetail = data.detail.map((item) => {
                        item.id_history = idMaster;
                        historyModels.insertDetail(item);
                    });
                    Promise.all(insertDetail)
                        .then(() => {
                            client.del('history');
                            historyModels.getAlldata()
                                .then((result) => {
                                    client.set('history', JSON.stringify(result));
                                })
                                .catch((err) => {
                                    failed(res, [], err.message);
                                });
                            success(res, result, 'Insert data history success'); 
                        })
                        .catch((err) => {
                            failed(res, [], err.message);
                        });
                })
                .catch((err) => {
                    failed(res, [], err.message);
                });
        } catch (error) {
            failed(res, [], 'internal server error');
        }

    },
    update: (req, res) => {
        try {
            const id = req.params.id;
            const data = req.body;
            historyModels.update(id, data)
                .then((result) => {
                    client.del('history');
                    historyModels.getAlldata()
                        .then((result) => {
                            client.set('history', JSON.stringify(result));
                        })
                        .catch((err) => {
                            failed(res, [], err.message);
                        });
                    success(res, result, 'Update data success');
                })
                .catch((err) => {
                    failed(res, [], err.message);
                });
        } catch (error) {
            failed(res, [], 'internal server error');
        }

    },
    delete: (req, res) => {
        try {
            const id = req.params.id;
            historyModels.delete(id)
                .then((result) => {
                    historyModels.deleteDetail(id);
                    client.del('history');
                    historyModels.getAlldata()
                        .then((result) => {
                            client.set('history', JSON.stringify(result));
                        })
                        .catch((err) => {
                            failed(res, [], err.message);
                        });
                    success(res, result, 'Delete data success');
                })
                .catch((err) => {
                    failed(res, [], err.message);
                });
        } catch (error) {
            failed(res, [], 'internal server error');
        }

    },
};

module.exports = history;