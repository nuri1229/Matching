var express = require('express');
var router = express.Router();
var objUsers = require('./obj/objUsers.js');

/* 
  get allusers
*/
router.get('/', function(req, res, next) {
  var users = objUsers.users; //JSON ?
  console.log('여기는 Users.js users = ',users);
  //res.send(users);
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
