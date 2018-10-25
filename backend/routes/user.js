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

추가변경사항: 리스트 가져올때 옵션 추가(applyList부분)
/matching/reply/list: sql2부분에서  where a.apply_user_number = ?
                                            ▼
                                   where a.apply_user_number = ? and a.apply_status = 'sending' or a.apply_status = 'completed'로 변경 
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
    where a.reply_user_number = ? and apply_status = 'sending'`;//답변하지않은항목들만

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
            a.apply_number,
            u.user_nickname,
            p.po_title,
            a.reply_status,
            a.apply_status,
            a.apply_date
            from  tb_apply as a
            join tb_user as u on a.reply_user_number = u.user_number
            join tb_portfolio as p on a.po_number = p.po_number
            where a.apply_user_number = ? and a.apply_status = 'sending' or a.apply_status = 'completed'
            order by  reply_status asc,apply_date desc;`; //accept,deny,none 순으로정렬, 날짜순정렬
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

메모: 추가변경사항(2018.10.24)

1.취소요청으로 바뀌었는지 유효성검사
  작업란(A) : select apply_status from tb_apply where apply_number  
                            if(apply_status ==='cancel') {
                            console.log('already canceled before');
                            res.send('failed');
                          }

2.수락했을경우  상대방 유저인포+로케이션 조인해서 정보넘기기
  작업란(B) : if(reply_status ==='accept'){
                    db조회 
                    res.send(정보넘기기);
                }else{
                     res.send('success');
                }

*/
router.post('/matching/reply',function(req,res,next){
    console.log('답장하기잘들어옴');
    console.log('1.취소요청변화여부 검사시작');
    var ApplyObject = req.body.apply;
    var apply_number =ApplyObject.apply_number;
    var checkCancelSQL=`select apply_status from tb_apply where apply_number =?`;
    db.query(checkCancelSQL,[apply_number],function(err,cancelFlag,fields){
        console.log('query성공적으로 마침');
        if(err){//쿼리오류
            console.log('error in checkCancel');
            res.send('failed');
        }else{//쿼리성공
            console.log('성공적으로 쿼리완료 ');
            if(cancelFlag[0]==='undefined'){//빈값
                console.log('cancel flag is undefined');
                res.send('failed');
            }else{//빈값이아닐때
                if(cancelFlag[0].apply_status=='cancel'){//이미 취소되었을떄
                    console.log('already canceled before');
                    res.send('cancel');
                }else{//취소가아닐때, 지금은 sending,complete인데 순서적으로 sending                   
                    console.log('apply_status->',cancelFlag[0].apply_status);
                    next();
                }
            }
        }
    });
},function(req,res,next){
    console.log('2.답장작업시작');
    var ApplyObject = req.body.apply;
    console.log('ApplyObject->',ApplyObject);
    var apply_number = ApplyObject.apply_number;//요청번호
    var reply_status = ApplyObject.reply_status;//답장상태(수락or거절)
    var apply_status = 'completed';//요청상태 (sending->completed)
    var reply_message = ApplyObject.reply_message;//답장메시지
    var updateReplyStatusSQL = 'update tb_apply set reply_status=?,apply_status=?,reply_message=?,reply_date= now() where apply_number=?';
    db.query(updateReplyStatusSQL,[reply_status,apply_status,reply_message,apply_number],function(err2,data2,fields){
        if(err2){ //if01(S)
            console.log('수락(accept),거절(deny) 혹은 송신상태완료(completed)또는  message를수정하는데 실패하였습니다.');
            res.send('failed');
        }//if01(E)
        else{//else01(S)
            console.log('요청번호:',apply_number,' apply_staus -> completed 수정완료하였습니다~ \n',
                        'reply_message->',reply_message,'로 수정완료하였습니다~');
            /* 작업란(B) */
           console.log('수락/거부에 따라 정보넘길지말지 확인들어갑니다~');
            if(reply_status==='accept'){//if02:accept(S)
                console.log('수락하기 이므로 정보넘기는작업 시작합니다~');
                var getApplierInfoSQL=`
                select u.user_number,
                u.user_id,
                u.user_nickname,
                u.user_phone,
                u.user_age,
                u.location_number,
                l.location_name 
                from tb_user as u 
                join tb_location as l on u.location_number = l.location_number
                where u.user_number = (select apply_user_number from tb_apply where apply_number=?);`;
                db.query(getApplierInfoSQL,[apply_number],function(err,ApplierInfoData,fields){
                    if(err){//쿼리Error
                        console.log('신청자 정보 가져오기 쿼리실행에 오류발생');
                        res.send('error');
                    }else{//쿼리성공
                        console.log('신청자 정보 가져오기 쿼리실행 성공');
                        if(ApplierInfoData[0]==='undefined'){//성공,만족하는 데이타 없음
                            console.log('undefined');                        
                        }else{//성공,데이타 있음
                            var Applier_Info ={};
                            Applier_Info = ApplierInfoData[0];
                            console.log('Applier_Info->',Applier_Info);
                            res.send(Applier_Info);
                        }
                    }
                });
           }//if02:accept(E)      
           if(reply_status==='deny'){//if02:deny
            console.log('거절하기 요청받았어요~');
            res.send('succes');
           }//if02:deny            
            
        }//else01(E)
    });
});

