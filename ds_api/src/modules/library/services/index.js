const Theme = require('../schemas/Theme')
const Content = require('../schemas/Content')
const ObjectId = require('mongoose').Types.ObjectId
const { 
    CONFLICT, 
    INTERNAL_SERVER_ERROR, 
    NOT_FOUND, 
    BAD_REQUEST,
    BASE64_IMG_REGEX,
    BASE64_TXT_REGEX,
    BASE64_VIDEO_REGEX, 
    contentTable
} = require('../../../shared/constants')

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
        error.code = 1      
        error.status = INTERNAL_SERVER_ERROR
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

async function getTheme(themeId) {
    try {
        const theme  = await Theme.findOne({ _id: new ObjectId(themeId), deletedAt: null, canSave: { $exists: true } })
        if(!theme) {
            const error = new Error('Theme not found')
            error.status = NOT_FOUND
            error.code = 1
            throw error
        }
        return theme
    } catch (e) {
        const error = new Error(e?.message || 'Error getting type of theme')
        error.status = e?.status || INTERNAL_SERVER_ERROR
        throw error
    }
}

async function saveThemeContent({ title, type, reference, theme }, owner) {
    try {
        const t = await getTheme(theme);
        const isValidContent = contentTable[type](reference);
        if(t.canSave !== type || !isValidContent) {
            const error = new Error('Theme content couldnt be saved by this type')
            error.status = BAD_REQUEST
            error.code = 1
            throw error
        }
        const created = await Content.create({ title, type, reference, theme, credits: owner })
        created['theme'] = t
        return created
    } catch (e) {
        const error = new Error(e?.message || 'Error saving theme content')
        error.status = e?.status || INTERNAL_SERVER_ERROR
        throw error        
    }
}

async function getThemesContent() {
    try {
        const content = await Content.find({ deletedAt: null }).populate('theme')
        return content
    } catch (e) {
        const error = new Error(e?.message || 'Error getting themes content')
        error.status = e?.status || INTERNAL_SERVER_ERROR
        throw error
    }
}

module.exports = {
    saveTheme, 
    setTypeOfContent,
    saveThemeContent,
    getThemesContent
}