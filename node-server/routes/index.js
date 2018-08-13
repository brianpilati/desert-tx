var router = require('express').Router();

router.use('/users', require('./users')); 
router.use('/auth', require('./authentication')); 
router.use('/file-upload', require('./file-upload')); 
module.exports = router;