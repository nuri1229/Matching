var db = require('../db/db.js');

exports.InsertUser = function (req,res,UserObject){
    console.log('인서트함수들어옴, 받아온객체내용 ->',UserObject);
    
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
    var AlphabetArr = 
        ['a','b','c','d','e',
        'f','g','h','i','j',
        'k','l','m','n','o',
        'p','q','r','s','t',
        'u','v','w','x','y',
        'z'];
        var user_number='UIDX';
        var cnt=0;
        while(cnt< 12){
        var AlphabetRandomKey = Math.floor(Math.random()*26); 
        console.log(AlphabetRandomKey);
        user_number+=AlphabetArr[AlphabetRandomKey];
        cnt++;
        }
        console.log(user_number);
   
    var sql = 'insert into tb_user values(?,?,?,?,?,?,?,?,?,?,?,?,?,default,?,default,?);';
    db.query(sql,[user_number,
                user_id,
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