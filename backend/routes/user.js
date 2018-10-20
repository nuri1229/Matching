var express = require('express');
var router = express.Router();
var objUsers = require('./obj/objUsers.js');
const fileUpload = require('express-fileupload');
var db = require('./db/db.js');
var fs= require('fs');
var objMatching = require('./obj/objMatching.js');


router.use(fileUpload());

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
    var po_data=JSON.parse(req.body.po_data);
     //▼공통 변수
     var d= new Date();
     var getYear = d.getFullYear() ;
     var getMonth = d.getMonth()+1;
     var getDate = d.getDate();
     var getHours = d.getHours();
     var getMinutes = d.getMinutes();
     var getSec = d.getSeconds();
     var Converted = ''+getYear+getMonth+getDate+getHours+getMinutes+getSec;
     var AlphabetArr = 
         ['a','b','c','d','e',
         'f','g','h','i','j',
         'k','l','m','n','o',
         'p','q','r','s','t',
         'u','v','w','x','y',
         'z','0','1','2','3','4','5','6','7','8','9'];
     var po_number = 'PIDX';
     var cnt=0;
     while(cnt< 12){
         var AlphabetRandomKey = Math.floor(Math.random()*AlphabetArr.length); 
         console.log(AlphabetRandomKey);
         po_number+=AlphabetArr[AlphabetRandomKey];
         cnt++;
     }
     //▼새변수명
     var user_id=po_data['user_id'];
     console.log('user_id->',user_id);
     var po_view_count=po_data['po_view_count'];
     var po_apply_count=po_data['po_apply_count'];
     var po_title=po_data['po_title'];
     var genre_number = parseInt(po_data['gen_number']);
     var po_type=po_data['po_type'];
     var po_desc=po_data['po_desc'];
     var po_open_yn=po_data['po_open_yn'];
    
     //▼포폴파일변수
     var uploadedData = req.files.uploadData; //넘겨온 파일 받는부분
     console.log('post요청받음 \n넘겨온파일녀석 => ',uploadedData);
     var OrinalFileName= uploadedData.name; //po_file_username
     var ConvertedFileName= Converted+OrinalFileName; //po_file_name
     var ToFrontendPath = __dirname + `\\..\\..\\frontend\\static\\data\\${user_id}` ;;//frontend/static/data/로 넣기위해서만든주소
     var FilePath = `/static/data/${user_id}`;//po_file_path
     console.log('po_file_username ->',OrinalFileName,'\n',
                 'po_file_name ->',ConvertedFileName,'\n',
                 'po_file_path ->',FilePath);
     
     //▼폴더가 있는지없는지!
     console.log('ToFrontendPath ->',ToFrontendPath,'\n 검사들어갑니다!');
 
     if (!fs.existsSync(ToFrontendPath)){ //없다면
         fs.mkdirSync(ToFrontendPath);//만든다
         console.log('경로에 폴더가 없어서 만들었습니다');
     }else{//있다면
         console.log('경로에 이미폴더가 만들어져있습니다');
     }
 
     //▼파일업로드작업
     uploadedData.mv(`${ToFrontendPath}/${ConvertedFileName}`, function(err) {    
         if (err){
           res.end();
         }else{ //else시작 
             console.log('파일업로드완료!');
             //▼DB작업
             var sql =`select * from tb_user where user_id='${user_id}'`; 
             console.log('user_id ->',user_id);
             db.query(sql,function(err,data,fields){
                 if(err){
                    res.end();
                 }else{
                     console.log('1차쿼리 성공\n data ->',data);
                     
                     var user_nickname = data[0].user_nickname;
                     console.log('user_nickname ->',user_nickname);
                     var user_number = data[0].user_number;
                     console.log('user_number ->',user_number);
 
 
                     var sql2= 'insert into tb_portfolio values (?,?,?,?,?,?,?,?,?,?,default,?,default,?,?,?);';
                     db.query(sql2,
                         [po_number,
                         user_number,
                         genre_number,
                         po_type,
                         ConvertedFileName,
                         OrinalFileName,
                         FilePath,
                         po_title,
                         po_view_count,
                         po_apply_count,
                         user_nickname,
                         user_nickname,
                         po_desc,
                         po_open_yn],
                         function(err2,data2,fields){
                             if(err2){
                                 res.end('DB추가실패');
                             }else{
                                 console.log('DB추가끝');
                                 res.end('DB추가완료');
                             }
                     });//추가쿼리끝
                 }            
             });//조회쿼리끝
         }//else끝
     });//업로드 끝   
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



/*
프로세스명: 유저프로필
작성날짜: 2018년 10월 19일(금)
작성자:최어진
*/
router.get('/profile', function(req, res, next) {
    console.log('여기는 프로필진입성공!');
    var user_nubmer = req.body.user_number;
    var getUserInfoSQL=`select * from tb_user where user_number=?`;

    db.query(getUserInfoSQL,[user_nubmer],function(err,data,fields){
        if(err){
            console.log('프로필정보를 가져오는데 실패하였습니다.');
            res.send();
        }else{
            console.log('프로필정보를 가져오는데 성공하였습니다.');
            res.send(data);

        }
    });
});

