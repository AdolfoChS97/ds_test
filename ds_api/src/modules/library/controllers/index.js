const { createThemeSchema, setTypeOfThemeContentSchema } = require('../validators')
const { INTERNAL_SERVER_ERROR, SUCCESS, CONFLICT } = require('../../../shared/constants')
const handleValidationErrors = require('../../../utils/handleValidationErrors')
const { saveTheme, setTypeOfContent } = require('../services')

async function createTheme(req, res) {
    try {
        const body = req.body
        await handleValidationErrors(await createThemeSchema.validate({...body}, { abortEarly: false }))
        const created = await saveTheme({ ...body })
        return res.status(SUCCESS).json({ data: created, message: 'Theme created successfully', code: 0 })
    } catch (e) {
        return res.status(e?.status || INTERNAL_SERVER_ERROR).json({ error: e.details, message: e.message, code: e?.code })
    }
}

async function setTypeOfThemeContent(req, res) {
    try {
        const body = req.body
        const { id } = req.params
        await handleValidationErrors(await setTypeOfThemeContentSchema.validate({...body}, { abortEarly: false }))
        const updated = await setTypeOfContent({ ...body, themeId: id })
        if(updated) {
            return res.status(SUCCESS).json({ message: 'Theme content type updated', code: 0 })
        } else {
            const error = new Error('Theme content type could not be updated')
            error.status = CONFLICT
            error.code = 1
            throw error
        }
    } catch (e) {
        return res.status(e?.status || INTERNAL_SERVER_ERROR).json({ error: e.details, message: e.message, code: e?.code })
    }
}

async function getContent(req, res){
    return res.status(SUCCESS).json({ data: 'content', message: 'Content fetched successfully', code: 0 })
}
async function saveContent(req, res){
    return res.status(SUCCESS).json({ data: 'content', message: 'Content saved successfully', code: 0 })
}

module.exports = {
    getContent,
    saveContent,
    createTheme,
    setTypeOfThemeContent
}