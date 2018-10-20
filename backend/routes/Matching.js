var express = require('express');
var router = express.Router();
var objMatching = require('./obj/objMatching.js');
var db = require('./db/db.js');
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
    //▼ 최소 옵션
    FilterCondtions["p.po_open_yn"]='Y';//공개글불러오기

    objMatching.getAllportfolios(req,res,FilterCondtions); //암것도없으면 {'p.po_open_yn':'Y'}로넘어감

});



// api/matching/apply
router.post('/apply',function(req,res,next){
  var ApplyObject = req.body.apply;
  var po_number = ApplyObject.po_number;
  console.log('req.body.po_number ->',po_number);
var getApplyCountSQL='select po_apply_count from tb_portfolio where po_number=?';
    db.query(getApplyCountSQL,[po_number],function(err,data,fileds){
        var NewApplyCount = data[0].po_apply_count +1 ;
        var updateApplyCountSQL='update tb_portfolio set po_view_count=? where po_number=?';
        db.query(updateApplyCountSQL,[NewApplyCount,po_number],function(err2,data,fields){
            if(err2){
                console.log('applycount수정실패');
                next();
            }else{
                console.log('applycount수정성공');
                console.log('NewApplyCount->',NewApplyCount);
                next();
            }
        });
    });
},function(req,res,nex){
  console.log('신청하기 진입성공!');
  console.log('req.body->',req.body);
   //▼공통 변수
   var AlphabetArr = 
       ['a','b','c','d','e',
       'f','g','h','i','j',
       'k','l','m','n','o',
       'p','q','r','s','t',
       'u','v','w','x','y',
       'z','0','1','2','3','4','5','6','7','8','9'];
   var apply_number = 'AIDX';
   var cnt=0;
   while(cnt< 12){
       var AlphabetRandomKey = Math.floor(Math.random()*AlphabetArr.length); 
       //console.log(AlphabetRandomKey);
       apply_number+=AlphabetArr[AlphabetRandomKey];
       cnt++;
   }

  //새변수명
  var ApplyObject = req.body.apply;
  console.log('받아온객체 apply->',ApplyObject);
 /*  var po_number =ApplyObject['po_number'];
  var apply_user_number  =ApplyObject['login_user_number'];
  var reply_user_id  =ApplyObject['po_user_id'];
  var apply_message  =ApplyObject['apply_message']; */

  var po_number = ApplyObject.po_number;
  var apply_user_number = ApplyObject.login_user_number;
  var reply_user_id = ApplyObject.po_user_id;
  var apply_message = ApplyObject.apply_message;

  console.log('새변수명\n ',
              'apply_number->',apply_number,'\n',
              'po_number->',po_number,'\n',
              'apply_user_number ->',apply_user_number,'\n',
              'reply_user_id ->',reply_user_id,'\n',
              'apply_message ->',apply_message,'\n');

  var sql = `INSERT INTO tb_apply (apply_number,
    po_number,
    apply_user_number,
    reply_user_number,
    apply_status,
    reply_status,
    apply_message,
    reply_message,
    apply_date,
    reply_date) 
      VALUES
      (?,?,?,(select user_number from tb_user where user_id='${reply_user_id}'),DEFAULT,DEFAULT,?,NULL,DEFAULT,NULL)`;
    console.log('sql->',sql);
    db.query(sql,[apply_number,po_number,apply_user_number,apply_message],function(err,data,fields){
        if(err){
          res.send('failed');
        }else{
          res.send('success');
        }
    });

  
});

// api/matching/view
router.post('/view', function(req, res, next) {
  console.log('작업물상세보기');
  res.send('SqlObject');
});


  module.exports = router;