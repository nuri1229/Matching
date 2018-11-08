


/*
전체 쿼리문 파이차트만들때 
키값 필요없음
*/

-- 장르별선택율
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
        (SELECT gen_name,
                    truncate((count(*)/(select count(*) from tb_analyst where search_gen_number is not null)*100),2) as value
        FROM tb_analyst a
        join tb_genre g on a.search_gen_number = g.gen_number
        group by search_gen_number) as tt;


-- 장르별 평균나이

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
             group by search_gen_number,login_user_number
             ORDER BY search_gen_number asc)as t
     group by t.search_gen_number)as tt;

  

/*오늘 방문포폴 순위 TOP5(완성)*/
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
WHERE rank<=5;













/*
	파이차트 눌렀을대 부르는 쿼리문
	키값은 search_gen_number
	단, 장르별검색비율에서 0 인녀석들의 키값은 넘기지않는다.
*/


-- 선택율
select search_gen_number,gen_name,
				truncate((count(*)/(select count(*) from tb_analyst where search_gen_number is not null)*100),2) as value
from tb_analyst a
join tb_genre g on a.search_gen_number = g.gen_number
group by search_gen_number
having search_gen_number=1;

-- 장르별평균나이  (화면단에서 파이차트그릴때 0인애들은 안나오도록)(아니면 클릭이안되도록)
SELECT t.search_gen_number,t.gen_name,truncate(avg(t.user_age),2)as value 
FROM
   (SELECT
       search_gen_number,
       g.gen_name,
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
HAVING search_gen_number=1;

-- 성비,타입비율        
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
HAVING search_gen_number=1
ORDER BY search_gen_number asc;


-- 장르별 지역비율(완성)
SELECT 
   search_gen_number,
   gen_name,
	truncate(sum(case when `location_name` = '서울' then 1 else 0 end)/count(*) *100 ,2) as seoul,
   truncate(sum(case when `location_name` = '경기' then 1 else 0 end)/count(*) *100 ,2) as gyeonggi,
   truncate(sum(case when `location_name` = '인천' then 1 else 0 end)/count(*) *100 ,2) as incheon,
   truncate(sum(case when `location_name` = '강원' then 1 else 0 end)/count(*) *100 ,2) as gangwon,
   truncate(sum(case when `location_name` = '충남' then 1 else 0 end)/count(*) *100 ,2) as chungnam,
   truncate(sum(case when `location_name` = '대전' then 1 else 0 end)/count(*) *100 ,2) as daejeon,
   truncate(sum(case when `location_name` = '충북' then 1 else 0 end)/count(*) *100 ,2) as chungbuk,
   truncate(sum(case when `location_name` = '세종' then 1 else 0 end)/count(*) *100 ,2) as sejong,
   truncate(sum(case when `location_name` = '부산' then 1 else 0 end)/count(*) *100 ,2) as busan,
   truncate(sum(case when `location_name` = '울산' then 1 else 0 end)/count(*) *100 ,2) as ulsan,
   truncate(sum(case when `location_name` = '대구' then 1 else 0 end)/count(*) *100 ,2) as daegu,
   truncate(sum(case when `location_name` = '경북' then 1 else 0 end)/count(*) *100 ,2) as gyeongbuk,
   truncate(sum(case when `location_name` = '경남' then 1 else 0 end)/count(*) *100 ,2) as gyeongnam,
   truncate(sum(case when `location_name` = '전남' then 1 else 0 end)/count(*) *100 ,2) as jeonnam,
   truncate(sum(case when `location_name` = '광주' then 1 else 0 end)/count(*) *100 ,2) as gwangju,
   truncate(sum(case when `location_name` = '전북' then 1 else 0 end)/count(*) *100 ,2) as jeonbuk,
   truncate(sum(case when `location_name` = '제주' then 1 else 0 end)/count(*) *100 ,2) as jeju
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
HAVING search_gen_number=7
ORDER BY search_gen_number asc;


-- 특정장르별 연령대분포
SELECT 
	 search_gen_number,
    gen_name,
    truncate(sum(case when user_age between 10 and 19 then 1 else 0 end)/count(*) *100 ,2) as '10대',
    truncate(sum(case when user_age between 20 and 29 then 1 else 0 end)/count(*) *100 ,2) as '20대',
    truncate(sum(case when user_age between 30 and 39 then 1 else 0 end)/count(*) *100 ,2) as '30대',
    truncate(sum(case when user_age between 40 and 49 then 1 else 0 end)/count(*) *100 ,2) as '40대',
    truncate(sum(case when user_age between 50 and 59 then 1 else 0 end)/count(*) *100 ,2) as '50대',
    truncate(sum(case when user_age between 60 and 69 then 1 else 0 end)/count(*) *100 ,2) as '60대',
    truncate(sum(case when user_age between 70 and 79 then 1 else 0 end)/count(*) *100 ,2) as '70대'
FROM (SELECT 
			a.search_gen_number,
			g.gen_name,
			a.login_user_number,
			u.user_age
		FROM tb_analyst a
		JOIN tb_user u on a.login_user_number = u.user_number
		JOIN tb_genre g on a.search_gen_number = g.gen_number
		WHERE a.search_gen_number =1
		GROUP BY a.search_gen_number,a.login_user_number
		ORDER BY a.search_gen_number asc,u.user_age asc,a.login_user_number asc) sub1;

