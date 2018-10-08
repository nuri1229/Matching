var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log('여기는 Admin.js Main');
    res.send('data');
});

router.get('/Users', function(req, res, next) {
    console.log('여기는 Admin.js User List');
    res.send('data');
});

router.get('/Analyst', function(req, res, next) {
    console.log('여기는 Admin.js Analyst');
    res.send('data');
});
  
  module.exports = router;