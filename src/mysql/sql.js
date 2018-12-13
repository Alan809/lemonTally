module.exports = {
    'SELECT_ALL': 'select * from userlist',
    //添加用户
    'ADD_USER': 'insert into userlist (uid,nick_name) values(?,?)',
    //全部的icon图标
    'SELECT_ICON': 'select * from iconlist',
    //添加分类
    'ADD_LIST': 'insert into classify (cid,c_name,c_icon,type,uid) values(?,?,?,?,?)',
    //查询是否存在此分类名
    'SELECT_LIST': 'select * from classify where (uid="*" or uid=?) and c_name=?',
    //查询所有分类
    'SELECT_CNAME': 'select * from classify where (uid="*" or uid=?)',
    //添加账单
    //谁(uid)在什么时间(timer)干什么(cid)花费/收入(type)多少钱(money)  lid(账单id)
    'ADD_BILL': 'insert into bill_list (lid,uid,cid,timer,money) values(?,?,?,?,?)',
    //select b.*,c.c_icon,c_name,type from bill_list b,classify c,userlist u where b.uid='820567a0-fd0b-11e8-8909-e306a8afa6ad' and b.cid=c.cid and b.uid=u.uid and date_format(b.timer,'%Y-%m')='2018-12'
    //按年查询账单
    'SELECT_YEAR_BILL': 'select b.*,c.c_icon,c_name,type from bill_list b,classify c,userlist u where b.uid=? and b.cid=c.cid and b.uid=u.uid and date_format(b.timer,"%Y")=?',
    //按月查询账单
    'SELECT_MONTH_BILL': 'select b.*,c.c_icon,c_name,type from bill_list b,classify c,userlist u where b.uid=? and b.cid=c.cid and b.uid=u.uid and date_format(b.timer,"%Y-%m")=?',
    //按年+分类
    // (?)-->传数组
    'SELECT_YEAR_C_BILL': 'select b.*,c.c_icon,c_name,type from bill_list b,classify c,userlist u where b.uid=? and b.cid=c.cid and b.uid=u.uid and date_format(b.timer,"%Y")=? and c.c_name in (?)',
    //按月+分类
    'SELECT_MONTH_C_BILL': 'select b.*,c.c_icon,c_name,type from bill_list b,classify c,userlist u where b.uid=? and b.cid=c.cid and b.uid=u.uid and date_format(b.timer,"%Y-%m")=? and c.c_name in (?)',
    //删除账单
    'DELETE_BILL': 'delete from bill_list where lid=?'

}