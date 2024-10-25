const { BAD_REQUEST } = require('../shared/constants')

async function handleValidationErrors (validation) {
    if(validation.error) {
        const e = new Error(`Validation Error`)
        e.details = validation?.error.details.map((detail) => detail.message)?.join('\n')
        e.status = BAD_REQUEST
        e.code = 1
        throw e 
    }
}

module.exports = handleValidationErrors