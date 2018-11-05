select user_number,AVG(Round(po_apply_count/po_view_count*100,1)) as hh
 from tb_portfolio group by user_number;
 
 
 select user_number,po_title,po_apply_count,po_view_count,Round(po_apply_count/po_view_count*100,1) from tb_portfolio order by user_number asc;

 
select 
    a.apply_number,
    u.user_nickname,
    p.po_title,
    p.po_type,
    a.apply_status,
    a.apply_date,
    a.apply_message,
    APS.avgPerSelected
    from  tb_apply as a
    join tb_user as u on a.apply_user_number = u.user_number
    join tb_portfolio as p on a.po_number = p.po_number
    join (select user_number,AVG(Round(po_apply_count/po_view_count*100,1)) as avgPerSelected
 from tb_portfolio group by user_number) as APS on u.user_number = APS.user_number
    where a.reply_user_number = 'aaaaaaaa00000001';
    
    
    
select 
    a.apply_number,
    u.user_nickname,
    p.po_title,
    p.po_type,
    a.apply_status,
    a.apply_date,
    a.apply_message,
    (select 
       SUM((po_apply_count/po_view_count)*100)/COUNT(*) as "포폴선택률의 평균" 
      from 
         tb_portfolio 
      WHERE 
         user_number=a.apply_user_number
   )
from  
   tb_apply as a
join 
   tb_user as u on a.apply_user_number = u.user_number
join 
   tb_portfolio as p on a.po_number = p.po_number
where 
   a.reply_user_number = 'aaaaaaaa00000001';

    
    