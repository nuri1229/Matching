var express = require('express');
var router = express.Router();
var objLocation = require('./obj/objLocation.js');

//모든지역받기 
router.get('/',function(req,res,next){
    console.log('Location 라우터접속');
    var locations = objLocation.locations;
    console.log('locations = ',locations);
    res.send(locations);
});