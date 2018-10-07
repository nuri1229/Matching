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
