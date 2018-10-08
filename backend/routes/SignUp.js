var express = require('express');
var router = express.Router();

//회원가입폼
router.get('/', function(req, res, next) {
    console.log('여기는 SingUp.js 라우터요청');
    res.send('SignUp');
  });

//회원가입Process
router.post('/', function(req, res, next) {

    console.log('여기는 회원가입프로세스.. ');
    res.send('MsgObject');
});
  
module.exports = router;