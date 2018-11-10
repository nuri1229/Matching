var express = require('express');
var router = express.Router();
var db = require('./db/db.js');


//3가지항목
router.post('/',function(req,res,next){
    var result={};
    var count =0;

    //장르별검색비율  (작성: 2018-11-09)
    var sql_01 = `
                SELECT 
                    GROUP_CONCAT(if(tt.gen_name = '일상', value, NULL)) AS '일상', 
                    GROUP_CONCAT(if(tt.gen_name = '로맨스', value, NULL)) AS '로맨스', 
                    GROUP_CONCAT(if(tt.gen_name = '액션', value, NULL)) AS '액션',
                    GROUP_CONCAT(if(tt.gen_name = '개그', value, NULL)) AS '개그',
                    GROUP_CONCAT(if(tt.gen_name = '판타지', value, NULL)) AS '판타지',
                    GROUP_CONCAT(if(tt.gen_name = '시대극', value, NULL)) AS '시대극',
                    GROUP_CONCAT(if(tt.gen_name = '학원', value, NULL)) AS '학원',
                    GROUP_CONCAT(if(tt.gen_name = '멜로', value, NULL)) AS '멜로', 
                    GROUP_CONCAT(if(tt.gen_name = '스포츠', value, NULL)) AS '스포츠'
                FROM
                    (SELECT gen_name,
                                truncate((count(*)/(select count(*) from tb_analyst where search_gen_number is not null)*100),2) as value
                    FROM tb_analyst a
                    JOIN tb_genre g ON a.search_gen_number = g.gen_number
                    GROUP BY search_gen_number) as tt;`;
    
    db.query(sql_01,function(err1,data1,fields1){
        var result1=data1[0];
        result['result1']=result1;
        count+=1;
        return;
    });

    //장르별검색유저 평균나이  (작성: 2018-11-09)
    var sql_02=`
                SELECT
                    GROUP_CONCAT(if(sub2.search_gen_number = 1, age_avg, NULL)) AS '일상', 
                    GROUP_CONCAT(if(sub2.search_gen_number = 2, age_avg, NULL)) AS '로맨스', 
                    GROUP_CONCAT(if(sub2.search_gen_number = 3, age_avg, NULL)) AS '액션',
                    GROUP_CONCAT(if(sub2.search_gen_number = 4, age_avg, NULL)) AS '개그',
                    GROUP_CONCAT(if(sub2.search_gen_number = 5, age_avg, NULL)) AS '판타지',
                    GROUP_CONCAT(if(sub2.search_gen_number = 6, age_avg, NULL)) AS '시대극',
                    GROUP_CONCAT(if(sub2.search_gen_number = 7, age_avg, NULL)) AS '학원',
                    GROUP_CONCAT(if(sub2.search_gen_number = 8, age_avg, NULL)) AS '멜로', 
                    GROUP_CONCAT(if(sub2.search_gen_number = 9, age_avg, NULL)) AS '스포츠'
                FROM(
                      SELECT 
                        search_gen_number,gen_name,truncate(avg(user_age),2) as 'age_avg'
                      FROM(
                            SELECT 
                              date(a.created) as created,
                              search_gen_number,
                              gen_name,
                              login_user_number,
                              user_age
                            FROM
                            tb_analyst a
                            JOIN tb_user u ON login_user_number = user_number
                            JOIN tb_genre g ON search_gen_number = gen_number
                            group by created,search_gen_number,login_user_number
                            order by created,search_gen_number,login_user_number) as sub1
                      GROUP BY search_gen_number) sub2;`;
    db.query(sql_02,function(err2,data2,fields2){
        var result2=data2[0];
        result['result2']=result2;
        count+=1;
        return;
    });

    //오늘의 포폴랭킹TOP5 
    var sql_03=`
                SELECT visited_po_number,
                    po_title,
                    gen_name,
                    rank
                FROM	(SELECT   
                            visited_po_number,
                            po_title,
                            gen_name,
                            QTY,
                            IF(QTY=@_last_age,@curRank:=@curRank,@curRank:=@_sequence) AS rank,
                            @_sequence:=@_sequence+1,
                            @_last_age:=QTY
                        FROM  (SELECT 
                                    a.visited_po_number,
                                    p.po_title,
                                    g.gen_name,
                                    COUNT(*) AS QTY
                                FROM tb_analyst a
                                JOIN tb_portfolio p on a.visited_po_number = p.po_number
                                JOIN tb_genre g on p.gen_number = g.gen_number
                                WHERE DATE(a.created) = DATE(NOW())
                                GROUP BY a.visited_po_number) as sub1,
                              (SELECT @curRank := 1, @_sequence:=1, @_last_age:=0) r
                        ORDER BY  QTY desc) as sub2
                WHERE rank<=5;`;
    db.query(sql_03,function(err3,data3,fields3){
        var result3=data3;
        if(result3 === undefined){
            result3 = 'data is empty';
        }else{
            result['result3']=result3;
        }
       
        count+=1;
        return;
    });

    //오늘본 포폴내역
    var login_user_number = req.body.login_user_number;
    if(login_user_number === undefined){
        count+=1;
    }else{
        var sql_04 =`
                SELECT 
                    login_user_number,
                    visited_po_number,
                    po_title,
                    gen_name as po_gen_name,
                    user_nickname as po_user_nickname,
                    a.created as view_date,
                    search_gen_number
                FROM tb_analyst a
                JOIN tb_genre g ON search_gen_number = gen_number
                JOIN tb_portfolio p ON visited_po_number = po_number
                JOIN tb_user u ON p.user_number = u.user_number
                WHERE login_user_number = ${login_user_number}
                GROUP BY visited_po_number 
                HAVING date(a.created) = date(now())
                ORDER BY a.created desc;`;
        db.query(sql_04,function(err4,data4,fields4){
            var result4= data4
            if(result4 === undefined){
                result4 = 'data is empty';
                count+=1;
                return;
            }else{
                result['result4']= result4;
                count+=1;
                return;
            }
        });
    }
    

   

    

    var repeat = setInterval(function(){
        console.log('count->',count);
        if(count == 4){
            clearInterval(repeat);
            console.log('손질전 result ->>',result);
            DoTinkerTheResult();
        }
    },300);


//다듬질함수
function DoTinkerTheResult(){
    /*장르별검색비율 null -> 0처리  */
    var result1 = result['result1'];
    if(result1['일상'] === null){
        result1['일상']='0.00';
    }
    if(result1['로맨스'] === null){
        result1['로맨스']='0.00';
    }
    if(result1['액션'] === null){
        result1['액션']='0.00';
    }
    if(result1['개그'] === null){
        result1['개그']='0.00';
    }
    if(result1['판타지'] === null){
        result1['판타지']='0.00';
    }
    if(result1['시대극'] === null){
        result1['시대극']='0.00';
    }
    if(result1['학원'] === null){
        result1['학원']='0.00';
    }
    if(result1['멜로'] === null){
        result1['멜로']='0.00';
    }
    if(result1['스포츠'] === null){
        result1['스포츠']='0.00';
    }

    /*장르별검색유저평균나이 null-> 0처리 */
    var result2 = result['result2'];
    if(result2['일상'] === null){
        result2['일상']='0.00';
    }
    if(result2['로맨스'] === null){
        result2['로맨스']='0.00';
    }
    if(result2['액션'] === null){
        result2['action']='0.00';
    }
    if(result2['개그'] === null){
        result2['개그']='0.00';
    }
    if(result2['판타지'] === null){
        result2['판타지']='0.00';
    }
    if(result2['시대극'] === null){
        result2['시대극']='0.00';
    }
    if(result2['학원'] === null){
        result2['학원']='0.00';
    }
    if(result2['멜로'] === null){
        result2['멜로']='0.00';
    }
    if(result2['스포츠'] === null){
        result2['스포츠']='0.00';
    }

    console.log('\n\n손질된 result ->>',result);
    console.log('typeof -->>',typeof(result));
    res.send(result);
};//DoTinkerTheResult()끝


});//router끝




