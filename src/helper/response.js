const response = {
    success: (res, data, message) => {
        const result = {
            message,
            success: true,
            code: 300,
            data
        }

        res.json(result)
    },
    failed: (res, data, message) => {
        const result = {
            message,
            success: false,
            code: 500,
            data
        }

        res.json(result)
    },
    successWithMeta: (res, data, meta, message) => {
        const result = {
            message,
            success: true,
            code: 300,
            meta,
            data
        }

        res.json(result)
    },

}

module.exports = response