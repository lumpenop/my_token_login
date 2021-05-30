const express = require('express');
const router = express.Router();
const userRouter = require('./user/index.js');


router.use('/user', userRouter);
router.get('/', (req, res)=>{
    res.render('index');
})


module.exports = router;