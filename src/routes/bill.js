var express = require('express');
var router = express.Router();

var billApi = require('./bill_api');

//添加账单
router.post('/api/addBill', billApi.addBill);

//查询账单
router.get('/api/getBill', billApi.getBill);

//删除账单
router.get('/api/delBill', billApi.delBill)

module.exports = router;