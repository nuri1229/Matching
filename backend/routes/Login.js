var express = require('express');
var router = express.Router();
app.use(express.json());


router.post('/', function(req, res, next) {

 var id = req.body.user_id;
 var pw = req.body.user_pw;

 var result=0;

 if(id==='admin' && pw==='admin'){
    result=1;
 }

 res.send(result.toString());
 
});

module.exports = router;
