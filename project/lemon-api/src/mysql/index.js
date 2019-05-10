var opt = {
    user: 'root',
    password: "root",
    database: 'lemon',
    connectionLimit: 100
}
var pool = require('mysql').createPool(opt)
module.exports = function(sql, arr, ck) {
    pool.getConnection(function(err, con) {
        if (err) {
            return ck && ck(err)
        }
        con.query(sql, arr, function(err, result, filed) {
            if (err) {
                return ck && ck(err)
            }
            ck(null, result, filed);
            con.release();
        })
    })
}