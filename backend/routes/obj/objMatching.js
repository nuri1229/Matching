var db = require('../db/db.js');

exports.getAllportfolios = function(req,res,FilterConditions){
    console.log('getAllprotfolios succefully access!!');
    /*
     where절을 쓸필요가있나없나확인하는과정 
    */
   var FilterConditionsLen = Object.keys(FilterConditions).length; //where절 에넣을 녀석들이있나없나
    var sql='select '; //일부로 띄워씀
    var bodyQuery =`
        p.po_number,
        p.po_title,
        p.created_by,
        p.updated,
        u.user_gender,
        u.user_age,
        g.gen_name,
        u.user_type,
        l.location_name,
        p.po_view_count
    `;    
    var fromQuery =`tb_portfiolio as p
        join tb_user as u on p.user_number = u.user_number
        join tb_location as l on u.location_number = l.location_number
        join tb_genre as g on p.gen_number = g.gen_number`; 

    var EndingQuery=`;`

    if(FilterConditionsLen == 0){ //where절이 필요없으면 
        sql = sql + bodyQuery + EndingQuery;
        console.log(sql);

        //query실행
        db.query(sql,function(err,data,fields){
            console.log('쿼리결과',data);
            res.send(data);
        });


    }else{ //where절이필요있으면
            var whereQuery=`where `;
            var keyNames = Object.getOwnPropertyNames(FilterConditions); //배열
            var i = 0;
            while(i<FilterConditionsLen){
            var keyName = keyNames[i];
            var ConditionValue = FilterConditions[keyName];
            /*
               varchar(string) 이면 변수필터링한다.
            */
            if(keyName === 'g.gen_number' || keyName === 'u.user_age'){
                
            }else{
                ConditionValue = "'"+FilterConditions[keyName]+"'";
                console.log('FilterConditions[keyName]->stringfy',ConditionValue);
            }

            console.log(`condtions[${i}] key:value ->>`,keyName,' : ',ConditionValue);
                if(i == 0){
                    whereQuery += keyName +"=" + ConditionValue;
                }else{
                    whereQuery +=' and '+ keyName +" = " + ConditionValue;
                }
            i++;
            }   
            
            sql = sql + bodyQuery + whereQuery + EndingQuery;
            console.log(sql);


            //query실행
            db.query(sql,function(err,data,fields){
                console.log('쿼리결과',data);
                res.send(data);
            });
    

            
    }  
}