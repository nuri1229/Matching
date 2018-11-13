var express = require('express');
var router = express.Router();
var db = require('./db/db.js');
var objSignUP = require('./obj/objSignUp.js');
var pool = require('./db/database');



//아이디중복체크 
router.post('/idDuplicateCheck',async function(req,res,next){

    console.log('여기는 아이디중복체크.. ');
    var ID = req.body.user_id;
    try {
        var idDuplicateCheckSQL = 'select user_id from tb_user where user_id=?';
        var data = await pool.query(idDuplicateCheckSQL,[ID])       
        var result;
            if(data.length == 0){ //중복X
                result = '0';
            }else{ //중복
                result = '1';
            }
            res.send(result);

    } catch(err) {
    throw new Error(err)
    }

});


//이메일중복체크 
router.post('/emailDuplicateCheck',async function(req,res,next){
   
    console.log('여기는 이메일중복체크.. ');
    var userEmail = req.body.user_email;
    console.log('userEmail = ', userEmail);
    try {
        var emailDuplicateCheckSQL = 'select user_email from tb_user where user_email=?';
        var data = await pool.query(emailDuplicateCheckSQL,[userEmail])       
        var result;
            if(data.length == 0){ //중복X
                result = '0';
            }else{ //중복
                result = '1';
            }
            res.send(result);

    } catch(err) {
    throw new Error(err)
    }
});


//닉네임중복체크 
router.post('/nicknameDuplicateCheck',async function(req,res,next){
    console.log('여기는 닉네임중복체크.. ');
    var nickname = req.body.user_nickname;
    console.log('nickname = ', nickname);
    try {
        var nicknameDuplicateCheckSQL = 'select user_nickname from tb_user where user_nickname=?';
        var data = await pool.query(nicknameDuplicateCheckSQL,[nickname])       
        var result;
            if(data.length == 0){ //중복X
                result = '0';
            }else{ //중복
                result = '1';
            }
            res.send(result);
    } catch(err) {
    throw new Error(err)
    }
});


//SignUp.vue에서옴 parameter= user
router.post('/', function(req, res, next) {
    console.log('SignUp.vue에서 회원가입요청을 받았습니다! ');
    var user = req.body.user;
    console.log('SignUp.js 에서 출력됨 user ->',user);
    objSignUP.InsertUser(req,res,user);
});

module.exports = router;