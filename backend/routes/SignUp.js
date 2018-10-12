var express = require('express');
var router = express.Router();
var db = require('./db/db.js');
var objSignUP = require('./obj/objSignUp.js');



//아이디중복체크 
router.post('/idDuplicateCheck',function(req,res,next){

    console.log('여기는 아이디중복체크.. ');
    var ID = req.body.user_id;
    console.log('ID = ', ID);
    db.query('select user_id from tb_user where user_id=?',[ID],function(err,data,fields){
        console.log('data = ',data);  
        if(err){
            throw err;
        }else{
            var result;
            if(data.length == 0){ //중복X
                result = '0';
            }else{ //중복
                result = '1';
            }
            res.send(result);
        }
    });
});


//이메일중복체크 
router.post('/emailDuplicateCheck',function(req,res,next){

    console.log('여기는 이메일중복체크.. ');
    var userEmail = req.body.user_email;
    console.log('userEmail = ', userEmail);
    db.query('select user_email from tb_user where user_email=?',[userEmail],function(err,data,fields){
        console.log('data = ',data);  
        if(err){
            throw err;
        }else{
            var result;
            if(data.length == 0){ //중복X
                result = '0';
            }else{ //중복
                result = '1';
            }
            res.send(result);
        }
    });
});


//닉네임중복체크 
router.post('/nicknameDuplicateCheck',function(req,res,next){

    console.log('여기는 닉네임중복체크.. ');
    var nickname = req.body.user_nickname;
    console.log('nickname = ', nickname);
    db.query('select user_nickname from tb_user where user_nickname=?',[nickname],function(err,data,fields){
        console.log('data = ',data);  
        if(err){
            throw err;
        }else{
            var result;
            if(data.length == 0){ //중복X
                result = '0';
            }else{ //중복
                result = '1';
            }
            res.send(result);
        }
    });
});


//SignUp.vue에서옴 parameter= user
router.post('/', function(req, res, next) {
    console.log('SignUp.vue에서 회원가입요청을 받았습니다! ');
    var user = req.body.user;
    console.log('SignUp.js 에서 출력됨 user ->',user);
    objSignUP.InsertUser(req,res,user);
});

module.exports = router;