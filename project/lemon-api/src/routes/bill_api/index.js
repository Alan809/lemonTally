var query = require('../../mysql');
var sql = require('../../mysql/sql');

var addBill = function(req, res, next) {
    var obj = req.body
    uid = obj.uid,
        cid = obj.cid,
        timer = obj.timer,
        money = obj.money;
    if (!uid || !cid || !timer || !money) {
        res.json({ code: 4, msg: '缺少参数' })
    } else {
        var lid = require('node-uuid').v1();
        query(sql.INSERT_BILL, [lid, uid, cid, timer, money], function(err, result) {
            if (err) {
                res.json({ code: 0, msg: error })
            } else {
                res.json({ code: 1, data: '添加成功' })
            }
        })
    }

}

var getBill = function(req, res, next) {
    var timer = req.query.timer,
        uid = req.query.uid,
        time_type = req.query.time_type,
        test = req.query.test;
    var arr = [];
    JSON.parse(test).forEach(function(file) {
        arr.push(decodeURI(file))
    })
    if (!timer || !uid) {
        res.json({ code: 4, msg: '缺少参数' })
    } else {
        var sqlstr = time_type == 1 ? sql.SELECT_YEAR_BILL : sql.SELECT_MONTH_BILL;
        query(sql.SELECT_YEAR_CBILL, [uid, timer, arr], function(err, result) {
            if (err) {
                res.json({ code: 0, msg: err })
            } else {
                res.json({ code: 1, data: result })
            }
        })
    }
}
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