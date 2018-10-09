var db = require('../db/db.js');


exports.CheckId_Pw = function(req,res,ID,PW){
    var sql = 'select * from tb_user where user_id=? and user_pw=?';
    db.query(sql,[ID,PW],function(err,data,fields){
        
        if(err){
            throw err;
        }else{
            //JSON으로 만들기
           /*  function JSONfy(user_id,message){
                this.user_id =user_id;
                this.message = message;
            } */
            var result={};

            if(data.length == 0){//로그인 실패
                var message='failed';
               // var result = new JSONfy('',message);
                
                result["user_info"]=null;
                result["message"]=message;

                res.send(result);

            }else{//로그인 성공
                var sess;
                sess = req.session;
                sess.user_info = data[0];//세션담기   
                      

                if(data[0].user_id === 'admin'){
                    var message='admin';                              
                }else{
                    var message=`success`;
                }

                result["user_info"]=sess.user_info;
                result["message"]=message;

                //var result = new JSONfy(sess.user_id,message); 

                console.log(result);
                res.send(result);
            }
        }
    });
}



