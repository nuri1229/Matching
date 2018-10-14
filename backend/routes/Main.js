var express = require('express');
var router = express.Router();
var objMatching = require('./obj/objMatching.js');

router.post('/PortfolioSelect',function(req,res,next){
console.log('메인포폴셀렉들어옴');
console.log('req.body ->',req.body);
var gen_number = req.body.gen_number;
console.log('req.body.gen_number ->',gen_number);

var FilterCondtions = {};

//parameter filtering 
if(gen_number == 0){
    console.log('전체');
}else if(gen_number ==1){
    console.log('일상');
    FilterCondtions["g.gen_number"]=gen_number;
}else if(gen_number ==2){
    console.log('로맨스');
    FilterCondtions["g.gen_number"]=gen_number;
}else if(gen_number ==3){
    console.log('액션');
    FilterCondtions["g.gen_number"]=gen_number;
}else if(gen_number ==4){
    console.log('개그');
    FilterCondtions["g.gen_number"]=gen_number;
}else if(gen_number ==5){
    console.log('판타지');
    FilterCondtions["g.gen_number"]=gen_number;
}else if(gen_number ==6){
    console.log('시대극');
    FilterCondtions["g.gen_number"]=gen_number;
}else if(gen_number ==7){
    console.log('학원');
    FilterCondtions["g.gen_number"]=gen_number;
}else if(gen_number ==8){
    console.log('멜로');
    FilterCondtions["g.gen_number"]=gen_number;
}else if(gen_number ==9){
    console.log('스포츠');
    FilterCondtions["g.gen_number"]=gen_number;
}else{

}

objMatching.getAllportfolios(req,res,FilterCondtions); //암것도없으면 {}로넘어감


});



module.exports=router;