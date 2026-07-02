const express = require('express');
const {handleGetQuestion,handlePostQuestion,handleUpdateQuestion ,handleDeleteQuestion} = require('../controller/question')
const checkAuth = require('../middleware/auth')

const router = express.Router();

router.route('/')
.get(checkAuth,handleGetQuestion)
.post(checkAuth,handlePostQuestion);

router.route('/:id')
.patch(checkAuth,handleUpdateQuestion)
.delete(checkAuth,handleDeleteQuestion)

module.exports = router;