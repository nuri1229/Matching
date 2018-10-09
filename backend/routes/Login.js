var express = require('express');
var router = express.Router();
var objLogin = require('./obj/objLogin.js');

//로그인하기: 입력값이DB에있는지 없는지, 제대로입력했을시 관리자인지 아닌지.
router.post('/', function(req, res, next) {
    console.log('로그인하기');
     var id = req.body.user_id;
     var pw = req.body.user_pw;
     console.log(id,pw);
     objLogin.CheckId_Pw(req,res,id,pw);
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
