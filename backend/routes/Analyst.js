var express = require('express');
var router = express.Router();
var db = require('./db/db.js');


//3가지항목
router.post('/',function(req,res,next){
    var result={};
    var count =0;

    //장르별검색비율
    var sql_01 = `
                SELECT 
                    GROUP_CONCAT(if(tt.gen_name = '일상', value, NULL)) AS 'daily', 
                    GROUP_CONCAT(if(tt.gen_name = '로맨스', value, NULL)) AS 'romance', 
                    GROUP_CONCAT(if(tt.gen_name = '액션', value, NULL)) AS 'action',
                    GROUP_CONCAT(if(tt.gen_name = '개그', value, NULL)) AS 'gag',
                    GROUP_CONCAT(if(tt.gen_name = '판타지', value, NULL)) AS 'fantasy',
                    GROUP_CONCAT(if(tt.gen_name = '시대극', value, NULL)) AS 'hitorical',
                    GROUP_CONCAT(if(tt.gen_name = '학원', value, NULL)) AS 'supplementary',
                    GROUP_CONCAT(if(tt.gen_name = '멜로', value, NULL)) AS 'melo', 
                    GROUP_CONCAT(if(tt.gen_name = '스포츠', value, NULL)) AS 'sports'
                FROM
                    (select gen_name,
                                truncate((count(*)/(select count(*) from tb_analyst where search_gen_number is not null)*100),2) as value
                    from tb_analyst a
                    join tb_genre g on a.search_gen_number = g.gen_number
                    group by search_gen_number) as tt;`;
    
    db.query(sql_01,function(err1,data1,fields1){
        var result1=data1[0];
        result['result1']=result1;
        count+=1;
        return;
    });

    //장르별검색유저 평균나이
    var sql_02=`
                SELECT 
                    GROUP_CONCAT(if(tt.search_gen_number = 1, value, NULL)) AS 'daily', 
                    GROUP_CONCAT(if(tt.search_gen_number = 2, value, NULL)) AS 'romance', 
                    GROUP_CONCAT(if(tt.search_gen_number = 3, value, NULL)) AS 'action',
                    GROUP_CONCAT(if(tt.search_gen_number = 4, value, NULL)) AS 'gag',
                    GROUP_CONCAT(if(tt.search_gen_number = 5, value, NULL)) AS 'fantasy',
                    GROUP_CONCAT(if(tt.search_gen_number = 6, value, NULL)) AS 'hitorical',
                    GROUP_CONCAT(if(tt.search_gen_number = 7, value, NULL)) AS 'supplementary',
                    GROUP_CONCAT(if(tt.search_gen_number = 8, value, NULL)) AS 'melo', 
                    GROUP_CONCAT(if(tt.search_gen_number = 9, value, NULL)) AS 'sports'
                FROM
                    (SELECT t.search_gen_number,truncate(avg(t.user_age),2)as value 
                     FROM
                        (SELECT
                            search_gen_number,
                            login_user_number,
                            u.user_age,
                            u.user_gender,
                            u.user_type,
                            l.location_name
                        FROM tb_analyst a
                        JOIN tb_user u on a.login_user_number = u.user_number
                        JOIN tb_location l on u.location_number = l.location_number
                        GROUP BY search_gen_number,login_user_number
                        ORDER BY search_gen_number asc)as t
                    GROUP BY t.search_gen_number)as tt;`;
    db.query(sql_02,function(err2,data2,fields2){
        var result2=data2[0];
        result['result2']=result2;
        count+=1;
        return;
    });

    //오늘의 포폴랭킹TOP5
    var sql_03=`
            SELECT visited_po_number,gen_name,rank
            FROM	(SELECT    visited_po_number,gen_name,
                        QTY,
                        IF(QTY=@_last_age,@curRank:=@curRank,@curRank:=@_sequence) AS rank,
                        @_sequence:=@_sequence+1,
                            @_last_age:=QTY
                FROM  (SELECT 
                        a.visited_po_number,g.gen_name,
                        COUNT(*) AS QTY
                        FROM tb_analyst a
                        JOIN tb_portfolio p on a.visited_po_number = p.po_number
                        JOIN tb_genre g on p.gen_number = g.gen_number
                        WHERE DATE(a.created) = DATE(NOW())
                        GROUP BY a.visited_po_number) as sub1,
                    (SELECT @curRank := 1, @_sequence:=1, @_last_age:=0) r
                ORDER BY  QTY desc) as sub2
            WHERE rank<=5;
            select * from tb_analyst;`;
    db.query(sql_03,function(err3,data3,fields3){
        var result3=data3;
        result['result3']=result3;
        count+=1;
        return;
    });
                        

    var repeat = setInterval(function(){
        console.log('count->',count);
        if(count == 3){
            clearInterval(repeat);
            console.log('손질전 result ->>',result);
            DoTinkerTheResult();
        }
    },300);


//다듬질함수
function DoTinkerTheResult(){
    /*장르별검색비율 null -> 0처리  */
    var result1 = result['result1'];
    if(result1['daily'] === null){
        result1['daily']=0;
    }
    if(result1['romance'] === null){
        result1['romance']=0;
    }
    if(result1['action'] === null){
        result1['action']=0;
    }
    if(result1['gag'] === null){
        result1['gag']=0;
    }
    if(result1['fantasy'] === null){
        result1['fantasy']=0;
    }
    if(result1['hitorical'] === null){
        result1['hitorical']=0;
    }
    if(result1['supplementary'] === null){
        result1['supplementary']=0;
    }
    if(result1['melo'] === null){
        result1['melo']=0;
    }
    if(result1['sports'] === null){
        result1['sports']=0;
    }

    /*장르별검색유저평균나이 null-> 0처리 */
    var result2 = result['result2'];
    if(result2['daily'] === null){
        result2['daily']=0;
    }
    if(result2['romance'] === null){
        result2['romance']=0;
    }
    if(result2['action'] === null){
        result2['action']=0;
    }
    if(result2['gag'] === null){
        result2['gag']=0;
    }
    if(result2['fantasy'] === null){
        result2['fantasy']=0;
    }
    if(result2['hitorical'] === null){
        result2['hitorical']=0;
    }
    if(result2['supplementary'] === null){
        result2['supplementary']=0;
    }
    if(result2['melo'] === null){
        result2['melo']=0;
    }
    if(result2['sports'] === null){
        result2['sports']=0;
    }

    console.log('\n\n손질된 result ->>',result);
    console.log('typeof -->>',typeof(result));
    res.send(result);
};//DoTinkerTheResult()끝


});//router끝




