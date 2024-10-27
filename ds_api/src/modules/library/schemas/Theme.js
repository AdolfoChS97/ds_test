const { required } = require('joi')
const mongoose = require('mongoose')

const Theme = new mongoose.Schema({
    reference: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['sports', 'science', 'maths'],
        required: true,
        unique: true
    },
    canSave: {
        type: String,
        enum: ['videos', 'images', 'text'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    deletedAt: {
        type: Date,
        default: null
    }
})

module.exports = mongoose.model('Theme', Theme)