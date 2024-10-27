const Theme = require('../schemas/Theme')
const ObjectId = require('mongoose').Types.ObjectId
const { CONFLICT, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../../../shared/constants')

async function saveTheme({ reference, type }) {
    try {
        const created = await Theme.create({ reference, type })
        return created
    } catch (e) {
        if(e?.code === 11000) {
            const error = new Error('Theme already exists')
            error.status = CONFLICT
            error.code = 1
            throw error
        }

        const error = new Error(e?.message || 'Error creating theme')
        error.status = INTERNAL_SERVER_ERROR
        error.code = 1      
        throw error
    }
}

async function setTypeOfContent({ canSave, themeId }) {
    try {
        const theme = await Theme.findOne({ _id: new ObjectId(themeId), deletedAt: null, canSave: { $exists: null } })
        if(!theme) {
            const error = new Error('This theme could not be updated or does not exist')
            error.status = NOT_FOUND
            error.code = 1
            throw error
        }
        const { modifiedCount } = await Theme.updateOne({ _id: new ObjectId(themeId)}, { $set: { canSave } })
        if(modifiedCount) {
            return true
        } else {
            return false
        }

    } catch (e) {
        const error = new Error(e?.message || 'Error setting type of content on this theme')
        error.status = e?.status || INTERNAL_SERVER_ERROR
        throw error        
    }
}

module.exports = {
    saveTheme, 
    setTypeOfContent
}