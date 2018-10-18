var express = require('express');
var router = express.Router();
var objGenre = require('./obj/objGenre.js');

//모든장르받기 
router.get('/',function(req,res,next){
    console.log('Genre 라우터접속');
    var genres = objGenre.genres;
    //console.log('genres = ',genres);
    res.send(genres);
});

module.exports = router;