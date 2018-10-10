var express = require('express');
var router = express.Router();
var objMatching = require('./obj/objMatching.js');

router.get('/search',function(req,res,next){
  res.render('search');
});

//검색결과보기
router.post('/list', function(req, res, next) {
    console.log('여기는 Matching.js 라우터요청');
    /*만약 Url창에 /matching/list 를 직접치고들어올경우
    파라미터값을 정해주는 IF문 작성필요*/
    var reqGender = req.body.user_gender; //vue parameter값 보고수정
    var reqAge = req.body.user_age; //vue parameter값 보고수정
    var reqGenre = req.body.gen_number; //vue parameter값 보고수정
    var reqType = req.body.po_type; //vue parameter값 보고수정
    var reqLocation = req.body.location_number; //vue parameter값 보고수정

    var FilterCondtions = {};
    if(reqGender !== undefined){FilterCondtions["u.user_gender"]=reqGender;} //sql jon문과연동 string
    if(reqAge !== undefined){FilterCondtions["u.user_age"]=reqAge;} //sql jon문과연동 string
    if(reqGenre !== undefined){FilterCondtions["g.gen_number"]=reqGenre;} //sql jon문과연동 string
    if(reqType !== undefined){FilterCondtions["p.po_type"]=reqType; } //sql jon문과연동 string
    if(reqLocation !== undefined){FilterCondtions["u.location_number"]=reqLocation;} //sql jon문과연동 string

    objMatching.getAllportfolios(req,res,FilterCondtions); //암것도없으면 {}로넘어감

});

//결과물상세보기
router.get('/view/:pk', function(req, res, next) {
  /*만약 Url창에 /view/:pk 를 직접치고들어올경우
  파라미터값을 정해주는 IF문 작성필요*/
  console.log('작업물상세보기');
  res.send('SqlObject');
});

//신청UI페이지
router.get('/apply', function(req, res, next) {
  console.log('신청UI');
  res.send('SqlObject');
});

//신청Process
router.post('/apply',function(req,res,nex){
  console.log('신청 Process');
  res.send('.....');
});



//수신된신청목록
router.get('/reply/list', function(req, res, next) {
  console.log('수신된신청목록');
  res.send('SqlObject');
});


//수신된 신청상세보기
router.get('/reply/view',function(req,res,nex){
  console.log('신청 Process');
  res.send('.....');
});

//답장전송
router.post('/reply/process',function(req,res,nex){
  console.log('수락/거절 Process');
  res.send('.....');
});


  module.exports = router;