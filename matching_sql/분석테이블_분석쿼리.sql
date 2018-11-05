select search_gen_number,login_user_number from tb_analyst where login_user_number is not null and search_gen_number is not null order by search_gen_number asc;

-- 장르:일상을 조회한 유저정보들
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
ORDER BY search_gen_number asc;
