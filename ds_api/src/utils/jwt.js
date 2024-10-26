const jwt = require('jsonwebtoken')

function sign (payload) {
    try {
        return jwt.sign(payload, `${process.env.APP_JWT_SECRET}`, { expiresIn: `${process.env.APP_JWT_EXPIRES_IN}` })
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
// function 