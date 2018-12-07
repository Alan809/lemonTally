/*
 * @Author: malan 
 * @Date: 2018-12-07 18:43:19 
 * @Last Modified by: malan
 * @Last Modified time: 2018-12-07 20:52:56
 */
//封装连接池
var mysql = require('mysql');

var config = {
    user: 'root',
    password: 'root',
    database: 'lemon',
    port: 3306,
    host: 'localhost',
    connectionLimit: 100
}

var pool = mysql.createPool(config);

/**
 * 
 * @param {string} sql sql语句
 * @param {Array} query 查询参数
 * @param {Function} fn 回调函数
 */
module.exports = function(sql, query, fn) {
    fn = fn ? fn : query;
    query = query || [];
    pool.getConnection(function(err, con) {
        if (err) {
            fn(err)
        } else {
            con.query(sql, query, function(err, result) {
                if (err) {
                    fn(err)
                } else {
                    fn(null, result)
                }
                con.release();
            })
        }
    })
}