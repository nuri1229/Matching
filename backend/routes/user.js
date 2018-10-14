var express = require('express');
var router = express.Router();
var objUsers = require('./obj/objUsers.js');
const fileUpload = require('express-fileupload');
var db = require('./db/db.js');
var fs= require('fs');


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
    
     //▼포폴파일변수
     var uploadedData = req.files.uploadData; //넘겨온 파일 받는부분
     console.log('post요청받음 \n넘겨온파일녀석 => ',uploadedData);
     var OrinalFileName= uploadedData.name; //po_file_username
     var ConvertedFileName= Converted+OrinalFileName; //po_file_name
     var FilePath = `../frontend/static/data/${user_id}`;//po_file_path
     console.log('po_file_username ->',OrinalFileName,'\n',
                 'po_file_name ->',ConvertedFileName,'\n',
                 'po_file_path ->',FilePath);
     
     //▼폴더가 있는지없는지!
     console.log('Filepath ->',FilePath,'\n 검사들어갑니다!');
 
     if (!fs.existsSync(FilePath)){ //없다면
         fs.mkdirSync(FilePath);//만든다
         console.log('경로에 폴더가 없어서 만들었습니다');
     }else{//있다면
         console.log('경로에 이미폴더가 만들어져있습니다');
     }
 
     //▼파일업로드작업
     uploadedData.mv(`${FilePath}/${ConvertedFileName}`, function(err) {    
         if (err){
           res.send('파일업로드실패');
         }else{ //else시작 
             console.log('파일업로드완료!');
             //▼DB작업
             var sql =`select * from tb_user where user_id='${user_id}'`; 
             console.log('user_id ->',user_id);
             db.query(sql,function(err,data,fields){
                 if(err){
                      throw err;
                 }else{
                     console.log('1차쿼리 성공\n data ->',data);
                     
                     var user_nickname = data[0].user_nickname;
                     console.log('user_nickname ->',user_nickname);
                     var user_number = data[0].user_number;
                     console.log('user_number ->',user_number);
 
 
                     var sql2= 'insert into tb_portfolio values (?,?,?,?,?,?,?,?,?,?,default,?,default,?,?);';
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
                         po_desc],
                         function(err2,data2,fields){
                             if(err2){
                                 throw err2;
                             }else{
                                 res.send('DB추가완료!');
                         }
                     });
                 }            
             });//쿼리끝
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
