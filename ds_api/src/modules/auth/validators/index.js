const Joi = require('joi')

const registerSchema = Joi.object({
    username: Joi.string().required().messages({
        'string.base': 'Name must be a string',
        'string.empty': 'Name cannot be an empty field',
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'Email must be a string',
        'string.empty': 'Email cannot be an empty field',
        'string.email': 'Email must be a valid email',
    }),
    password: Joi.string().required().min(8).messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password cannot be an empty field',
        'string.min': 'Password must be at least 8 characters long',
    }),
    role: Joi.string().valid('admin', 'reader', 'content-creator').empty().messages({
        'any.only': 'Role must be either admin, reader or content-creator',
        'string.base': 'Role must be a string',
    })
})

module.exports = {
    registerSchema
}