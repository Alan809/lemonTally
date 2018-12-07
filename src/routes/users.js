var express = require('express');
var router = express.Router();

var userApi = require('./user');
/* GET users listing. */
router.get('/api/userlist', userApi.selectUser);

module.exports = router;