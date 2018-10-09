var express = require('express');
var router = express.Router();
var objUsers = require('./obj/objUsers.js');

//getAllusers(S)
router.get('/', function(req, res, next) {
  var users = objUsers.users; //JSON ?
  console.log('여기는 Users.js users = ',users);
  res.send(users);  
});
//getAllusers(E)

//회원정보화면
router.get('/profile',function(req,res,next){
  console.log('회원정보창입니다');
  res.send('');
});

//회원정보수정
router.get('/profile/update',function(req,res,next){
  console.log('회원정보수정');
  res.send('SqlObject');
});

//회원탈퇴
router.post('/terminated',function(req,res,next){
  console.log('회원탈퇴');
  res.send('SqlObject');
});

//회원포폴리스트 
router.get('/portfolio/list',function(req,res,next){
  console.log('회원정보창입니다');
  res.send('SqlObject');
});

//회원포폴상세
router.get('/portfolio/view',function(req,res,next){
  console.log('회원포폴상세');
  res.send('SqlObject');
});

//회원포폴 추가UI
router.get('/portfolio/create',function(req,res,next){
  console.log('회원포폴 추가UI');
  res.send('SqlObject');
});

//회원포폴 추가Process
router.post('/portfolio/create',function(req,res,next){
  console.log('회원포폴 추가Process');
  res.send('SqlObject');
});

//회원포폴 수정(파일업로드)
router.get('/portfolio/update',function(req,res,next){
  console.log('회원포폴 수정(파일업로드)');
  res.send('SqlObject');
});

//회원포폴삭제
router.get('/portfolio/delete',function(req,res,next){
  console.log('회원포폴삭제');
  res.send('SqlObject');
});


router.get('/profile', function(req, res, next) {
 console.log('여기는 프로필');

});

router.get('/profile/update', function(req, res, next) {
 

});

router.get('/profile/terminated', function(req, res, next) {
 

});

router.get('/profile/portfolio/list', function(req, res, next) {
 

});


router.get('/profile/portfolio/view', function(req, res, next) {
 

});

router.get('/profile/portfolio/create', function(req, res, next) {
 

});

router.get('/profile/portfolio/update', function(req, res, next) {
 

});

router.get('/profile/portfolio/delete', function(req, res, next) {
 

});




module.exports = router;