/*
   프로세스명: 특정장르에대한 분석작업
             1.피검색율
             2.검색유저 평균나이
             3.검색유저 남성여성비율,타입비율
             4.검색유저 연령대 비율(추가)
   key값 : search_gen_number 을받는다.
   화면단에서 유의사항:
    전체 장르들의 중에 피검색율이 0 인녀석들은 이곳으로 못오게해야함.
    이유: 피검색율0인 장르넘버를 넘기면 해당레코드가 존재하지않아 레코드가0인 경우에 따로 넘길 JSON을 만들어야함.
          그런데, JSON을 만드는과정에서 gen_name을 넘기고싶은데 서버작업자가 DB실력이 부족하여 gen_name을 찍어낼 능력이없음
*/
router.post('/view',function(req,res,next){
    var gen_number = req.body('gen_name');
    console.log('분석들어옴');
    var count = 0;
    var result ={};
    
    // ▼특정장르 검색비율 (작성: 2018-11-09)
    db.query(`
            SELECT 
                search_gen_number '장르번호',
                gen_name as '장르명',
                truncate((count(*)/(select count(*) from tb_analyst where search_gen_number is not null)*100),2) as '피검색율'
            FROM tb_analyst a
            JOIN tb_genre g ON a.search_gen_number = g.gen_number
            GROUP BY search_gen_number
            HAVING gen_name=${gen_name};`,
            function(err1,perSel_BY_GENRE,fields1){ 
                var result1={};
                    result1=perSel_BY_GENRE[0];
                    result['result1']=result1;
                    count+=1;
                return;
            }
    );
    // ▼특정장르 검색유저 평균나이 (작성: 2018-11-09)
    db.query(`
            SELECT 
                search_gen_number as '장르번호',
                gen_name as '장르명',
                truncate(avg(user_age),2) as '평균나이'
            FROM(
                  SELECT 
                    date(a.created) as created,
                    search_gen_number,
                    gen_name,
                    login_user_number,
                    user_age
                FROM
                    tb_analyst a
                    JOIN tb_user u on login_user_number = user_number
                    JOIN tb_genre g on search_gen_number = gen_number
                    GROUP BY created,search_gen_number,login_user_number
                    ORDER BY created,search_gen_number,login_user_number) as sub1
            GROUP BY search_gen_number
            HAVING gen_name=${gen_name};`,
            function(err2,avg_login_user_age_BY_GENRE,fields2){
                var result2={};
                    result2=avg_login_user_age_BY_GENRE[0];//있으면그대로넣는다
                   
                    result['result2']=result2;
                    count+=1;
                return;
            }
        );

        // ▼특정장르검색유저 성비율,타입비율 (작성: 2018-11-09)
        db.query(`
                SELECT 
                    search_gen_number,
                    gen_name,
                    truncate(sum(case when user_gender = 'M' then 1 else 0 end)/count(*) *100 ,2) as MaleClickerRatio,
                    truncate(sum(case when user_gender = 'F' then 1 else 0 end)/count(*) *100 ,2) as FemaleClickerRatio,
                    truncate(sum(case when user_type = 'D' then 1 else 0 end)/count(*) *100 ,2) as DrawingClickerRatio,
                    truncate(sum(case when user_type = 'S' then 1 else 0 end)/count(*) *100 ,2) as StoryClickerRatio
                FROM (
                        select 
                            date(a.created)as created,
                            search_gen_number,
                            gen_name,
                            login_user_number,
                            user_age,
                            user_gender,
                            user_type
                        from tb_analyst a
                        join tb_user u on login_user_number = user_number
                        join tb_genre g on search_gen_number = gen_number
                        GROUP BY created,search_gen_number,login_user_number
                        ORDER BY created,search_gen_number,login_user_number) as t
                GROUP BY search_gen_number
                HAVING gen_name=${gen_name}`,
        function(err3,gender_type_ratio_BY_GENRE,fields3){
            var result3={};               
                result3=gender_type_ratio_BY_GENRE[0];
                result['result3']=result3;
                count+=1;
            return;
        }
    );

    // ▼특정장르검색유저의 지역분포비율 (작성: 2018-11-09)
    db.query(`
    SELECT 
    search_gen_number,
    gen_name,
     truncate(sum(case when location_name = '서울' then 1 else 0 end)/count(*) *100 ,2) as '서울',
    truncate(sum(case when location_name = '경기' then 1 else 0 end)/count(*) *100 ,2) as '경기',
    truncate(sum(case when location_name = '인천' then 1 else 0 end)/count(*) *100 ,2) as '인천',
    truncate(sum(case when location_name = '강원' then 1 else 0 end)/count(*) *100 ,2) as '강원',
    truncate(sum(case when location_name = '충남' then 1 else 0 end)/count(*) *100 ,2) as '충남',
    truncate(sum(case when location_name = '대전' then 1 else 0 end)/count(*) *100 ,2) as '대전',
    truncate(sum(case when location_name = '충북' then 1 else 0 end)/count(*) *100 ,2) as '충북',
    truncate(sum(case when location_name = '세종' then 1 else 0 end)/count(*) *100 ,2) as '세종',
    truncate(sum(case when location_name = '부산' then 1 else 0 end)/count(*) *100 ,2) as '부산',
    truncate(sum(case when location_name = '울산' then 1 else 0 end)/count(*) *100 ,2) as '울산',
    truncate(sum(case when location_name = '대구' then 1 else 0 end)/count(*) *100 ,2) as '대구',
    truncate(sum(case when location_name = '경북' then 1 else 0 end)/count(*) *100 ,2) as '경북',
    truncate(sum(case when location_name = '경남' then 1 else 0 end)/count(*) *100 ,2) as '경남',
    truncate(sum(case when location_name = '전남' then 1 else 0 end)/count(*) *100 ,2) as '전남',
    truncate(sum(case when location_name = '광주' then 1 else 0 end)/count(*) *100 ,2) as '광주',
    truncate(sum(case when location_name = '전북' then 1 else 0 end)/count(*) *100 ,2) as '전북',
    truncate(sum(case when location_name = '제주' then 1 else 0 end)/count(*) *100 ,2) as '제주'
 FROM (
         SELECT 
             date(a.created)as created,
             search_gen_number,
             gen_name,
             login_user_number,
             user_age,
             user_gender,
             user_type,
             location_name
         FROM tb_analyst a
         JOIN tb_user u on login_user_number = user_number
         JOIN tb_genre g on search_gen_number = gen_number
         JOIN tb_location l on u.location_number = l.location_number
         GROUP BY created,search_gen_number,login_user_number
         ORDER BY created,search_gen_number,login_user_number) as t
 GROUP BY search_gen_number
 HAVING gen_name=${gen_name};`,
   function(err4,locaionRatio_BY_GENRE,fields4){
        var result4={};    
            result4=locaionRatio_BY_GENRE[0];    
            result['result4']=result4;
        count+=1;
        return;
           
   });
   // ▼특정장르에대한 검색유저 연령대 비율
   db.query(`
            SELECT 
                search_gen_number,
                gen_name,
                truncate(sum(case when user_age between 10 and 19 then 1 else 0 end)/count(*) *100 ,2) as '10대',
                truncate(sum(case when user_age between 20 and 29 then 1 else 0 end)/count(*) *100 ,2) as '20대',
                truncate(sum(case when user_age between 30 and 39 then 1 else 0 end)/count(*) *100 ,2) as '30대',
                truncate(sum(case when user_age between 40 and 49 then 1 else 0 end)/count(*) *100 ,2) as '40대',
                truncate(sum(case when user_age between 50 and 59 then 1 else 0 end)/count(*) *100 ,2) as '50대',
                truncate(sum(case when user_age between 60 and 69 then 1 else 0 end)/count(*) *100 ,2) as '60대',
                truncate(sum(case when user_age between 70 and 79 then 1 else 0 end)/count(*) *100 ,2) as '70대',
                count(*) as '집계에 사용된 표본수(날짜가다르면 중복허용)'
            FROM(
                SELECT 
                    date(a.created)as created,
                    search_gen_number,
                    gen_name,
                    login_user_number,
                    user_age
                FROM tb_analyst a
                JOIN tb_user u on login_user_number = user_number
                JOIN tb_genre g on search_gen_number = gen_number
                GROUP BY created,search_gen_number,login_user_number
                ORDER BY created,search_gen_number,login_user_number) as sub1
            GROUP BY search_gen_number
            HAVING gen_name = ${gen_name};
   `,
   function(err5,ages_ratio_BY_GENRE,fields5){
        var result5={};
            result5 = ages_ratio_BY_GENRE[0];
            result['result5']=result5;
        count+=1;
        return;
   });

   var repeat = setInterval(function(){
    console.log('count->',count);
    if(count == 5){
        clearInterval(repeat);
        res.send(result);
    }
},300);


});//라우터끝

module.exports = router;