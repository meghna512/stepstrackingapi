const express = require('express');
const router = express.Router();
const stepRoutes = require('./steps');
const userRoutes = require('./user');

router.use('/steps', stepRoutes);
router.use('/user', userRoutes);

module.exports = {
    router
};
