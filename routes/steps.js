const express = require('express');
const {setUser} = require('../middleware/user');
const router = express.Router();
const { getSteps} = require('../controller/steps');

router.use(setUser);

router.get('/getSteps/:userName', getSteps);

module.exports = router;