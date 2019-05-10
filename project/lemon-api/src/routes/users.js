var express = require('express');
var router = express.Router();

var userApi = require('./user');
/* GET users listing. */
router.post('/api/userlist', userApi.addUser);

module.exports = router;