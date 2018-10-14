var db = require('../db/db.js');

exports.getAllportfolios = function(req,res,FilterConditions){
    console.log('getAllprotfolios succefully access!!');
    /*
     where절을 쓸필요가있나없나확인하는과정 
    */
   var FilterConditionsLen = Object.keys(FilterConditions).length; //where절 에넣을 녀석들이있나없나
   console.log('넘어온객체녀석',FilterConditions);
   console.log('where 제약조건갯수: ',FilterConditionsLen);
    var sql='select '; //일부로 띄워씀
    var bodyQuery =`
        p.po_number,
        p.po_title,
        u.user_id,
        u.user_nickname,
        p.created_by,
        p.updated,
        u.user_gender,
        u.user_age,
        g.gen_name,
        p.po_type,
        u.user_type,
        l.location_name,
        p.po_view_count,
        p.po_apply_count,
        p.po_file_path,
        p.po_file_name,
        ROUND((p.po_apply_count/p.po_view_count)*100,1) as 'per_selected'
    `;    
    var fromQuery =`from tb_portfolio as p
        join tb_user as u on p.user_number = u.user_number
        join tb_location as l on u.location_number = l.location_number
        join tb_genre as g on p.gen_number = g.gen_number`; 

    var EndingQuery=` order by po_apply_count DESC,per_selected DESC;`

    if(FilterConditionsLen == 0){ //where절이 필요없으면 
        sql = sql + bodyQuery +fromQuery+ EndingQuery;
        console.log(sql);

        //query실행
        db.query(sql,function(err,data,fields){
            if(err){
                throw err;
            }else{
            console.log('쿼리결과',data);
            res.send(data);
            }
        });

    }else{ //where절이필요있으면
            var whereQuery=` where `;
            var keyNames = Object.getOwnPropertyNames(FilterConditions); //배열
            
            var i = 0;
            while(i<FilterConditionsLen){

                var keyName = keyNames[i];
                var ConditionValue = FilterConditions[keyName];
                
                /*타입확인*/ 
                console.log(`origin typeof(condtions[${i}]) ->` ,typeof(ConditionValue));

                /*타입변환*/
                if(keyName === 'g.gen_number' ||  keyName === 'u.location_number'){
                    console.log('타입변환전 ->',typeof(ConditionValue));
                    ConditionValue = parseInt(ConditionValue);
                    console.log('타입변환후 ->',typeof(ConditionValue));
                }else{
                    if(keyName === 'u.user_age'){
                        //아무일없음
                    }else{
                        ConditionValue = "'"+FilterConditions[keyName]+"'";
                        console.log(`FilterConditions["${keyName}"]->modified to VARCHAR for SQL`,ConditionValue);
                    }
                    
                }

                console.log(`condtions[${i}] key:value ->>`,keyName,' : ',ConditionValue);
                    if(i == 0){
                        if(keyName === 'u.user_age'){
                            whereQuery += keyName+' '+ConditionValue;
                        }else{
                            whereQuery += keyName +"=" + ConditionValue;
                        }
                        
                    }else{
                        if(keyName === 'u.user_age'){
                            whereQuery +=' and '+ keyName +' '+ConditionValue;
                        }else{
                            whereQuery +=' and '+ keyName +" = " + ConditionValue;
                        }
                    }
                i++;
            }   
            
            sql = sql + bodyQuery +fromQuery+ whereQuery + EndingQuery;
            console.log(sql);


            //query실행
            db.query(sql,function(err,data,fields){
                console.log('쿼리결과',data);
                res.send(data);
            });
    

            
    }  
}