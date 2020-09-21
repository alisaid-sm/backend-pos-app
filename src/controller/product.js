const productModels = require('../models/product')
const redis = require('redis')
const client = redis.createClient()
const upload = require('../helper/upload')

const { success, failed, successWithMeta } = require('../helper/response')

const product = {
    getAll: (req, res) => {
        try {
            const search = !req.query.search ? '' : req.query.search
            const field = !req.query.sort ? 'id_product' : req.query.sort
            const sortType = !req.query.sorttype ? 'ASC' : req.query.sorttype
            const limit = !req.query.limit ? 10 : parseInt(req.query.limit)
            const page = !req.query.page ? 1 : parseInt(req.query.page)
            const offset = page === 1 ? 0 : (page - 1) * limit

            productModels.getAll(search, field, sortType, offset, limit)
                .then((result) => {
                    client.set('product', JSON.stringify(result))
                    const totalRows = result[0].count
                    const totalPage = Math.ceil(totalRows / limit)
                    const meta = {
                        totalRows,
                        totalPage,
                        page
                    }
                    successWithMeta(res, result, meta, 'Get all data from database success')
                })
                .catch((err) => {
                    failed(res, [], err.message)
                })
            productModels.getAlldata()
                .then((result) => {
                    client.del('product')
                    client.set('product', JSON.stringify(result))
                })
                .catch((err) => {
                    failed(res, [], err.message)
                })
        } catch (err) {
            failed(res, [], 'internal server error')
        }

    },
    getDetail: (req, res) => {
        try {
            const id = req.params.id
            productModels.getDetail(id)
                .then((result) => {
                    client.del('productdetail')
                    client.set('productdetail', JSON.stringify(result))
                    success(res, result, 'Get detail data from database success')
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
            upload.single('image')(req, res, (err) => {
                if (err) {
                    if (err.code === 'LIMIT_FILE_SIZE') {
                        failed(res, [], 'File too large, max size 100kb')
                    } else {
                        failed(res, [], err)
                    }
                    
                } else {
                    const data = req.body
                    data.image = req.file.filename
                    // console.log(data)
                    productModels.insert(data)
                        .then((result) => {
                            client.del('product')
                            productModels.getAlldata()
                                .then((result) => {
                                    client.set('product', JSON.stringify(result))
                                })
                                .catch((err) => {
                                    failed(res, [], err.message)
                                })
                            success(res, result, 'Insert data success')
                        })
                        .catch((err) => {
                            failed(res, [], err.message)
                        })
                }
            })
            
        } catch (error) {
            failed(res, [], 'internal server error')
        }

    },
    update: (req, res) => {
        try {
            upload.single('image')(req, res, (err) => {
                if (err) {
                    if (err.code === 'LIMIT_FILE_SIZE') {
                        failed(res, [], 'File too large, max size 100kb')
                    } else {
                        failed(res, [], err)
                    }
                } else {
                    const id = req.params.id
                    const data = req.body
                    data.image = req.file.filename
                    productModels.update(id, data)
                        .then((result) => {
                            client.del('product')
                            productModels.getAlldata()
                                .then((result) => {
                                    client.set('product', JSON.stringify(result))
                                })
                                .catch((err) => {
                                    failed(res, [], err.message)
                                })
                            success(res, result, 'Update data success')
                        })
                        .catch((err) => {
                            failed(res, [], err.message)
                        })
                    productModels.getAlldata()
                        .then((result) => {
                            client.set('product', JSON.stringify(result))
                        })
                        .catch((err) => {
                            failed(res, [], err.message)
                        })
                }
            })
            
        } catch (error) {
            failed(res, [], 'internal server error')
        }

    },
    updatePatch: (req, res) => {
        try {
            upload.single('image')(req, res, (err) => {
                if (err) {
                    failed(res, [], err.message)
                } else {
                    const id = req.params.id
                    const data = req.body
                    data.image = req.file.filename
                    // console.log(data)
                    productModels.updatePatch(id, data)
                        .then((result) => {
                            client.del('product')
                            productModels.getAlldata()
                                .then((result) => {
                                    client.set('product', JSON.stringify(result))
                                })
                                .catch((err) => {
                                    failed(res, [], err.message)
                                })
                            success(res, result, 'Update data success')
                        })
                        .catch((err) => {
                            failed(res, [], err.message)
                        })
                }
            })
            
        } catch (error) {
            failed(res, [], 'internal server error')
        }

    },
    delete: (req, res) => {
        try {
            const id = req.params.id
            productModels.delete(id)
                .then((result) => {
                    client.del('product')
                    productModels.getAlldata()
                        .then((result) => {
                            client.set('product', JSON.stringify(result))
                        })
                        .catch((err) => {
                            failed(res, [], err.message)
                        })
                    success(res, result, 'delete data berhasil')
                })
                .catch((err) => {
                    failed(res, [], err.message)
                })
        } catch (error) {
            failed(res, [], 'internal server error')
        }

    },
}

module.exports = product