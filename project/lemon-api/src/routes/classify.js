var express = require('express');
var router = express.Router();

var iconList = require('./classify_api');
/* GET users listing. */

//查看所有图标
router.get('/api/selectIcon', iconList.selectIcon);
//添加分类
router.post('/api/addClassify', iconList.addClassify);
//查看所有分类
router.get('/api/selectClassify', iconList.selectClassify);

module.exports = router;