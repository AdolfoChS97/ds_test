const _ = require('underscore')
const { create, authenticate  } = require('../services')
const { registerSchema, loginSchema } = require('../validators')
const { CREATED, INTERNAL_SERVER_ERROR } = require('../../../shared/constants')
const handleValidationErrors = require('../../../utils/handleValidationErrors')

async function register(req, res){
    try {
        const body = req.body
        await handleValidationErrors(await registerSchema.validate({...body}, { abortEarly: false }))
        const user = await create(body)
        return res.status(CREATED).json({ data: _.omit(user.toJSON(), 'password'), message: 'User created successfully', code: 0 })
    } catch (e) {
        return res.status(e?.status || INTERNAL_SERVER_ERROR).json({ error: e.details, message: e.message, code: e?.code })
    }
}
async function login(req, res) {
    try {
        const credentials = req.body
        await handleValidationErrors(await loginSchema.validate({...credentials}, { abortEarly: false }))
        const token = await authenticate(credentials)
        return res.status(200).json({ data: token, message: 'User authenticated successfully', code: 0 })
    } catch (e) {
        return res.status(e?.status || INTERNAL_SERVER_ERROR).json({ error: e.details, message: e.message, code: e?.code })
    }
}
async function logout(req, res) {}


module.exports = {
    register,
    login,
    logout
}