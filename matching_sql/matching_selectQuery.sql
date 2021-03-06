select * from tb_user;
select * from tb_portfolio;
select * from tb_genre;

-- aaaaaaaa00000002 choi 1234
-- aaaaaaaa00000001 nuree 

-- 성별,장르,지역,타입,연령대
/*
	사용처: matching/list    
	구문: join query
	
	++추가++
	node에서 data.length로 글번호리턴
*/
select p.po_number, -- 포폴pk
		 p.po_title,  -- 포폴제목
		 p.created_by, -- 포폴작성자(작성자조건)
		 p.updated,    -- 최근업데이트일자(초기작성시＃작성일자)
		 u.user_gender,  -- 작가성별(성별조건)
		 u.user_age, -- 작가연령(연령별조건)
		 g.gen_name, -- 포폴장르(장르별조건)
		 u.user_type, -- 작가타입(타입별조건)
		 p.po_type, -- 작가타입(타입별조건)
		 l.location_name, -- 작가지역(지역별조건)
		 p.po_view_count -- 조회수
from tb_portfolio as p
	join tb_user as u	on p.user_number = u.user_number
	join tb_location as l on u.location_number = l.location_number
  	join tb_genre as g	on p.gen_number = g.gen_number
/*조건절이 있을경우*/
where 
		u.user_gender='M'  
and	u.user_age between 20 and 29
and	p.gen_number = '7'
and	p.po_type ='S'
and 	u.location_number = '1';

/*
 사용처: matching/view:po_number
*/

select 
 p.po_number, -- (신청할 포폴)
 p.po_title, -- 제목
 p.po_view_count, -- 조회수
 p.po_apply_count, -- 신청수 
 g.gen_name, -- 작성자성별
 u.user_number, -- 작가 고유번호 ( 신청하기 대상)
 u.user_id, -- 작가ID
 u.user_nickname,  -- 작가 nickname
 u.user_name, -- 작가 name
 p.updated, --  업데이트시기(초기화면 작성일시)
 p.po_file_username, --  유저가 보여주고싶은파일이름(사용자정의명)
 p.po_file_name, -- 실제저장소에 저장되어있는 파일명
 p.po_file_path, -- 파일경로
 p.po_desc
 from tb_portfolio as p
	join tb_user as u on p.user_number = u.user_number
	join tb_genre as g on p.gen_number = g.gen_number
where p.po_number = 'prtaaaaa00000002'; -- where 절에는 pk값으로넘어온 p.po_number이용 
	
	
  	
