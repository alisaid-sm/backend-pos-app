const jwt = require('jsonwebtoken');
const { privateKey } = require('../helper/env');
const { errToken } = require('./response');

const auth = {
    authentication: (req, res, next ) => {
        const token = req.headers.token
        if (token === undefined || token === '') {
            errToken(res, [], 'token harus diisi')
        } else {
            next()
        }
    },
    authorization: (req, res, next) => {
        const token = req.headers.token
        jwt.verify(token, privateKey, (err, decoded) => {
            if (err && err.name === 'TokenExpiredError') {
                errToken(res, [], 'authentication failed token expired')
            } else if (err) {
                errToken(res, [], 'authentication failed incorrect token')
            } else {
                next()
            }
          })
    }
}

module.exports = auth