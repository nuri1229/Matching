var db = require('../db/db.js');
var nodemailer = require('nodemailer');
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

                var jwt=require('jsonwebtoken')
                var secret='MATCHING_WEB'

                const p = new Promise((resolve, reject) => {
                    jwt.sign(
                        {
                            _id: sess.user_info.user_id,
                            username: sess.user_info.user_nickname
                        }, 
                        secret, 
                        {
                            expiresIn: '7d',
                            issuer: 'velopert.com',
                            subject: 'userInfo'
                        }, (err, token) => {
                            if (err) reject(err)
                            resolve(token) 
                        })     
                })
                p.then((resolvedData) => {

                    console.log(resolvedData);
                    result["token"]=resolvedData;
                    var a=jwt.verify(result.token, secret)
                    console.log(a)
                    res.send(result)
                })

                //console.log(result);
                //res.send(result);
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


exports.searchPw=function(req,res,userId,userName,userEmail){

    console.log('비번찾기들어옴');
    var user_id = userId;
    var user_name = userName;
    var user_email = userEmail;

    console.log('req.body.user_id =',user_id);
    console.log('req.body.user_name =',user_name);
    console.log('req.body.user_email =',user_email);

    var sql='select user_pw from tb_user where user_id=? and user_name=? and user_email=?';
    db.query(sql,[user_id,user_name,user_email],function(err,data,fields){
        console.log('data ->',data);
        if(data.length==0){
            res.send('pw가없습니다.');
        }else{

            var smtpTransport = nodemailer.createTransport({  
                service: 'Gmail',
                auth: {
                    user: 'johannesedelstein',
                    pass: 'dark42984298'
                }
            });
            
            var mailOptions = {  
                from: '관리자 <johannesedelstein@gmail.com>',
                to: `${user_email}`,
                subject: `${user_id}님 요청하신 비밀번호찾기입니다.`,
                text: '본인이 요청하신경우가 아닌경우, 도용된사례이오니 비밀번호를 변경해주시기바랍니다. '
            };
            
            smtpTransport.sendMail(mailOptions, function(error, response){
            
                if (error){
                    console.log(error);
                } else {
                    console.log("Message sent : " + response.message);
                }
                
                smtpTransport.close();
                res.send('입력하신 이메일로 비밀번호를 전송하였습니다.');
            });

           

        }

    });

}