/*
프로세스명: 요청취소
필요변수: apply_number
주요기능: apply_status값이 sending->cancel로 변경

문제상황: 소켓io가 아니기때문에 다음상황을 만나게됬습니다.
다음2가지 상황을대비하기위해 추가코딩이필요합니다.
두사람 신청자A,답장자B가 있습니다.
상황1) A가 신청취소를하여 DB에서는 apply_status값이 sending->cancel로  바뀝니다.
    하지만,새로고침하지않다면 옛날 화면을 받고있는B가 거절하기라던지,상세보기라던지,수락한다던지 하게되면 DB에서 최종적으로는 cancel->complete 로 바뀌게됩니다.
    그러면 apply_status ='cancle'인 녀석은 가져오고싶지않았는데, 최종작업이 cancle->complete로 되니까 가져오게되는거죠.
    그러면, A: "어뭐야? 나 이거 취소했는데?? 취소요청이 안됬네?" 가되버립니다 
    그리고 나중에 complete,accept로 함께진행하고있거나 진행했던 녀석들을 조회해올건데, 거기서 분명 취소한 녀석도 존재한단겁니다.


그렇다면 반대상황일때는 어떨까요?
상황2) 답장자B가 수락,거절,읽음 을하였습니다.  그래서 DB는 sending->complete로 바뀌었고 reply_status는 변경이됩니다.
      하지만 요청자A가 아직까지 변경되기전 화면을가지고있다면 어떨까요?
      최종적으로는 complete->cancle 로 바뀌게됩니다.
    그리고 마찬가지로 complete,accept로 함께진행하고있거나 진행했던 녀석들을 조회해올건데,
    요청자입장에서는 당혹하는거지요.. B: "어?! 나 수락했는데 왜없지..??";

해결방법: 답장시(/api/user/matching/reply)에 아직까지 이 요청이 sending인지 를 확인해봅니다. 그래서 실제DB에서는이미 cancel로 바뀌어있으면, 이미 취소된요청입니다. 하고 거기서끝내는거죠.
그외에추가사항: 취소된요청사항은 applyList에서 안나타나게 where절에 sending or complete로 구체적이게 넣습니다.
             그리고 또한, 요청취소를 하게되면 해당 포폴의 po_apply_count 를 -1 시킵니다.

작업내용:
/api/user/matching/reply : select apply_status from tb_apply where apply_number  
                            if(apply_status ==='cancel') {
                            console.log('already canceled before');
                            res.send('failed');
                          }

/matching/reply/list: sql2부분에서  where a.apply_user_number = ?
                                            ▼
                                    where a.apply_user_number = ? and a.apply_status = 'sending' or a.apply_status = 'complete' 로 변경


*/
router.post("/matching/cancel",function(req,res,next){
console.log('요청취소진입성공!');
var ApplyObject = req.body.apply;
console.log('ApplyObject->',ApplyObject);
var apply_number =ApplyObject.apply_number;
console.log('apply_number->',apply_number);

var apply_status_cancle_SQL=`update tb_apply set apply_status='cancel' where apply_number=?`;

    db.query(apply_status_cancle_SQL,[apply_number],function(err,result,fields){
    if(err){
    console.log('DB에 취소요청 수정작업실패');
    res.send('failed');
    }else{

    console.log('DB 취소요청 작업실패');
    res.send('success');

    }

    });

});
module.exports = router;



