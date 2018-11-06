/*

1번 분석기능: 선택된 장르분석(장르선택율) + 특정장르를 선택한 유저들의 정보분석(나이,성별,지역,타입)
*/
-- 장르별 선택율(완성)
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
	(select gen_name,
				truncate((count(*)/(select count(*) from tb_analyst where search_gen_number is not null)*100),2) as value
	from tb_analyst a
	join tb_genre g on a.search_gen_number = g.gen_number
	group by search_gen_number) as tt;


-- 장르별 유저평균나이(완성)
SELECT 
   GROUP_CONCAT(if(tt.search_gen_number = 1, value, NULL)) AS '일상', 
   GROUP_CONCAT(if(tt.search_gen_number = 2, value, NULL)) AS '로맨스', 
   GROUP_CONCAT(if(tt.search_gen_number = 3, value, NULL)) AS '액션',
	GROUP_CONCAT(if(tt.search_gen_number = 4, value, NULL)) AS '개그',
	GROUP_CONCAT(if(tt.search_gen_number = 5, value, NULL)) AS '판타지',
	GROUP_CONCAT(if(tt.search_gen_number = 6, value, NULL)) AS '시대극',
	GROUP_CONCAT(if(tt.search_gen_number = 7, value, NULL)) AS '학원',
	GROUP_CONCAT(if(tt.search_gen_number = 8, value, NULL)) AS '멜로', 
	GROUP_CONCAT(if(tt.search_gen_number = 9, value, NULL)) AS '스포츠'
FROM
	(select t.search_gen_number,truncate(avg(t.user_age),2)as value 
		from
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
	
-- 장르별 유저성비,타입비율(완성)
SELECT 
   search_gen_number as 장르번호,
   gen_name as 장르명,
	truncate(sum(case when `user_gender` = 'M' then 1 else 0 end)/count(*) *100 ,2) as 남성클릭자,
   truncate(sum(case when `user_gender` = 'F' then 1 else 0 end)/count(*) *100 ,2) as 여성클릭자,
   truncate(sum(case when `user_type` = 'D' then 1 else 0 end)/count(*) *100 ,2) as 그림작가클릭자,
	truncate(sum(case when `user_type` = 'S' then 1 else 0 end)/count(*) *100 ,2) as 글작가클릭자
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
ORDER BY search_gen_number asc;


-- 장르별 지역비율(완성)
SELECT 
   search_gen_number as 장르번호,
   gen_name as 장르명,
	truncate(sum(case when `location_name` = '서울' then 1 else 0 end)/count(*) *100 ,2) as 서울,
   truncate(sum(case when `location_name` = '경기' then 1 else 0 end)/count(*) *100 ,2) as 경기,
   truncate(sum(case when `location_name` = '인천' then 1 else 0 end)/count(*) *100 ,2) as 인천,
   truncate(sum(case when `location_name` = '강원' then 1 else 0 end)/count(*) *100 ,2) as 강원,
   truncate(sum(case when `location_name` = '충남' then 1 else 0 end)/count(*) *100 ,2) as 충남,
   truncate(sum(case when `location_name` = '대전' then 1 else 0 end)/count(*) *100 ,2) as 대전,
   truncate(sum(case when `location_name` = '충북' then 1 else 0 end)/count(*) *100 ,2) as 충북,
   truncate(sum(case when `location_name` = '세종' then 1 else 0 end)/count(*) *100 ,2) as 세종,
   truncate(sum(case when `location_name` = '부산' then 1 else 0 end)/count(*) *100 ,2) as 부산,
   truncate(sum(case when `location_name` = '울산' then 1 else 0 end)/count(*) *100 ,2) as 울산,
   truncate(sum(case when `location_name` = '대구' then 1 else 0 end)/count(*) *100 ,2) as 대구,
   truncate(sum(case when `location_name` = '경북' then 1 else 0 end)/count(*) *100 ,2) as 경북,
   truncate(sum(case when `location_name` = '경남' then 1 else 0 end)/count(*) *100 ,2) as 경남,
   truncate(sum(case when `location_name` = '전남' then 1 else 0 end)/count(*) *100 ,2) as 전남,
   truncate(sum(case when `location_name` = '광주' then 1 else 0 end)/count(*) *100 ,2) as 광주,
   truncate(sum(case when `location_name` = '전북' then 1 else 0 end)/count(*) *100 ,2) as 전북,
   truncate(sum(case when `location_name` = '제주' then 1 else 0 end)/count(*) *100 ,2) as 제주
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
ORDER BY search_gen_number asc;
		
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
		
/* 재료 테이블 


-- 장르별  유저넘버중복안되게(★)
SELECT
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
			ORDER BY search_gen_number asc
*/



/*

-- 장르별 유저평균나이(재료테이블)
select t.search_gen_number,truncate(avg(t.user_age),2)as value from
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
group by t.search_gen_number;





*/




































/*
select search_gen_number,login_user_number from tb_analyst where login_user_number is not null and search_gen_number is not null order by search_gen_number asc;

-- 장르:장르  조회한 유저정보들(특정)
SELECT
search_gen_number,
login_user_number,
u.user_age,
u.user_gender,
u.user_type,
l.location_name
FROM tb_analyst a
JOIN tb_user u on a.login_user_number = u.user_number
JOIN tb_location l on u.location_number = l.location_number
WHERE login_user_number is not null and search_gen_number =1
group by login_user_number
ORDER BY search_gen_number asc;

-- 장르:장르를 조회한 유저들의 평균나이(특정)
select avg(t.user_age) from 
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
WHERE login_user_number is not null and search_gen_number =1
group by login_user_number
ORDER BY search_gen_number asc)as t;

*/
