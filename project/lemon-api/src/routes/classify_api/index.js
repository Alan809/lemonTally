var query = require('../../mysql');
var sql = require('../../mysql/sql');

//查询所有图标
var selectIcon = function(req, res, next) {
    query(sql.SELECT_ICON, function(err, result) {
        if (err) {
            res.json({ code: 0, msg: error })
        } else {
            res.json({ code: 1, data: result })
        }
    })
};
//添加分类
var addClassify = function(req, res, next) {
    var obj = req.body,
        c_icon = obj.c_icon,
        c_name = obj.c_name,
        uid = obj.uid,
        type = obj.type;
    if (!c_icon || !c_name || !uid || !type) {
        res.json({ code: 4, msg: '缺少参数' })
    } else {
        isHasClassify();
    }

    //查看是否有分类
    function isHasClassify() {
        query(sql.ISHASCLASSIFY, [uid, c_name], function(err, result) {
            if (err) {
                res.json({ code: 0, msg: err })
            } else if (result.length) {
                res.json({ code: 3, msg: '分类已存在' })
            } else {
                addclassifys()
            }
        })
    };
    //添加分类
    function addclassifys() {
        var cid = require('node-uuid').v1();
        query(sql.INSERT_CLASS, [cid, c_icon, c_name, uid, type], function(err, result) {
            if (err) {
                res.json({ code: 0, msg: error })
            } else {
                res.json({ code: 1, data: '添加成功' })
            }
        })
    }

}

//查看个人的分类
var selectClassify = function(req, res, next) {
    var uid = req.query.uid;
    query(sql.SELECTCLASSIFY, [uid], function(err, result) {
        if (err) {
            res.json({ code: 0, msg: error })
        } else {
            res.json({ code: 1, data: result })
        }
    })
};
module.exports = {
    selectIcon: selectIcon,
    addClassify: addClassify,
    selectClassify: selectClassify
}