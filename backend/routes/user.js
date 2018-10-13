var express = require('express');
var router = express.Router();
var objUsers = require('./obj/objUsers.js');
const fileUpload = require('express-fileupload');
router.use(fileUpload());
var fs= require('fs');

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
router.post('/portfolio/create',function(req,res,next){
    console.log('req.body->',req.body,'\n req.files -> ',req.files);
    var po_data = req.body.po_data;
    console.log('po_data ->',po_data);
    //console.log('req.body.po_data[\'user_id\'] ->',req.body.po_data['user_id']);//undefined
    //console.log('req.body.po_data.get(\'user_id\') ->',req.body.po_data.get('user_id')); //문법오류
    //console.log(Object.keys(req.body.po_data)); //0~14
    //console.log('JSON.stringfy(req.body.po_data).user_id -> ',JSON.stringify(req.body.po_data).user_id);
    //console.log('typeof(req.body.po_data) -> ',typeof(po_data));
    console.log('JSON.parse(req.body.po_data)-> ',JSON.parse(req.body.po_data).user_id);
   /*  var i = 0;
    while(i<Object.keys(po_data).length){
      var value =po_data[i];
      console.log(`value[${i}] ->`,value[i]);
      i++;
    } */

    res.send('ddd');
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
