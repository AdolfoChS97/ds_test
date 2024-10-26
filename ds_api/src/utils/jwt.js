const jwt = require('jsonwebtoken')
const { INTERNAL_SERVER_ERROR } = require('../shared/constants')

function sign (payload, duration, secret) {
    try {
        console.log(`${secret}`, `${duration}`);
        return jwt.sign(payload, `${secret}`, { expiresIn: `${duration}` })
    } catch (e) {
        const error = new Error(e?.message)
        error.status = INTERNAL_SERVER_ERROR 
        error.code = 1
        throw error
    }
}

module.exports = {
    sign
}