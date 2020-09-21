const redis = require('redis')
const client = redis.createClient()

const _ = require('lodash')

const { success, failed, successWithMeta } = require('../helper/response')

module.exports = {
    getProduct: (req, res, next) => {
        client.get('product', (err, data) => {
            if (data) {
                const dataRedis = JSON.parse(data)
                const search = !req.query.search ? '' : req.query.search
                const field = !req.query.sort ? 'id_product' : req.query.sort
                const sortType = !req.query.sorttype ? 'asc' : req.query.sorttype
                const limit = !req.query.limit ? 10 : parseInt(req.query.limit)
                const page = !req.query.page ? 1 : parseInt(req.query.page)
                const start = page === 1 ? 0 : (page * limit) - limit
                const offset = start === 0 ? limit : start * limit

                const dataPagination = _.slice(dataRedis, start, offset)
                const totalRows = dataRedis.length
                const totalPage = Math.ceil(totalRows / limit)
                const meta = {
                    totalRows,
                    totalPage,
                    page
                }
                if (search !== '') {
                    const datafix = _.filter(dataPagination, (obj) => {
                        return obj.name.toLowerCase().includes(search.toLowerCase())
                        // console.log(obj.name.toLowerCase().includes(search.toLowerCase()))
                    })
                    successWithMeta(res, datafix, meta, 'get data from redis success')
                } else if (field !== 'id_product') {
                    const datafix = _.orderBy(dataPagination, [field], [sortType])
                    successWithMeta(res, datafix, meta, 'get data from redis success')
                } else {
                    const datafix = dataPagination
                    successWithMeta(res, datafix, meta, 'get data from redis success')
                }
                
            } else {
                next()
            }
        })
    },
    getProductDetail: (req, res, next) => {
        client.get('productdetail', (err, data) => {
            if (data !== 'null' && data !== '[]') {
                const dataRedis = JSON.parse(data)
                const id = req.params.id
                if (dataRedis[0].id_product == id) {
                    success(res, dataRedis, 'Get detail from redis success')
                } else {
                    next()
                }
                
            } else {
                next()
            }
        })
    },
    getHistory: (req, res, next) => {
        client.get('history', (err, data) => {
            if (data) {
                const dataRedis = JSON.parse(data)
                const search = !req.query.search ? '' : req.query.search
                const field = !req.query.sort ? 'id_history' : req.query.sort
                const sortType = !req.query.sorttype ? 'asc' : req.query.sorttype
                const limit = !req.query.limit ? 10 : parseInt(req.query.limit)
                const page = !req.query.page ? 1 : parseInt(req.query.page)
                const start = page === 1 ? 0 : (page * limit) - limit
                const offset = start === 0 ? limit : start * limit

                const dataPagination = _.slice(dataRedis, start, offset)
                const totalRows = dataRedis.length
                const totalPage = Math.ceil(totalRows / limit)
                const meta = {
                    totalRows,
                    totalPage,
                    page
                }
                if (search !== '') {
                    const datafix = _.filter(dataPagination, (obj) => {
                        return obj.cashier.toLowerCase().includes(search.toLowerCase())
                        // console.log(obj.name.toLowerCase().includes(search.toLowerCase()))
                    })
                    successWithMeta(res, datafix, meta, 'get data from redis success')
                } else if (field !== 'id_history') {
                    const datafix = _.orderBy(dataPagination, [field], [sortType])
                    successWithMeta(res, datafix, meta, 'get data from redis success')
                } else {
                    const datafix = dataPagination
                    successWithMeta(res, datafix, meta, 'get data from redis success')
                }
            } else {
                next()
            }
        })
    },
    getHistoryDetail: (req, res, next) => {
        client.get('historydetail', (err, data) => {
            if (data !== null && data !== '[]') {
                const dataRedis = JSON.parse(data)
                const id = req.params.id
                if (dataRedis[0].id_history == id) {
                    success(res, dataRedis, 'Get detail from redis success')
                } else {
                    next()
                }
                
            } else {
                next()
            }
        })
    },
    getCategory: (req, res, next) => {
        client.get('category', (err, data) => {
            if (data) {
                const dataRedis = JSON.parse(data)
                const search = !req.query.search ? '' : req.query.search
                const field = !req.query.sort ? 'id_category' : req.query.sort
                const sortType = !req.query.sorttype ? 'asc' : req.query.sorttype
                const limit = !req.query.limit ? 10 : parseInt(req.query.limit)
                const page = !req.query.page ? 1 : parseInt(req.query.page)
                const start = page === 1 ? 0 : (page * limit) - limit
                const offset = start === 0 ? limit : start * limit

                const dataPagination = _.slice(dataRedis, start, offset)
                const totalRows = dataRedis.length
                const totalPage = Math.ceil(totalRows / limit)
                const meta = {
                    totalRows,
                    totalPage,
                    page
                }
                if (search !== '') {
                    const datafix = _.filter(dataPagination, (obj) => {
                        return obj.category.toLowerCase().includes(search.toLowerCase())
                        // console.log(obj.name.toLowerCase().includes(search.toLowerCase()))
                    })
                    successWithMeta(res, datafix, meta, 'get data from redis success')
                } else if (field !== 'id_category') {
                    const datafix = _.orderBy(dataPagination, [field], [sortType])
                    successWithMeta(res, datafix, meta, 'get data from redis success')
                } else {
                    const datafix = dataPagination
                    successWithMeta(res, datafix, meta, 'get data from redis success')
                }
            } else {//662
                next()
            }
        })
    },
    getCategoryDetail: (req, res, next) => {
        client.get('historydetail', (err, data) => {
            if (data !== 'null' && data !== '[]') {
                const dataRedis = JSON.parse(data)
                const id = req.params.id
                if (dataRedis[0].id_category == id) {
                    success(res, dataRedis, 'Get detail from redis success')
                } else {
                    next()
                }
                
            } else {
                next()
            }
        })
    }
}