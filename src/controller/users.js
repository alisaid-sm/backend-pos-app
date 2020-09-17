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
                    jwt.sign({ email: results.email }, privateKey, { expiresIn: 360000},
                        (err, token) => {
                            if (err) {
                                failed(res, [], err.message)
                            } else {
                                successToken(res, {token}, 'login success')
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
    }
}

module.exports = users