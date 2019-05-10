var query = require('../../mysql');
var sql = require('../../mysql/sql');
var addUser = function(req, res, next) {
    var uid = require('node-uuid').v1();
    var name = req.body.name;
    query(sql.ADD_USER, [uid, name], function(err, result) {
        if (err) {
            res.json({ code: 0, msg: error })
        } else {
            res.json({ code: 1, data: '添加成功' })
        }
    })
}

module.exports = {
    addUser: addUser
}