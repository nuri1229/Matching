var db = require('../db/db.js');
var sess;

exports.CheckId_Pw = function(req,res,ID,PW){
    var sql = 'select * from tb_user where user_id=? and user_pw=?';
    db.query(sql,[ID,PW],function(err,data,fields){
        
        if(err){
            throw err;
        }else{
 
            var result={};//JSON객체

            if(data.length == 0){//로그인 실패

                var message='failed';
               
                result["user_info"]=null;
                result["message"]=message;
                console.log(result);
                res.send(result);

            }else{//로그인 성공
                console.log('data[0]을 찍어보자!! >>',data[0]);                
                sess = req.session;
                console.log('sess을 찍어보자!!>>',sess);
                sess.user_info=data[0] ;
                console.log('sess.user_info!! >>',sess.user_info);

                if(data.user_id === 'admin'){
                    var message='admin';                              
                }else{
                    var message=`success`;
                }

                result["user_info"]=sess.user_info;
                result["message"]=message;

               

                console.log(result);
                res.send(result);
            }
        }
    });
}



