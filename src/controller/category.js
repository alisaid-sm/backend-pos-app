const categoryModels = require('../models/category')
const redis = require('redis')
const client = redis.createClient()

const { success, failed, successWithMeta } = require('../helper/response')

const category = {
    getAll: (req, res) => {
        try {
            const search = !req.query.search ? '' : req.query.search
            const field = !req.query.sort ? 'id_category' : req.query.sort
            const sortType = !req.query.sorttype ? 'ASC' : req.query.sorttype
            const limit = !req.query.limit ? 10 : parseInt(req.query.limit)
            const page = !req.query.page ? 1 : parseInt(req.query.page)
            const offset = page === 1 ? 0 : (page - 1) * limit

            categoryModels.getAll(search, field, sortType, offset, limit)
                .then((result) => {
                    client.set('category', JSON.stringify(result))
                    const totalRows = result[0].count
                    const totalPage = Math.ceil(totalRows / limit)
                    const meta = {
                        totalRows,
                        totalPage,
                        page
                    }
                    successWithMeta(res, result, meta, 'Get all data success')
                })
                .catch((err) => {
                    failed(res, [], err.message)
                })
            categoryModels.getAlldata()
                .then((result) => {
                    client.del('history')
                    client.set('history', JSON.stringify(result))
                })
                .catch((err) => {
                    failed(res, [], err.message)
                })
        } catch (error) {
            failed(res, [], 'internal server error')
        }

    },
    getDetail: (req, res) => {
        try {
            const id = req.params.id
            categoryModels.getDetail(id)
                .then((result) => {
                    client.del('categorydetail')
                    client.set('categorydetail', JSON.stringify(result))
                    success(res, result, 'Get detail data success')
                })
                .catch((err) => {
                    failed(res, [], err.message)
                })
        } catch (error) {
            failed(res, [], 'internal server error')
        }

    },
    insert: (req, res) => {
        try {
            const data = req.body
            categoryModels.insert(data)
                .then((result) => {
                    client.del('category')
                    categoryModels.getAlldata()
                        .then((result) => {
                            client.set('category', JSON.stringify(result))
                        })
                        .catch((err) => {
                            failed(res, [], err.message)
                        })
                    success(res, result, 'Insert data success')
                })
                .catch((err) => {
                    failed(res, [], err.message)
                })
        } catch (error) {
            failed(res, [], 'internal server error')
        }

    },
    update: (req, res) => {
        try {
            const id = req.params.id
            const data = req.body
            categoryModels.update(id, data)
                .then((result) => {
                    client.del('category')
                    categoryModels.getAlldata()
                        .then((result) => {
                            client.set('category', JSON.stringify(result))
                        })
                        .catch((err) => {
                            failed(res, [], err.message)
                        })
                    success(res, result, 'Update data success')
                })
                .catch((err) => {
                    failed(res, [], err.message)
                })
        } catch (error) {
            failed(res, [], 'internal server error')
        }

    },
    delete: (req, res) => {
        try {
            const id = req.params.id
            categoryModels.delete(id)
                .then((result) => {
                    client.del('category')
                    categoryModels.getAlldata()
                        .then((result) => {
                            client.set('category', JSON.stringify(result))
                        })
                        .catch((err) => {
                            failed(res, [], err.message)
                        })
                    success(res, result, 'Delete data success')
                })
                .catch((err) => {
                    failed(res, [], err.message)
                })
        } catch (error) {
            failed(res, [], 'internal server error')
        }

    },
}

module.exports = category