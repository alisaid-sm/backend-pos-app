const usersModels = require('../models/users')
const { success, failed, successWithMeta, successToken } = require('../helper/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { privateKey } = require('../helper/env')

const users = {
    register: async (req, res) => {
        try {
            const data = req.body
            const salt = await bcrypt.genSaltSync(10);
            const hash = await bcrypt.hashSync(data.password, salt);
            // console.log(hash)
            const dataNew = {
                email: data.email,
                password: hash
            }
            usersModels.register(dataNew)
                .then((result) => {
                    success(res, result, 'Insert users success')
                })
                .catch((err) => {
                    failed(res, [], err.message)
                })
        } catch (error) {
            failed(res, [], 'internal server error')
        }

    },
    login: async (req, res) => {
        try {
            const data = req.body
            usersModels.login(data)
             .then( async (result) => {
                const results = result[0]
                const match = await bcrypt.compare(data.password, results.password);
                if (match) {
                    jwt.sign({ email: results.email }, privateKey, { expiresIn: 3600},
                        (err, token) => {
                            if (err) {
                                failed(res, [], err.message)
                            } else {
                                const id = results.id
                                const refreshToken = jwt.sign({id}, 'REFRESH TOKEN 123')
                                usersModels.updateRefreshToken(refreshToken, id)
                                    .then(() => {
                                        const data = {
                                            token,
                                            refreshToken
                                        }
                                        successToken(res, data, 'login success')
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                            }
                        }
                        )
                } else {
                    failed(res, [], 'password salah')
                }
             })
        } catch (error) {
            failed(res, [], 'internal server error')
        }
    },
    renewToken: (req, res) => {
        const refreshToken = req.body.refreshToken
        usersModels.checkRefreshToken(refreshToken)
            .then((result) => {
                if (result.length >= 1) {
                    const user = result[0]
                    const newToken = jwt.sign({ email: result.email }, privateKey, { expiresIn: 3600})
                    const data = {
                        token: newToken,
                        refreshToken
                    }
                    successToken(res, data, 'Refresh Token Success')
                } else {
                    failed(res, [], 'Refresh Token Not Found')
                }
            })

    }
}

module.exports = users