//특정장르 파이차트에서 키넘겼을때 
router.post('/view',function(req,res,next){
    var search_gen_number = req.body('search_gen_number');
    console.log('분석들어옴');
    var count = 0;
    var result ={};
    
    // ▼특정장르 검색비율
    db.query(`
    select gen_name,
    truncate((count(*)/(select count(*) from tb_analyst where search_gen_number is not null)*100),2) as perSel
    from tb_analyst a
    join tb_genre g on a.search_gen_number = g.gen_number
    group by search_gen_number
    having search_gen_number=${search_gen_number}`,
            function(err1,perSel_BY_GENRE,fields1){ 
                var result1={};
                if(perSel_BY_GENRE.length === 0){
                    result1 ={
                                'search_gen_number': search_gen_number,
                                'perSel': 0
                            }
                }else{
                    result1=perSel_BY_GENRE[0];
                }
                result['result1']=result1;
                count+=1;
            return;
            }
    );
    // ▼특정장르 검색유저 평균나이
    db.query(`
            SELECT t.search_gen_number,t.gen_name,truncate(avg(t.user_age),2)as avg 
            FROM
                (SELECT
                    search_gen_number,
                    login_user_number,
                    u.user_age,
                    u.user_gender,
                    u.user_type,
                    l.location_name
                FROM tb_analyst a
                JOIN tb_genre g on a.search_gen_number = g.gen_number
                JOIN tb_user u on a.login_user_number = u.user_number
                JOIN tb_location l on u.location_number = l.location_number
                GROUP BY search_gen_number,login_user_number
                ORDER BY search_gen_number asc)as t
            
            GROUP BY t.search_gen_number
            HAVING search_gen_number=${search_gen_number};`,
            function(err2,avg_login_user_age_BY_GENRE,fields2){
                var result2={};
                if(perSel_BY_GENRE.length === 0){
                        result2 ={'search_gen_number': search_gen_number,
                                'avg': 0};
                    }else{
                        result2=avg_login_user_age_BY_GENRE[0];//있으면그대로넣는다
                    }
                result['result2']=result2;
                count+=1;
            return;
                    
            }
        );

        // ▼특정장르검색유저 성비율,타입비율
        db.query(`
        SELECT 
            search_gen_number,
            gen_name,
            truncate(sum(case when user_gender = 'M' then 1 else 0 end)/count(*) *100 ,2) as MaleClickerRatio,
            truncate(sum(case when user_gender = 'F' then 1 else 0 end)/count(*) *100 ,2) as FemaleClickerRatio,
            truncate(sum(case when user_type = 'D' then 1 else 0 end)/count(*) *100 ,2) as DrawingClickerRatio,
            truncate(sum(case when user_type = 'S' then 1 else 0 end)/count(*) *100 ,2) as StoryClickerRatio
        FROM (SELECT
                search_gen_number,
                g.gen_name,
                login_user_number,
                u.user_age,
                u.user_gender,
                u.user_type,
                l.location_name
            FROM tb_analyst a
                JOIN tb_user u on a.login_user_number = u.user_number
                JOIN tb_location l on u.location_number = l.location_number
                JOIN tb_genre g on a.search_gen_number = g.gen_number
                GROUP BY search_gen_number,login_user_number
                ORDER BY search_gen_number asc) as t
        GROUP BY search_gen_number
        HAVING search_gen_number=${search_gen_number}
        ORDER BY search_gen_number asc`,
        function(err3,gender_type_ratio_BY_GENRE,fields3){
                var result3={};
                if(gender_type_ratio_BY_GENRE.length === 0){//데이터가없으면
                result3 ={
                            'search_gen_number': search_gen_number,
                            'MaleClickerRatio': 0,
                            'FemaleClickerRatio': 0,
                            'DrawingClickerRatio': 0,
                            'StoryClickerRatio': 0
                        }
                }else{
                    result3=gender_type_ratio_BY_GENRE[0];//있으면그대로넣는다
                }

                result['result3']=result3;
                count+=1;
            return;
        }
    );

    // ▼특정장르검색유저의 지역분포비율
    db.query(`
    SELECT 
       search_gen_number,                
       truncate(sum(case when location_name = '서울' then 1 else 0 end)/count(*) *100 ,2) as seoul,
       truncate(sum(case when location_name = '경기' then 1 else 0 end)/count(*) *100 ,2) as gyeonggi,
       truncate(sum(case when location_name = '인천' then 1 else 0 end)/count(*) *100 ,2) as incheon,
       truncate(sum(case when location_name = '강원' then 1 else 0 end)/count(*) *100 ,2) as gangwon,
       truncate(sum(case when location_name = '충남' then 1 else 0 end)/count(*) *100 ,2) as chungnam,
       truncate(sum(case when location_name = '대전' then 1 else 0 end)/count(*) *100 ,2) as daejeon,
       truncate(sum(case when location_name = '충북' then 1 else 0 end)/count(*) *100 ,2) as chungbuk,
       truncate(sum(case when location_name = '세종' then 1 else 0 end)/count(*) *100 ,2) as sejong,
       truncate(sum(case when location_name = '부산' then 1 else 0 end)/count(*) *100 ,2) as busan,
       truncate(sum(case when location_name = '울산' then 1 else 0 end)/count(*) *100 ,2) as ulsan,
       truncate(sum(case when location_name = '대구' then 1 else 0 end)/count(*) *100 ,2) as daegu,
       truncate(sum(case when location_name = '경북' then 1 else 0 end)/count(*) *100 ,2) as gyeongbuk,
       truncate(sum(case when location_name = '경남' then 1 else 0 end)/count(*) *100 ,2) as gyeongnam,
       truncate(sum(case when location_name = '전남' then 1 else 0 end)/count(*) *100 ,2) as jeonnam,
       truncate(sum(case when location_name = '광주' then 1 else 0 end)/count(*) *100 ,2) as gwangju,
       truncate(sum(case when location_name = '전북' then 1 else 0 end)/count(*) *100 ,2) as jeonbuk,
       truncate(sum(case when location_name = '제주' then 1 else 0 end)/count(*) *100 ,2) as jeju
   FROM (SELECT
           search_gen_number,
           g.gen_name,
           login_user_number,
           u.user_age,
           u.user_gender,
           u.user_type,
           l.location_name
           FROM tb_analyst a
           JOIN tb_user u on a.login_user_number = u.user_number
           JOIN tb_location l on u.location_number = l.location_number
           JOIN tb_genre g on a.search_gen_number = g.gen_number
           group by search_gen_number,login_user_number
           ORDER BY search_gen_number asc) as t
   GROUP BY search_gen_number
   HAVING search_gen_number=${search_gen_number}
   ORDER BY search_gen_number asc;`,
   function(err4,locaionRatio_BY_GENRE,fields4){
       var result4={};
           if(locaionRatio_BY_GENRE.length === 0){//데이터가없으면
               result4 ={
                       'search_gen_number': search_gen_number,
                       'seoul': 0,
                       'gyeonggi': 0,
                       'incheon': 0,
                       'gangwon': 0,
                       'chungnam': 0,
                       'daejeon': 0,
                       'chungbuk': 0,
                       'sejong': 0,
                       'busan': 0,
                       'ulsan': 0,
                       'daegu': 0,
                       'gyeongbuk': 0,
                       'gyeongnam': 0,
                       'jeonnam': 0,
                       'gwangju': 0,
                       'jeonbuk': 0,
                       'jeju': 0
                   }
           }else{
               result4=locaionRatio_BY_GENRE[0];//있으면그대로넣는다
           }
           result['result4']=result4;
           count+=1;
        return;
           
   });



   var repeat = setInterval(function(){
    console.log('count->',count);
    if(count == 4){
        clearInterval(repeat);
        console.log('손질전 result ->>',result);
        res.send(result);
    }
},300);


});//라우터끝

module.exports = router;