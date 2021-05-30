const express = require('express');
const router = express.Router();
const controller = require('./user.controller');


// router.post('/info', controller.login);
router.post('/login', controller.login);
router.post('/check', controller.joinCheck);
router.post('/', controller.join);


module.exports = router;