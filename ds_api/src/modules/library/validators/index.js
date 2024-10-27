const joi = require('joi')
const { BASE64_IMG_REGEX } = require('../../../shared/constants')
const { can } = require('../../../middlewares')

const createThemeSchema = joi.object({
    reference: joi.string().regex(BASE64_IMG_REGEX).required().messages({
        'string.base': 'Reference must be a string',
        'string.regex': 'Reference must be a base64 string of image',
        'string.empty': 'Reference cannot be an empty field',
    }),
    type: joi.string().valid('sports', 'science', 'maths').required().messages({
        'any.only': 'Type must be either sports, science or maths',
        'string.base': 'Type must be a string',
    }),
})

const setTypeOfThemeContentSchema = joi.object({
    canSave: joi.string().valid('videos', 'images', 'text').required().messages({
        'any.only': 'Type must be either videos, images or text',
        'string.base': 'Type must be a string',
    }),
})

module.exports = {
    createThemeSchema,
    setTypeOfThemeContentSchema
}