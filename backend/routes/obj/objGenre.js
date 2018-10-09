var db = require('../db/db.js');



getAllGenre();


function getAllGenre(){

    var sql = 'select * from tb_genre';
    db.query(sql,function(err,data,fields){
        if(err){
            throw err;
        }else{
            exports.genres = data;
        }
    });

}