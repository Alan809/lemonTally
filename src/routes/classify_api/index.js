var query = require('../../mysql');
var sql = require('../../mysql/sql');

var uuid = require('node-uuid');

//获取分类图标
var selectIcon = function(req, res, next) {
    query(sql.SELECT_ICON, function(err, result) {
        if (err) {
            res.json({ code: 0, msg: err })
        } else {
            res.json({ code: 1, msg: result })
        }
    })
}

//添加分类
var addClassify = function(req, res, next) {
    var params = req.body;
    //cid,c_name,c_icon,type,uid
    var c_name = params.c_name,
        c_icon = params.c_icon,
        uid = params.uid,
        type = params.type;

    if (!uid || !c_name || !c_icon || !type) {
        res.json({ code: 4, msg: '缺少参数' })
    } else {
        //是否存在此分类名
        isHasClassify();
    }

    function isHasClassify() {
        query(sql.SELECT_LIST, [uid, c_name, type], function(err, result) {
            if (err) {
                res.json({ code: 0, msg: err })
            } else {
                if (result.length) {
                    res.json({ code: 3, msg: '此分类名已存在' })
                } else {
                    addClassify();
                }

            }
        })
    }

    function addClassify() {
        var cid = uuid.v1();
        query(sql.ADD_LIST, [cid, c_name, c_icon, type, uid], function(err, result) {
            if (err) {
                res.json({ code: 0, msg: err })
            } else {
                res.json({ code: 1, msg: '分类添加成功' })
            }
        })
    }
}


//获取所有分类
var getClassify = function(req, res, next) {
    var uid = req.query.uid;
    if (!uid) {
        res.json({ code: 4, msg: '缺少参数' })
    } else {
        query(sql.SELECT_CNAME, [uid], function(err, result) {
            if (err) {
                res.json({ code: 0, msg: err })
            } else {
                res.json({ code: 1, data: result })
            }
        })
    }

}

module.exports = {
    selectIcon: selectIcon,
    addClassify: addClassify,
    getClassify: getClassify
}