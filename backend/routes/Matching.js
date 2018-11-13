var express = require('express');
var router = express.Router();
var objMatching = require('./obj/objMatching.js');
var pool = require('./db/database');
router.get('/search',function(req,res,next){
  console.log('검색창폼 진입OK');
  res.render('search.ejs');
});

//검색결과보기(메인에서는 이거안씀)
router.post('/list',function(req,res,next){
    console.log(' 분석테이블데이터추가단계 진입');
    if( Object.keys(req.body).length == 0){  //초기 로드시
        console.log('초기화면 req.body 내용물 갯수 => ',req.body);
        next();
    }else{
        var reqSearchOption  = req.body.searchOption;
        console.log('분석추가단계에있는 옵션검색->',reqSearchOption);
        var reqGenre = reqSearchOption['genre_number'];
        var reqGender = reqSearchOption['user_gender'];
        //var reqPoType =reqSearchOption['po_type'];  //매칭화면에서는 undefined 이겠네 ,아직 옵션이없음
        var reqUserType =reqSearchOption['user_type']; 
        var reqLocation = reqSearchOption['location_number']; 

        (reqGenre === '')? reqGenre = null: reqGenre= reqGenre;
        (reqGender === '')?reqGender=null: reqGender=reqGender;
        (reqLocation === '')?reqLocation=null:reqLocation = reqLocation;
        (reqUserType === '')? reqUserType= null: reqUserType =reqUserType;
    
        console.log('reqGenre',reqGenre);
        console.log('reqGender',reqGender);
        console.log('reqUserType',reqUserType);
        console.log('reqLocation',reqLocation);
        var analystInsertSQL=`
            insert into tb_analyst (search_gen_number,
            search_user_gender,
            search_location_number,
            search_user_type) 
            values (?,?,?,?);
        `;
        pool.query(analystInsertSQL,[reqGenre,reqGender,reqLocation,reqUserType],function(err01,data01,fields01){

            if(err01){
                console.log('에러발생');
                console.log(err01);
                next();
            }else{
                console.log('추가완료');
                next();
            }
        });
    }
},function(req, res, next) {
    console.log(' 매칭 리스트 진입');
    var FilterCondtions = {};
    if( Object.keys(req.body).length == 0){  //초기 로드시
      console.log('초기화면 req.body 내용물 갯수 => ',req.body);
    }else{//검색조건가동
      var reqSearchOption  = req.body.searchOption;
     
      var reqGender = reqSearchOption['user_gender'];
      //var reqPoType =reqSearchOption['po_type'];  //매칭화면에서는 undefined 이겠네
      var reqUserType =reqSearchOption['user_type']; //메인에서는 undefined 일거고
      var reqGenre = reqSearchOption['genre_number']; 
      var reqLocation = reqSearchOption['location_number']; 
      var reqStart_age = reqSearchOption['start_age']; 
      var reqEnd_age = reqSearchOption['end_age']; 
      console.log('최소나이에 미입력했니? ->',reqStart_age == 0,'matchingList.vue에서  type=\'number\'로 받은 reqStart_age가 json의담긴후 꺼내올때 타입은무엇이니?  ->',typeof(reqStart_age));
      console.log('최대연령에 미입력했니? ->',reqEnd_age == 0,'matchingList.vue에서 type=\'number\'로 받은 reqStart_age가 json의담긴후 꺼내올때 타입은무엇이니?  ->',typeof(reqEnd_age));
      console.log('reqGender 가 \'\'니?->',reqGender==='');
      console.log('reqUserType 가 \'\'니?->',reqUserType===''); //매칭화면에서 유저타입조회
      console.log('reqUserType 가 undefined 니?->',reqUserType); //메인화면 검증용
      //console.log('reqPoType 가 \'\'니?->',reqPoType===''); //메인화면에서 포폴조회
      //console.log('reqPoType 가 undefined 니?->',reqPoType); //매칭화면 검증용
      console.log('reqGenre 가 \'\'니?->',reqGenre==='');
      console.log('reqLocation 가 \'\'니?->',reqLocation==='');

      /* if(reqGender != undefined){ } //성별 get방식호출시,URL로 입력환경일일때는 undefined 필터 반드시필요함,혹은 인풋에직접 타이핑으로 입력시필요함
      if(reqType != undefined){}//타입 
      if(reqGenre != undefined){ }//장르
      if(reqLocation != undefined){ }//지역 */

      if(reqGender!=='')FilterCondtions["u.user_gender"]= reqGender; //matchingList.vue 에서 searchOption 에서 기본으로 ''로줌. trim이필요없음.
      //if(reqPoType!=='' && reqPoType !== undefined)FilterCondtions["p.po_type"]= reqPoType;
      if(reqUserType!=='' && reqUserType !== undefined)FilterCondtions["u.user_type"]= reqUserType;
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



//api/matching/apply
/*
프로세스명: 신청하기
세부단계
    1.요청중복체크 단계
    2.어플라이카운트올리는단계
    3.어플라이테이블에 추가하는단계
작성자:최어진
추가기능: 본인포폴에는 신청못하게(테스트완료)
*/
router.post('/apply',function(req,res,next){
    console.log('apply진입성공! \n 0.본인인증단계입니다!\n');
    var ApplyObject = req.body.apply;
    var po_number = ApplyObject.po_number;
    var apply_user_number = ApplyObject.login_user_number;
    var whetherLoggerisApplier=`select user_number from tb_portfolio where po_number=?`;
    pool.query(whetherLoggerisApplier,[po_number],function(err,ChkFlag,fields){
        if(err){
            res.send('failed');
        }else{
            if(ChkFlag[0]===undefined){
                res.send('undefined');
            }else{
                if(ChkFlag[0].user_number ===apply_user_number){
                    console.log('본인입니다');
                    res.send('unauthorized');
                }else{
                    next();
                }
            }
        }
    });
},function(req,res,next){
    console.log(' 1.중복체크단계입니다!');
    var ApplyObject = req.body.apply;
    var po_number = ApplyObject.po_number;
    var apply_user_number = ApplyObject.login_user_number;
    console.log('ApplyObject->',ApplyObject);
    var whetherApplyStatusDuplicated= `select apply_status from tb_apply where po_number=? and apply_user_number=?`;
    pool.query(whetherApplyStatusDuplicated,[po_number,apply_user_number],function(err,apply_status_data,fields){
        if(err){
            console.log('신청하기중복체킹에서 오류발생하였습니다.');
            res.send('error');
        }else{
            if(apply_status_data[0]===undefined){
                console.log('중복체크 통과');
                next();
            }else{
                var flag = apply_status_data[0].apply_status;
                if(flag ==='sending'){
                    console.log('중복신청되어있습니다.');
                    res.send('duplicate');
                }else{
                    console.log('중복체크통과');
                    next();
                }
            }
        }
    });

},function(req,res,next){
  console.log('2. po_apply_count 증가시키는 단계입니다!');
  var ApplyObject = req.body.apply;
  var po_number = ApplyObject.po_number;
  console.log('req.body.po_number ->',po_number);
var getApplyCountSQL='select po_apply_count from tb_portfolio where po_number=?';
    pool.query(getApplyCountSQL,[po_number],function(err,data,fields){
        var NewApplyCount = data[0].po_apply_count +1 ;
        var updateApplyCountSQL='update tb_portfolio set po_view_count=? where po_number=?';
        pool.query(updateApplyCountSQL,[NewApplyCount,po_number],function(err2,data,fields){
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
  console.log('3. 신청하기 단계입니다!');
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
    pool.query(sql,[apply_number,po_number,apply_user_number,apply_message],function(err,data,fields){
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