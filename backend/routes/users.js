var express = require('express');
var router = express.Router();
var objUsers = require('./obj/objUsers.js');

/* 
  get allusers
*/
router.get('/', function(req, res, next) {
  var users = objUsers.users; //JSON ?
  console.log('여기는 Users.js users = ',users);
  res.send(users);
});

module.exports = router;
