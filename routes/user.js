const express = require('express');
const router = express.Router();
const {loginUser, signupUser} = require('../controller/user');
const {validateInput} = require('../middleware/user');

router.post('/login', loginUser);
router.post('/signup',validateInput, signupUser);

module.exports = router;