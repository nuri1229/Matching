var db = require('../db/db.js');

exports.InsertUser = function (req,res,UserObject){
    console.log('인서트함수들어옴, 받아온객체내용 ->',UserObject);
    //vue에서 순서만 잘고치면 while문으로도가능할거같음
    var user_id = UserObject['user_id'];
    var user_pw = UserObject['user_pw']; 
    var user_name = UserObject['user_name']; 
    var user_nickname = UserObject['user_nickname'];
    var user_email = UserObject['user_email'];
    var user_phone = UserObject['user_phone'];
    var user_sns = UserObject['user_sns'];
    var user_age = parseInt(UserObject['user_age']); //type
    var location_number = parseInt(UserObject['location_number']); //type
    var user_gender = UserObject['user_gender'];
    var user_desc = UserObject['user_desc'];
    var user_type = UserObject['user_type'];
    console.log('user_id -> ',user_id);
    console.log('typeof(user_age) -> ',typeof(user_age));
    console.log('typeof(location_number) -> ',typeof(location_number));
    console.log('typeof(user_gender) -> ',typeof(user_gender));

   //맨앞에  물음표하나 더놓고 , 맨앞에 user_number넣어야함 
    var sql = 'insert into tb_user values("ttt2",?,?,?,?,?,?,?,?,?,?,?,?,default,?,default,?);'; //user_number가없다
    db.query(sql,[user_id,
                user_pw,
                user_name,
                user_nickname,
                user_email,
                user_phone,
                user_sns,
                user_age,
                location_number,
                user_gender,
                user_desc,
                user_type,
                user_nickname,
                user_nickname],
                function(err,data,fields){
                    if(err) {throw err;}
                    else {res.send('회원가입완료');}
                });
}