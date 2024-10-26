const _ = require('underscore')
const User = require('../schemas/User')
const Session = require('../schemas/Session')
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
            const error = new Error('Invalid credetials')
            error.status = UNAUTHORIZED
            error.code = 1
            throw error
        }
        const payload = _.omit(user.toJSON(), 'password');
        const accessToken = sign(payload, `${process.env.APP_JWT_ACCESS_TOKEN_EXPIRES}`, `${process.env.APP_JWT_ACCESS_TOKEN_SECRET}`)
        const refreshToken = sign(payload, `${process.env.APP_JWT_REFRESH_TOKEN_EXPIRES}`, `${process.env.APP_JWT_REFRESH_TOKEN_SECRET}`)

        await createOrUpdateSession(user._id, accessToken, refreshToken)

        return { accessToken, refreshToken }
    } catch (e) {
        const error = new Error(e?.message)
        error.status = e.status || INTERNAL_SERVER_ERROR
        error.code = 1
        throw error
    }
}
async function createOrUpdateSession(userId, accessToken, refreshToken) {
    try {
        const session = await Session.findOneAndUpdate(
            { user: userId, deletedAt: null },
            { $set: { refreshToken, accessToken, updatedAt: new Date() } },
            { new: true, upsert: true }
        );
        return session;
    } catch (e) {
        const error = new Error(e?.message || 'Error creating session');
        error.status = INTERNAL_SERVER_ERROR;
        error.code = 1;
        throw error;
    }
}

async function removeSession(refreshToken) {
    try {
        const session = await Session.findOne({ refreshToken, deletedAt: null });
        if (!session) {
            const error = new Error('Session not found or already logged out');
            error.status = INTERNAL_SERVER_ERROR;
            throw error;
        }
        await Session.updateOne({ _id: session._id }, { $set: { deletedAt: new Date() } });
    } catch (e) {
        const error = new Error(e?.message || 'Error removing session');
        error.status = e.status || INTERNAL_SERVER_ERROR;
        error.code = 1;
        throw error;
    }
}


module.exports = {
    create,
    authenticate,
    removeSession
}