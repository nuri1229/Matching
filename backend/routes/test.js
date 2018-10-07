var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log('test page console');
  res.send('test page');
});

module.exports = router;
