select 
    a.apply_number,
    u.user_nickname,
    p.po_title,
    p.po_type,
    a.apply_status,
    a.apply_date,
    a.apply_message,
    APS.avgPerSelected as user_selected_per
    from  tb_apply as a
    join tb_user as u on a.apply_user_number = u.user_number
    join tb_portfolio as p on a.po_number = p.po_number
    join (select user_number,AVG(Round(po_apply_count/po_view_count*100,1)) as avgPerSelected
 from tb_portfolio group by user_number) as APS on u.user_number = APS.user_number
    where a.reply_user_number = 'aaaaaaaa00000001' and apply_status = 'sending';
    
    select user_number from tb_user where user_id = 'nuree';
    
select 
      u.user_nickname,
      p.po_title,
      a.reply_status,
      a.apply_status,
      a.apply_date
      from  tb_apply as a
      join tb_user as u on a.reply_user_number = u.user_number
      join tb_portfolio as p on a.po_number = p.po_number
      where a.apply_user_number = 'aaaaaaaa00000001'
		order by  reply_status asc,apply_date desc;
		
select * from tb_apply;
