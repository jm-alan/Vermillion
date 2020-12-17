const router = require('express').Router();

router.use('/session', require('./session'));

router.use('/users', require('./users'));

module.exports = router;
