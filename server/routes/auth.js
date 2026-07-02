const express = require('express');
const router = express.Router();
const {handleRegister,handleLogin, handleGetUser,handleUpdateUser} = require('../controller/auth')
const checkAuth = require('../middleware/auth')

router.post('/register',handleRegister);
router.post('/login',handleLogin);
router.route('/me')
.get(checkAuth,handleGetUser)
.patch(checkAuth,handleUpdateUser);

module.exports = router;