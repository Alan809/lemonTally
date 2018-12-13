var query = require('../../mysql');
var sql = require('../../mysql/sql');

var uuid = require('node-uuid');

//添加用户
var addUser = function(req, res, next) {
    var uid = uuid.v1();
    var nick_name = req.body.nick_name || '未命名';
    query(sql.ADD_USER, [uid, nick_name], function(err, result) {
        if (err) {
            res.json({ code: 0, msg: err })
        } else {
            res.json({ code: 1, msg: '添加成功' })
        }
    })
}

module.exports = {
    addUser: addUser
}