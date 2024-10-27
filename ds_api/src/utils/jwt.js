const jwt = require('jsonwebtoken')
const { INTERNAL_SERVER_ERROR } = require('../shared/constants')

function sign (payload, duration, secret) {
    try {
        return jwt.sign(payload, `${secret}`, { expiresIn: `${duration}` })
    } catch (e) {
        const error = new Error(e?.message)
        error.status = INTERNAL_SERVER_ERROR 
        error.code = 1
        throw error
    }
}

function verify(token, secret) {
    try {
        return jwt.verify(token, `${secret}`)
    } catch (e) {
        const error = new Error(e?.message)
        error.status = INTERNAL_SERVER_ERROR
        error.code = 1
        throw error
    }
}

module.exports = {
    sign,
    verify
}