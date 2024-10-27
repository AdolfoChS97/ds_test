const express = require('express')
const router = express.Router()

router.use('/auth', require('../modules/auth'))
router.use('/library', require('../modules/library'))

module.exports = router