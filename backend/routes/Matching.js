var express = require('express');
var router = express.Router();
var objMatching = require('./obj/objMatching.js');
router.get('/search',function(req,res,next){
  console.log('검색창폼 진입OK');
  res.render('search.ejs');
});

//검색결과보기
router.post('/list', function(req, res, next) {
    console.log(' 매칭 리스트 진입');

    var reqGender = req.body.user_gender; //vue parameter값 보고수정
    var reqAge = req.body.user_age; //vue parameter값 보고수정
    var reqGenre = req.body.gen_number; //vue parameter값 보고수정
    var reqType = req.body.po_type; //vue parameter값 보고수정
    var reqLocation = req.body.location_number; //vue parameter값 보고수정

    /*공백제거단계*/
    var regTextGender = reqGender;
    var regTextAge = reqAge;
    var regTextGenre = reqGenre;
    var regTextType = reqType;
    var regTextLocation = reqLocation;

    var FilterCondtions = {};
  
    if(req.body == undefined){ //list 초기 로드시

    }else{ //초기로드아닐시
      regTextGender.replace(/\s/gi, "");
      regTextAge.replace(/\s/gi, "");
      regTextGenre.replace(/\s/gi, "");
      regTextType.replace(/\s/gi, "");
      regTextLocation.replace(/\s/gi, "");

      if(regTextGender !== ''){FilterCondtions["u.user_gender"]=reqGender;} //sql jon문과연동 
      if(regTextAge !== ''){FilterCondtions["u.user_age"]=reqAge;} //sql jon문과연동 
      if(regTextGenre !== ''){FilterCondtions["g.gen_number"]=reqGenre;} //sql jon문과연동 
      if(regTextType !== ''){FilterCondtions["p.po_type"]=reqType; } //sql jon문과연동 
      if(regTextLocation !== ''){FilterCondtions["u.location_number"]=reqLocation;} //sql jon문과연동 
    }

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