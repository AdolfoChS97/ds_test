const express = require('express')
const router = express.Router()

const { can, authorize } = require('../../middlewares')
const { getContent, saveContent, createTheme, setTypeOfThemeContent } = require('./controllers')

router.get('/', [authorize, can], async (req, res) => {
    return await getContent(req, res)    
})

router.post('/', async (req, res) => {
    return await saveContent(req, res)
})

router.post('/themes', [authorize, can], async (req, res) => {
    return await createTheme(req, res)
})

router.patch('/themes/:id', [authorize, can], async (req, res) => {
    return await setTypeOfThemeContent(req, res)
})

module.exports = router