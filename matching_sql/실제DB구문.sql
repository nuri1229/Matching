select search_gen_number,gen_name,
				truncate((count(*)/(select count(*) from tb_analyst where search_gen_number is not null)*100),2) as value
from tb_analyst a
join tb_genre g on a.search_gen_number = g.gen_number
group by search_gen_number
having search_gen_number=1

-- 장르별평균나이 	
SELECT t.search_gen_number,truncate(avg(t.user_age),2)as value 
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
        HAVING search_gen_number=7;

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
HAVING search_gen_number=7
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

-- 랭킹

/*오늘 방문포폴 순위 TOP5(완성)*/
SELECT VISITED_PO_NUMBER,rank
FROM	(SELECT    VISITED_PO_NUMBER,
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
where rank<=5;