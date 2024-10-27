const { verify } = require("jsonwebtoken")
const permissions = require('../shared/permissions')
const { BAD_REQUEST, UNAUTHORIZED, ALL_ACCESS, FORBIDDEN } = require("../shared/constants")

function authorize(req, res, next) {
    try {
        const { authorization } = req.headers
        if(!authorization) {
            const error = new Error('Authorzation header not found')
            error.status = BAD_REQUEST
            error.code = 1
            throw error
        }
        const token = getBearerToken(req.headers)
        const payload = verify(token, `${process.env.APP_JWT_ACCESS_TOKEN_SECRET}`);
        req['locals'] = {
            user: payload
        }
        next()       
    } catch (e) {
        res.status(e?.status || UNAUTHORIZED).json({ message: e.message, code: e?.code || 1 })
    }
}

function can(req, res, next) {
    try {
        const { user } = req.locals
        if(permissions[user.role] === ALL_ACCESS) {
            next()
        } else {
           const error = new Error('Cant perform this action')
            error.status = FORBIDDEN
            error.code = 1
            throw error
        }
        // next()       
    } catch (e) {
        res.status(e?.status || UNAUTHORIZED).json({ message: e.message, code: e?.code || 1 })
    }
}

function getBearerToken(headers) {
    try {
        const { authorization } = headers
        return authorization.split(' ')[1]
    } catch (e) {
        throw new Error('Something goes wrong getting bearer token')
    }
}

module.exports = {
    can,
    authorize
}