const mongoose = require('mongoose')

const Session = new mongoose.Schema({
    
    accessToken: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    },
    deletedAt: {
        type: Date,
        default: null
    }
})

module.exports = mongoose.model('Session', Session);