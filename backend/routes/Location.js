var express = require('express');
var router = express.Router();
var pool = require('./db/database');

// ※ async / await  쓰기위해서는, 노드버젼은 반드시 8.x 이상이어야합니다 
router.get('/', async function(req, res, next) 
{
   
    try {
        var getAllLocationDataSQL = 'select location_number,location_name from tb_location';
        var data = await pool.query(getAllLocationDataSQL)
            
        var result = [];
        var newData = {location_number:0,location_name:'상관없음'};
        result.push(newData);

        var i =0;
        while(i<data.length){
            var locationNumber = data[i].location_number;
            var locationName = data[i].location_name;

            var originData = {location_number:locationNumber,location_name:locationName};
            result.push(originData);
            i++;
        }
        console.log(result);
        res.send(result);

    } catch(err) {
    throw new Error(err)
    }

    })

module.exports = router;