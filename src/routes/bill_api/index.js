var query = require('../../mysql');
var sql = require('../../mysql/sql');

var uuid = require('node-uuid');

//添加账单
var addBill = function(req, res, next) {
    //lid,uid,cid,timer,type,money
    var params = req.body;
    var uid = params.uid,
        cid = params.cid,
        money = params.money,
        timer = new Date();

    if (!uid || !cid || !timer || !money) {
        res.json({ code: 4, msg: '缺少参数' })
    } else {
        var lid = uuid.v1();
        query(sql.ADD_BILL, [lid, uid, cid, timer, money], function(err, result) {
            if (err) {
                res.json({ code: 0, msg: err })
            } else {
                res.json({ code: 1, msg: '账单添加成功' })
            }
        })
    }
}

var getBill = function(req, res, next) {
    var timer = req.query.timer,
        uid = req.query.uid,
        time_type = req.query.time_type; //年 2018;月2018-11
    var classify = req.query.classify || ''; //['购物']
    var classifyArr = [];
    if (!timer || !uid) {
        res.json({ code: 4, msg: '缺少参数' })
    } else {
        var sqlStr;
        if (classify) {
            classify = JSON.parse(classify);
            classify.forEach(function(item) {
                classifyArr.push(decodeURI(item));
            })
            sqlStr = time_type == 1 ? sql.SELECT_YEAR_C_BILL : sql.SELECT_MONTH_C_BILL;
        } else {
            sqlStr = time_type == 1 ? sql.SELECT_YEAR_BILL : sql.SELECT_MONTH_BILL;
        }


        query(sqlStr, [uid, timer, classifyArr], function(err, result) {
            if (err) {
                res.json({ code: 0, msg: err })
            } else {
                res.json({ code: 1, data: result })
            }
        })
    }
}

//删除账单
var delBill = function(req, res, next) {
    var lid = req.query.lid;
    if (!lid) {
        res.json({ code: 4, msg: '缺少参数' })
    } else {
        query(sql.DELETE_BILL, [lid], function(err, result) {
            if (err) {
                res.json({ code: 0, msg: err })
            } else {
                res.json({ code: 1, msg: '删除成功' })
            }
        })
    }
}

module.exports = {
    addBill: addBill,
    getBill: getBill,
    delBill: delBill
}