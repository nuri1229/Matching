create table tb_analyst(
	analyst_number int primary key auto_increment, -- pk
	login_user_number varchar(16),-- 로그인유저정보
	search_gen_number int,-- 검색옵션:장르
	search_user_gender char, -- 검색옵션:성별
	search_po_type char, -- 검색옵션: 'D','S'
	search_user_age int, -- 검색옵션: 나이
	search_location_number int, -- 검색옵션: 지역
	visited_po_number varchar(16), -- 상세포폴PK
	created datetime not null default now() -- 데이터 생성일자
);

select * from tb_analyst;
select * from tb_user; -- aaaaaaaa00000001
select * from tb_portfolio; -- PIDX5k0hhzwkp8xz

select * from tb_analyst;

-- 더미데이터

-- 로그인안했을때 장르만
insert into tb_analyst (search_gen_number,created) values(8,default);

-- 로그인했을때 장르만
select * from tb_user;
insert into tb_analyst (login_user_number,search_gen_number,created) values('aaaaaaaa00000002',1,default);

select * from tb_analyst;

-- 장르별선택율(여러로우에뿌리기)
select gen_name,
			count(*)/(select count(*) from tb_analyst where search_gen_number is not null)*100 as value
from tb_analyst a
join tb_genre g on a.search_gen_number = g.gen_number
group by search_gen_number;

alter table tb_analyst add analyst varchar(30) default 'analyst'; 
select * from tb_analyst;

-- 장르별 선택율(1줄에모두뽑기)
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
	(select 'aa' ,gen_name,
				truncate((count(*)/(select count(*) from tb_analyst where search_gen_number is not null)*100),2) as value
	from tb_analyst a
	join tb_genre g on a.search_gen_number = g.gen_number
	group by search_gen_number) as tt
GROUP BY  aa; -- analyst 대신에 aa라는 임의의칼럼 넣은경우성공

  

-- 가로로눕히기(실패)
/*SELECT 
      CASE WHEN tt.gen_name = '일상' THEN tt.value END AS '일상', 
      CASE WHEN tt.gen_name = '로맨스' THEN tt.value END AS '로맨스',
      CASE WHEN tt.gen_name = '액션' THEN tt.value END AS '액션',
      CASE WHEN tt.gen_name = '개그' THEN tt.value END AS '개그',
      CASE WHEN tt.gen_name = '학원' THEN tt.value END AS '학원',
      CASE WHEN tt.gen_name = '멜로' THEN tt.value END AS '멜로'
FROM (select analyst,gen_name,
			count(*) as value
	from tb_analyst a
	join tb_genre g on a.search_gen_number = g.gen_number
	group by search_gen_number) as tt
group by  analyst;*/
select gen_name from tb_genre;





