router.get('/profile/update', function(req, res, next) {
 

});

router.get('/profile/terminated', function(req, res, next) {
 

});

/*
프로세스명:수신함리스트
작성날짜:2018년 10월 18일(목)
작성자:최어진
메모: 한화면에2개 표현할거라서 객체2개 필요함
    각각의 리스트가져올때 옵션을 어떻게줄지 생각필요
*/
router.post('/matching/reply/list',function(req,res,next){
console.log('api/user/matching/reply/list 요청진입성공');
var List={};
    var login_user_number = req.body.user_number;
    console.log('login_user_number->',login_user_number);
    var sql= `select 
    a.apply_number,
    u.user_nickname,
    p.po_title,
    p.po_type,
    a.apply_status,
    a.apply_date,
    a.apply_message,
    APS.avgPerSelected as user_selected_per
    from  tb_apply as a
    join tb_user as u on a.apply_user_number = u.user_number
    join tb_portfolio as p on a.po_number = p.po_number
    join (select user_number,AVG(Round(po_apply_count/po_view_count*100,1)) as avgPerSelected
 from tb_portfolio group by user_number) as APS on u.user_number = APS.user_number
    where a.reply_user_number = ?`;

console.log('sql ->',sql);
    db.query(sql,[login_user_number],function(err,replyListData,fields){
        if(err){
            console.log(err);
            res.send('failed');
        }else{
            console.log('this is first');
            List['replyList']=replyListData;
            console.log('result01->',Object.keys(List));
            console.log(' List[replyList]->', List['replyList']);

            var sql2 = `select 
            u.user_nickname,
            p.po_title,
            a.reply_status,
            a.apply_status,
            a.apply_date,
            from  tb_apply as a
            join tb_user as u on a.reply_user_number = u.user_number
            join tb_portfolio as p on a.po_number = p.po_number
            where a.apply_user_number = ?`; //옵션을 어떻게줄지
            db.query(sql2,[login_user_number],function(err,applyListData,fields){
                console.log('this is second');
                List['applyList']=applyListData;
                console.log('result02->',Object.keys(List));
                console.log(' List[applyList]->', List['applyList']);
                res.send(List);
            });
        }
    });
});

/*
프로세스명:수신함상세보기
작성날짜:2018년 10월 19일(금)
작성자:최어진
메모: 
 요청자의포폴모두보기(공개상태는 공개,비공개 모두)
 Vue화면단 완성시 테스트필요

 상세보기할때 view카운트올릴지말지,
*/

router.post('/matching/reply/view',function(req,res,next){
console.log('replyView진입성공');
console.log('읽음표시수정작업들어갑니다~');
var apply_number = req.body.apply_number;//vue에서 날라온변수로바꾸기
var reply_status = 'pending';
var updateReplyStatusSQL = 'update tb_apply set reply_status=? where apply_number=?';
    db.query(updateReplyStatusSQL,[reply_status,apply_number],function(err,data,fields){
        if(err){
            console.log('읽음상태 미결정으로 고치는데 실패하였습니다.');
            next();
        }else{
            console.log('성공: reply_status=\'none\' -> \'pending\'로 수정하는데 성공하였습니다.');
            next();
        }
    });
},function(req,res,next){
    var apply_number = req.body.apply_number;
    var selectApplyUserNumberSQL='select apply_user_number from tb_apply where apply_number=?';
    db.query(selectApplyUserNumberSQL,[apply_number],function(err2,data2,fields2){
        var user_number = data2[0].user_number;
        var FilterCondtions = {};
        FilterCondtions["p.user_number"]=user_number; 
        objMatching.getAllportfolios(req,res,FilterCondtions);
    });    
});

/*
프로세스명:답장하기
작성날짜:2018년 10월 19일(금)
작성자:최어진
메모: Vue화면단 완성시 테스트필요
      수락했을때 상대방의 포폴어플라이카운트올려야할지?
*/
router.post('/matching/reply',function(req,res,next){
    console.log('답장하기잘들어옴');
    var ApplyObject = req.body.apply;
    console.log('ApplyObject->',ApplyObject);
    var apply_number = ApplyObject.apply_number;//뷰에서 넘어온객체이름으로하기
    var reply_status = ApplyObject.reply_status;//뷰에서 넘어온 객체이름으로하기
    var apply_status = 'completed';
    var reply_message = ApplyObject.reply_message;//뷰에서 넘어온 객체이름으로 수정하기
    var updateReplyStatusSQL = 'update tb_apply set reply_status=?,apply_status=?,reply_message=? where apply_number=?';
    db.query(updateReplyStatusSQL,[reply_status,apply_status,reply_message,apply_number],function(err2,data2,fields){
        if(err2){
            console.log('수락(accept),거절(deny) 혹은 송신상태완료(completed)또는  message를수정하는데 실패하였습니다.');
            res.send('failed');
        }else{
            console.log('성공: 수락(accept),거절(deny),송신상태완료(completed)로,message를 수정하는데 성공하였습니다. ');
            res.send('success');
        }
    });
});

module.exports = router;



