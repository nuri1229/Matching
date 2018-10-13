var db = require('../db/db.js');



getAllGenre();


function getAllGenre(){

    var sql = 'SELECT gen_number,gen_name,icon_name FROM tb_genre WHERE icon_name is not null;';
    db.query(sql,function(err,data,fields){
        if(err){
            throw err;
        }else{
            exports.genres = data;
        }
    });

}