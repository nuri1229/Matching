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

//아이디찾기
exports.searchId=function(req,res,userName,userEmail){

    var user_name = userName;
    var user_email= userEmail;

    console.log('req.body.user_name =',user_name);
    console.log('req.body.user_email =',user_email);

    var sql= 'select user_id from tb_user where user_name=? and user_email=?';
    db.query(sql,[user_name,user_email],function(err,data,fields){
        
        if(err){
            throw err;
        }else{
            console.log('data =',data);
            var result ;
            if(data.length ==0){
                console.log('찾는아이디없음');
                result='찾는아이디없음';
                res.send(result);
            }else{
                console.log('아이디찾음! >>',data[0].user_id);
                result=data[0].user_id;
                res.send(result);
            }
           
        }
    });
}





