var db = require('../db/db.js');

function getAllLocation(){

    var sql = 'select location_number,location_name from tb_location';
    db.query(sql,function(err,data,fields){
        if(err){
            throw err;
        }else{
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
            exports.locations = result;
        }
    });
}

getAllLocation();