const jwt = require('jsonwebtoken');
const { privateKey } = require('../helper/env')

const auth = {
    authentication: (req, res, next ) => {
        const token = req.headers.token
        if (token === undefined || token === '') {
            res.send({msg:'token harus diisi'})
        } else {
            next()
        }
    },
    authorization: (req, res, next) => {
        const token = req.headers.token
        jwt.verify(token, privateKey, (err, decoded) => {
            if (err && err.name === 'TokenExpiredError') {
                res.send({msg:'authentication failed token expired'})
            } else if (err) {
                res.send({msg:'authentication failed incorrect token'})
            } else {
                next()
            }
          })
    }
}

module.exports = auth