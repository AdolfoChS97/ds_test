const express = require('express')
const router = express.Router()
const {
    register,
    login,
    logout
} = require('./controllers')

router.post('/register', async (req, res) => {
    return await register(req, res)
})

router.get('/login', async (req, res) => {
    return await login(req, res)
})

router.get('/logout', async (req, res) => {
    return await logout(req, res)
})

module.exports = router