CREATE TABLE drillmodule_activity(
  user_name varchar(50),
  command varchar(100),
  timestamp timestamp default current_timestamp
)

CREATE TABLE drillmodule_user(
  user_name varchar(50),
  password varchar(16),
  base32secret varchar(16)
)