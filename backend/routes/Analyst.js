var express = require('express');
var router = express.Router();
var db = require('./db/db.js');

router.post('/',function(req,res,next){
    var search_gen_number = req.body('search_gen_number');
    console.log('분석들어옴');
    var result ={};

    var promise = new Promise(function(resolve, reject) {
        resolve(result);
    });
    
    promise.then(function(PrevResult){ //장르별 선택율(한줄레코드)
        console.log(PrevResult);
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
                    return result;
                }
        );
    }).then(function(PrevResult){ //장르별 평균나이(한줄레코드)
        console.log(PrevResult);
        db.query(`
            SELECT t.search_gen_number,truncate(avg(t.user_age),2)as avg 
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
                    return result;
            }
        );
    }).then(function(PrevResult){ //장르별 유저성비,타입비율(여러줄 레코드)
        console.log(PrevResult);
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
                    return result;
            }
        );
    }).then(function(PrevResult){ //장르별 지역비율(여러줄 레코드)
        console.log(PrevResult);
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
                    return result;
            });
    }).then(function(PrevResult){ //오늘 방문 포폴순위(여러줄 레코드)
        console.log(PrevResult);
        db.query(`
                SELECT VISITED_PO_NUMBER,rank
                FROM	(SELECT VISITED_PO_NUMBER,
                                QTY,
                                IF(QTY=@_last_age,@curRank:=@curRank,@curRank:=@_sequence) AS rank,
                                @_sequence:=@_sequence+1,
                                @_last_age:=QTY
                         FROM  (SELECT 
                                VISITED_PO_NUMBER,
                                COUNT(*) AS QTY
                                FROM tb_analyst
                                WHERE DATE(CREATED) = DATE(NOW())
                                GROUP BY VISITED_PO_NUMBER) as sub1,
                            (SELECT @curRank := 1, @_sequence:=1, @_last_age:=0) r
                         ORDER BY  QTY desc) as sub2
                WHERE rank<=5;        
        `,function(err5,rankingRows,fields5){
            result5 ={};
            result5= rankingRows;
            result['result5'] = result5;
            res.send(result);
        });
    });
});//router끝
module.exports = router;