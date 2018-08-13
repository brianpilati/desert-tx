var router = require('express').Router();

router.use('/users', require('./users')); 
router.use('/auth', require('./authentication')); 
module.exports = router;