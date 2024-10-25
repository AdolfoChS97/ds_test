const { CONFLICT } = require('../../../shared/constants')
const User = require('../schemas/User')

async function create({ username, email, password, role }) {
    try {
        const user = new User({ username, email, password, role })
        await user.save()
        return user
    } catch (e) {
        const error = new Error(e?.message)
        error.status = CONFLICT
        error.code = 1
        throw error
    }
}

module.exports = {
    create,
    
}