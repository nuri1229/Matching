var db = require('../db/db.js');



getAllLocation();


function getAllLocation(){

    var sql = 'select * from tb_location';
    db.query(sql,function(err,data,fields){
        if(err){
            throw err;
        }else{
            exports.locations = data;
        }
    });
}