var express = require('express');
var router = express.Router();
var objLogin = require('./obj/objLogin.js');

//로그인하기
router.get('/', function(req, res, next) {

 var id = req.body.user_id;
 var pw = req.body.user_pw;
 var result=0;

 if(id==='admin' && pw==='admin'){
    result=1;
 }
 
 res.send(result.toString());
 
});

//ID찾기폼(for Node)
router.get('/ForgotYourId',function(req,res,next){
    console.log('아이디찾기폼');
    res.send('ForgotYourId');
});

//ID찾기Process(for Vue and Node)
router.post('/ForgotYourId',function(req,res,next){
    res.send('MsgObeject');
});

//PW찾기폼
router.get('/ForgotYourPw',function(req,res,next){
    console.log('비번찾기폼');
    res.send('ForgotYourPw');
});

//PW찾기Process(for Vue and Node)
router.post('/ForgotYourPw',function(req,res,next){
    res.send('MsgObeject');
});

module.exports = router;
