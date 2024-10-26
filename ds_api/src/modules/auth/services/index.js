const _ = require('underscore')
const User = require('../schemas/User')
const { sign } = require('../../../utils/jwt')
const { hashPassword, comparePassword } = require('../../../utils/bcrypt')
const { CONFLICT, NOT_FOUND, UNAUTHORIZED, INTERNAL_SERVER_ERROR } = require('../../../shared/constants')

async function create({ username, email, password, role }) {
    try {
        const user = new User({ username, email, password: await hashPassword(password), role })
        await user.save()
        return user
    } catch (e) {
        const error = new Error(e?.message)
        error.status = CONFLICT
        error.code = 1
        throw error
    }
}

async function authenticate({ email, password }) {
    try {
        const user = await User.findOne({ email }).select('+password')
        if(!user) {
            const error = new Error('User not found')
            error.status = NOT_FOUND
            error.code = 1
            throw error
        }

        if(!await comparePassword(password, user.password)) {
            const error = new Error('Wrong password')
            error.status = UNAUTHORIZED
            error.code = 1
            throw error
        }
        const payload = _.omit(user.toJSON(), 'password');
        const token = sign(payload)
        return { token }
    } catch (e) {
        const error = new Error(e?.message)
        error.status = INTERNAL_SERVER_ERROR
        error.code = 1
        throw error
    }
}

module.exports = {
    create,
    authenticate,
}