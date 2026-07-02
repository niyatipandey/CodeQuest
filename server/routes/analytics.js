const express = require('express')
const handleGetAnalytics = require('../controller/analytics')
const checkAuth = require('../middleware/auth')

const router = express.Router();

router.get('/',checkAuth,handleGetAnalytics)

module.exports = router