/*
	/api/Analyst/  
	1.전체기간동안의 장르들 피검색율 (1row)
	2.전체기간동안의 검색유저들의 평균나이 (1row)
	3.오늘의 포폴랭킹 TOP5 (many rows)

   키값필요없음
*/

-- 1.장르별 피검색율 : return은 1 row
SELECT 
        GROUP_CONCAT(if(tt.gen_name = '일상', value, NULL)) AS '일상', 
        GROUP_CONCAT(if(tt.gen_name = '로맨스', value, NULL)) AS '로맨스', 
        GROUP_CONCAT(if(tt.gen_name = '액션', value, NULL)) AS '액션',
        GROUP_CONCAT(if(tt.gen_name = '개그', value, NULL)) AS '개그',
        GROUP_CONCAT(if(tt.gen_name = '판타지', value, NULL)) AS '판타지',
        GROUP_CONCAT(if(tt.gen_name = '시대극', value, NULL)) AS '시대극',
        GROUP_CONCAT(if(tt.gen_name = '학원', value, NULL)) AS '학원물',
        GROUP_CONCAT(if(tt.gen_name = '멜로', value, NULL)) AS '멜로', 
        GROUP_CONCAT(if(tt.gen_name = '스포츠', value, NULL)) AS '스포츠'
    FROM
        (SELECT gen_name,
                    truncate((count(*)/(select count(*) from tb_analyst where search_gen_number is not null)*100),2) as value
        FROM tb_analyst a
        join tb_genre g on a.search_gen_number = g.gen_number
        group by search_gen_number) as tt;


-- 장르별 평균나이: return은 1 row (작성: 2018-11-09)


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
FROM(select 
		search_gen_number,gen_name,truncate(avg(user_age),2) as 'age_avg'
	  from(select 
				date(a.created) as created,
				search_gen_number,
				gen_name,
				login_user_number,
				user_age
			 from
				tb_analyst a
				join tb_user u on login_user_number = user_number
				join tb_genre g on search_gen_number = gen_number
				group by created,search_gen_number,login_user_number
				order by created,search_gen_number,login_user_number) as sub1
		GROUP BY search_gen_number) sub2;

     
     

/*오늘 방문포폴 순위 TOP5(완성)

return 여러줄 row

*/
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
	1.특정장르에대한 피검색율
	2.
	3.
	4.
*/


-- 특정장르별 피검색율 : return은 1row 
select 
	search_gen_number '장르번호',
	gen_name as '장르명',
	truncate((count(*)/(select count(*) from tb_analyst where search_gen_number is not null)*100),2) as '피검색율'
from tb_analyst a
join tb_genre g on a.search_gen_number = g.gen_number
group by search_gen_number
having gen_name='일상';


-- 특정장르별 평균나이: return은 1 row (작성: 2018-11-09)

SELECT 
		search_gen_number as '장르번호',
		gen_name as '장르명',
		truncate(avg(user_age),2) as '평균나이'
FROM(SELECT 
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
HAVING gen_name='일상';


-- 성비,타입비율(완성)(작성: 2018-11-09)        
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
HAVING gen_name='일상';



-- 장르별 지역비율(완성 )(작성: 2018-11-09)
SELECT 
   search_gen_number,
   gen_name,
	truncate(sum(case when `location_name` = '서울' then 1 else 0 end)/count(*) *100 ,2) as '서울',
   truncate(sum(case when `location_name` = '경기' then 1 else 0 end)/count(*) *100 ,2) as '경기',
   truncate(sum(case when `location_name` = '인천' then 1 else 0 end)/count(*) *100 ,2) as '인천',
   truncate(sum(case when `location_name` = '강원' then 1 else 0 end)/count(*) *100 ,2) as '강원',
   truncate(sum(case when `location_name` = '충남' then 1 else 0 end)/count(*) *100 ,2) as '충남',
   truncate(sum(case when `location_name` = '대전' then 1 else 0 end)/count(*) *100 ,2) as '대전',
   truncate(sum(case when `location_name` = '충북' then 1 else 0 end)/count(*) *100 ,2) as '충북',
   truncate(sum(case when `location_name` = '세종' then 1 else 0 end)/count(*) *100 ,2) as '세종',
   truncate(sum(case when `location_name` = '부산' then 1 else 0 end)/count(*) *100 ,2) as '부산',
   truncate(sum(case when `location_name` = '울산' then 1 else 0 end)/count(*) *100 ,2) as '울산',
   truncate(sum(case when `location_name` = '대구' then 1 else 0 end)/count(*) *100 ,2) as '대구',
   truncate(sum(case when `location_name` = '경북' then 1 else 0 end)/count(*) *100 ,2) as '경북',
   truncate(sum(case when `location_name` = '경남' then 1 else 0 end)/count(*) *100 ,2) as '경남',
   truncate(sum(case when `location_name` = '전남' then 1 else 0 end)/count(*) *100 ,2) as '전남',
   truncate(sum(case when `location_name` = '광주' then 1 else 0 end)/count(*) *100 ,2) as '광주',
   truncate(sum(case when `location_name` = '전북' then 1 else 0 end)/count(*) *100 ,2) as '전북',
   truncate(sum(case when `location_name` = '제주' then 1 else 0 end)/count(*) *100 ,2) as '제주'
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
HAVING gen_name='일상';







-- 특정장르별 전체기간 연령대분포(완성) (작성: 2018-11-09)
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
HAVING gen_name ='일상';

/*
■ ■ ■ ■ ■ ■  추가 분석구문  ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ 
*/
-- 로그인유저가 , 오늘조회한 포트폴리오 내역남기는 쿼리 (기본정렬 :최신순으로)
-- 추가기능넣어야하는거 : 1.많이본 포트폴리오 분석, 2. 검색조회비율 높은순 TOP3, 가장많이 찾아본 상대방  3.해당포폴과 현재작업중인지 
-- parameter는 login_user_number

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
WHERE login_user_number = 'aaaaaaaa00000002' 
GROUP BY visited_po_number 
HAVING date(a.created) = date(now())
ORDER BY a.created desc;


/*******************************************************************************************

▼▼▼▼ 사용했지만, 몇가지헛점이 보여서 사용그만한 쿼리문들 모음 ▼▼▼▼▼

********************************************************************************************/








/* 


시간단위별로변화를 감지할수없음

■평균나이
전체기간중 장르/유저정보 중복조회안되게 엄청깐깐함 유통성없음 1일단위로 시장변화를 감지할수없음
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
     
     
     
     
     
     
     
     
     
■ 남녀성비,타입비      
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
     
     
     
     
■ 취지에도맞고 좋은데, 컬럼명 영어로쓸일 있을수도있어서 다시치기 귀찮아서 여기 둠    
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
HAVING search_gen_number=1;
     
     
*/    













 