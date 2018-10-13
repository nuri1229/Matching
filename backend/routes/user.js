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
 
    if (!req.files){
        return res.status(400).send('No files were uploaded.');
    }else{ 
      console.log('파일들어있음');
      
      var formData =req.files['files[0]'];
      console.log(formData);
      console.log('formData.name ->',formData.name);
      var d= new Date();
      var getYear = d.getFullYear();
      var getMonth = d.getMonth();
      var getDay = d.getDay();
      var getSec = d.getSeconds();

      var convertedFileName= ''+getYear+getMonth+getDay+getSec+formData.name;
      console.log('convertedFileName ->',convertedFileName);
 
      //data파일안에 파일조사하기(S)
      fs.readdir('./data', function(err, items) {
        console.log('items => ',items);
        for (var i=0; i<items.length; i++) {
          console.log(items[i]);
        }
      });
      //data파일안에 파일조사하기(E)

      formData.mv(`./data/${convertedFileName}`, function(err) {    
        if (err){
          return res.status(500).send(err);
        }else{
          console.log('없어서만들어서 넣음');
          res.send('File uploaded!');
        }
      });


    }
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
