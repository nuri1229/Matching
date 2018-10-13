var db = require('../db/db.js');

function getAllUsers(){
    var sql = 'select * from tb_user';
    db.query(sql,function(err,data,fileds){
        if(err){
            throw err;
        }
        //console.log('users = ',data);
        exports.users = data;
    });
}
getAllUsers();

exports.getUserInfoByID = function (req,res,user_id){
    var sql = 'select * from tb_user where user_id=?';
    db.query(sql,[user_id],function(err,data,fields){
        if(err){
            throw err;
        }
       res.send(data);
    });
}



