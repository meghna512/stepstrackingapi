const express = require('express');
const router = express.Router();

const { getSteps} = require('../controller/steps');

router.get('/getSteps/:userId', getSteps);

module.exports = router;