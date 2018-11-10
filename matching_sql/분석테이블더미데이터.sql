/*로그인안함+장르검색*/
insert into tb_analyst (search_gen_number,created) values(8,default);






/*로그인+장르검색*/
insert into tb_analyst (login_user_number,search_gen_number,created) values('aaaaaaaa00000002',1,default);

/*DUMMY START: 로그인+포폴구경*/

-- 단계1
select po_number,po_title,gen_number,user_number 
from tb_portfolio
where user_number != 'aaaaaaaa00000002';

-- 단계2
insert into tb_analyst (login_user_number,search_gen_number,visited_po_number) 
VALUES ('aaaaaaaa00000002',9,'PIDXqer0l2ucfgnx');



/*DUMMY END  */


/*
DUMMY넣기위해 알아야할 정보들정리

select user_number,user_name from tb_user;
몇몇 user_number와 포폴데이터들 정보

UIDXozeldytdcspq/이혜진
UIDXghhcpuuguftq/곽동호
aaaaaaaa00000002/최어진 : PIDX5k0hhzwkp8xz(6),PIDX85s1haff2208(9),PIDXoaglk51xr7ab(1),PIDXoopea5en7oc4(9),PIDXvx3nnvy6m93c(1),PIDXygot643mmwwy(1)
aaaaaaaa00000001/이누리 : PIDX8xih51y98c7p(6),PIDXr764n5qsfceq(6),PIDXu40gipra42zy(9),PIDXwa83l4wmy0g5(9)
aaaaaaaa00000004/tester4 : PIDX2u8p9p3k9wlu(2),PIDX63qgohpczyxf(2),PIDX6nr9fl0asfcl(3),PIDXqer0l2ucfgnx(9)
*/
select po_number,po_title,gen_number,user_number 
from tb_portfolio
where user_number='aaaaaaaa00000004';


