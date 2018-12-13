var express = require('express');
var router = express.Router();

var userApi = require('./users_api');
/* GET users listing. */

//添加用户
router.post('/api/userlist', userApi.addUser);

module.exports = router;