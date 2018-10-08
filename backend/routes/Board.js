var express = require('express');
var router = express.Router();

router.get('/List', function(req, res, next) {
    console.log('여기는 Board.js 라우터요청');
    res.send('여기는 Board.js 라우터요청');
});
  
router.get('/View', function(req, res, next) {
    console.log('여기는 Board.js  View 라우터요청');
    res.send('여기는 Board.js  View 라우터요청');
});

router.get('/Create', function(req, res, next) {
    console.log('여기는 Board.js Create 라우터요청');
    res.send('여기는 Board.js Create 라우터요청');
});

router.get('/Update', function(req, res, next) {
    console.log('여기는 Board.js Update 라우터요청');
    res.send('여기는 Board.js Create 라우터요청');
});

router.get('/Delete', function(req, res, next) {
    console.log('여기는 Board.js Delete 라우터요청');
    res.send('여기는 Board.js Create 라우터요청');
});
  module.exports = router;