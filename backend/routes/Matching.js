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
    var FilterCondtions = {};

    if( Object.keys(req.body).length == 0){  //초기 로드시
      console.log('초기화면 req.body 내용물 갯수 => ',req.body);
    }else{//검색조건가동
      var reqSearchOption  = req.body.searchOption;
     
      var reqGender = reqSearchOption['user_gender'];
      var reqType =reqSearchOption['po_type']; 
      var reqGenre = reqSearchOption['genre_number']; 
      var reqLocation = reqSearchOption['location_number']; 
      var reqStart_age = reqSearchOption['start_age']; 
      var reqEnd_age = reqSearchOption['end_age']; 
      console.log('최소나이에 미입력했니? ->',reqStart_age == 0,'matchingList.vue에서  type=\'number\'로 받은 reqStart_age가 json의담긴후 꺼내올때 타입은무엇이니?  ->',typeof(reqStart_age));
      console.log('최대연령에 미입력했니? ->',reqEnd_age == 0,'matchingList.vue에서 type=\'number\'로 받은 reqStart_age가 json의담긴후 꺼내올때 타입은무엇이니?  ->',typeof(reqEnd_age));
      console.log('reqGender 가 \'\'니?->',reqGender==='');
      console.log('reqGenre 가 \'\'니?->',reqGenre==='');
      console.log('reqLocation 가 \'\'니?->',reqLocation==='');

      /* if(reqGender != undefined){ } //성별 get방식호출시,URL로 입력환경일일때는 undefined 필터 반드시필요함,혹은 인풋에직접 타이핑으로 입력시필요함
      if(reqType != undefined){}//타입 
      if(reqGenre != undefined){ }//장르
      if(reqLocation != undefined){ }//지역 */

      if(reqGender!=='')FilterCondtions["u.user_gender"]= reqGender; //matchingList.vue 에서 searchOption 에서 기본으로 ''로줌. trim이필요없음.
      if(reqType!=='')FilterCondtions["p.po_type"]= reqType;
      if(reqGenre!=='')FilterCondtions["g.gen_number"]=reqGenre;
      if(reqLocation!=='')FilterCondtions["u.location_number"]=reqLocation;
     
      if(reqStart_age != 0 && reqEnd_age != 0){   
        var maxAge = Math.max(reqStart_age,reqEnd_age);  
        var minAge = Math.min(reqStart_age,reqEnd_age);  
          var agesQuery = `between ${minAge} and ${maxAge}`;
          FilterCondtions["u.user_age"]=agesQuery;
      }

      // !== 나 === 쓰지말것 
      if(reqStart_age != 0 && reqEnd_age == 0){ //최솟값만있는경우
          var agesQuery=`>=${reqStart_age}`;
          console.log('agesQuery->',agesQuery);
          FilterCondtions["u.user_age"]=agesQuery;
      }
      if(reqStart_age == 0 && reqEnd_age != 0){ //최댓값만있는경우  
          var agesQuery=`<=${reqEnd_age}`;
          FilterCondtions["u.user_age"]=agesQuery;
      }         
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