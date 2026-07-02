const express = require('express')
const {handleGetGoal ,handlePostGoal ,handleUpdateGoal ,handleDeleteGoal} = require('../controller/goal')
const checkAuth = require('../middleware/auth')

const router = express.Router();


router.route('/')
.get(checkAuth,handleGetGoal)
.post(checkAuth,handlePostGoal)

router.route('/:id')
.patch(checkAuth,handleUpdateGoal)
.delete(checkAuth,handleDeleteGoal)

module.exports = router;