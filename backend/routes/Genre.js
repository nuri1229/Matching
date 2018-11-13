var express = require('express');
var router = express.Router();
var pool = require('./db/database');

// ※ async / await  쓰기위해서는, 노드버젼은 반드시 8.x 이상이어야합니다 
router.get('/', async function(req, res, next) 
{
   
    try {
        var getAllGenresDataSQL = 'SELECT gen_number,gen_name,icon_name FROM tb_genre WHERE icon_name is not null;';
        var data = await pool.query(getAllGenresDataSQL)       
        console.log(data);
        res.send(data);

    } catch(err) {
    throw new Error(err)
    }

})

module.exports = router;