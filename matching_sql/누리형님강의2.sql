


SELECT 
   * 
FROM 
   tb_user 
WHERE 
user_number=(
            SELECT 
               IF(
                  a.flag='true',
                  (select reply_user_number from tb_apply WHERE apply_number='AIDX05vq20glqe93'),
                  (select apply_user_number from tb_apply WHERE apply_number='AIDX05vq20glqe93')
                  )
            FROM
               (
               SELECT 
                  IF(
                     apply_user_number='aaaaaaaa00000002',
                     'true',
                     'false'
                     ) as flag 
               FROM 
                  tb_apply 
               WHERE apply_number='AIDX05vq20glqe93'
               ) a
            );