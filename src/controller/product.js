const productModels = require('../models/product')

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
        } catch (err) {
            failed(res, [], 'internal server error')
        }

    },
    getDetail: (req, res) => {
        try {
            const id = req.params.id
            productModels.getDetail(id)
                .then((result) => {
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
            data.image = req.file.filename
            // console.log(data)
            productModels.insert(data)
                .then((result) => {
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
            data.image = req.file.filename
            productModels.update(id, data)
                .then((result) => {
                    success(res, result, 'Update data success')
                })
                .catch((err) => {
                    failed(res, [], err.message)
                })
        } catch (error) {
            failed(res, [], 'internal server error')
        }

    },
    updatePatch: (req, res) => {
        try {
            const id = req.params.id
            const data = req.body
            data.image = req.file.filename
            // console.log(data)
            productModels.updatePatch(id, data)
                .then((result) => {
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
            productModels.delete(id)
                .then((result) => {
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