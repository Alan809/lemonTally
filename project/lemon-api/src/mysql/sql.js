module.exports = {
    //添加分类
    'ADD_USER': 'insert into userlist(uid,name) values(?,?)',
    //查询icon
    'SELECT_ICON': 'select * from iconlist',
    //添加分类
    'INSERT_CLASS': 'insert into classify(cid,c_icon,c_name,uid,type) values(?,?,?,?,?)',
    //查询分类是否存在
    'ISHASCLASSIFY': 'select * from classify where (uid="*" or uid=?) and c_name=?',
    //查询所有分类
    'SELECTCLASSIFY': 'select * from classify where (uid="*" or uid=?)',
    //添加分类
    'INSERT_BILL': 'insert into bill_list(lid,uid,cid,timer,money) values(?,?,?,?,?)',
    //按月查询账单
    'SELECT_MONTH_BILL': 'select b.*,c.c_name,type,c_icon from bill_list b,classify c,userlist u where u.uid=? and b.uid=u.uid and b.cid=c.cid and date_format(b.timer,"%Y-%m")=?',
    //按年查询账单
    'SELECT_YEAR_BILL': 'select b.*,c.c_name,type,c_icon from bill_list b,classify c,userlist u where u.uid=? and b.uid=u.uid and b.cid=c.cid and date_format(b.timer,"%Y")=?',
    //按年+分类查询账单
    'SELECT_YEAR_CBILL': 'select b.*,c.c_name,type,c_icon from bill_list b,classify c,userlist u where u.uid=? and b.uid=u.uid and b.cid=c.cid and date_format(b.timer,"%Y")=? and c.c_name in (?)',
    //按月+分类查询账单
    'SELECT_MONTH_CBILL': 'select b.*,c.c_name,type,c_icon from bill_list b,classify c,userlist u where u.uid=? and b.uid=u.uid and b.cid=c.cid and date_format(b.timer,"%Y-%m")=? and c.c_name in (?)',
    //删除账单
    'DELETE_BILL': 'delete from bill_list where lid=?'
}