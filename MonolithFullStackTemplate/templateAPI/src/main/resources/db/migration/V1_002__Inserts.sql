INSERT INTO tp_user(id, username, password, active)
VALUES (1000, 'WilFerraciolli@wiltech.com', '$2a$10$PvEVNAmoArwU0a7AFVLF7exbfBoSWqGceMBLT.qB5jQvblCWResEq', 1);
INSERT INTO tp_user_role(user_id, role)
VALUES (1000, 'ROLE_ADMIN');
INSERT INTO tp_user_role(user_id, role)
VALUES (1000, 'ROLE_HR_ADMIN');
INSERT INTO tp_user_role(user_id, role)
VALUES (1000, 'ROLE_USER');

INSERT INTO tp_user(id, username, password, active)
VALUES (1001, 'George@wiltech.com', '$2a$10$PvEVNAmoArwU0a7AFVLF7exbfBoSWqGceMBLT.qB5jQvblCWResEq', 1);
INSERT INTO tp_user_role(user_id, role)
VALUES (1001, 'ROLE_USER');
INSERT INTO tp_user_role(user_id, role)
VALUES (1001, 'ROLE_ADMIN');

INSERT INTO tp_user(id, username, password, active)
VALUES (1002, 'Maria@wiltech.com', '$2a$10$PvEVNAmoArwU0a7AFVLF7exbfBoSWqGceMBLT.qB5jQvblCWResEq', 1);
INSERT INTO tp_user_role(user_id, role)
VALUES (1002, 'ROLE_USER');

INSERT INTO tp_user(id, username, password, active)
VALUES (1003, 'Test@wiltech.com', '$2a$10$PvEVNAmoArwU0a7AFVLF7exbfBoSWqGceMBLT.qB5jQvblCWResEq', 1);
INSERT INTO tp_user_role(user_id, role)
VALUES (1003, 'ROLE_USER');

INSERT INTO tp_user(id, username, password, active)
VALUES (1004, 'athina@wiltech.com', '$2a$10$PvEVNAmoArwU0a7AFVLF7exbfBoSWqGceMBLT.qB5jQvblCWResEq', 1);
INSERT INTO tp_user_role(user_id, role)
VALUES (1004, 'ROLE_USER');

INSERT INTO tp_person(id, user_Id, first_name, last_name, email, gender, phone_Number, date_of_birth, marital_status, number_of_dependants)
VALUES (2000, 1000, 'Wiliam', 'Ferraciolli', 'WilFerraciolli@wiltech.com', 'MALE', '+44 7540595289', '1985-02-16', 'MARRIED', 1);
INSERT INTO tp_person(id, user_Id, first_name, last_name, email, gender, phone_Number, date_of_birth, marital_status, number_of_dependants)
VALUES (2001, 1001, 'George', 'Ferraciolli', 'George@wiltech.com', 'MALE', '+44 7540595289', '2015-07-13', 'SINGLE', 0);
INSERT INTO tp_person(id, user_Id, first_name, last_name, email, gender, phone_Number, date_of_birth, marital_status, number_of_dependants)
VALUES (2002, 1002, 'Maria', 'Georgiou', 'Maria@wiltech.com', 'FEMALE', '+44 7540595289', '2015-07-13', 'SINGLE', 1);
INSERT INTO tp_person(id, user_Id, first_name, last_name, email, gender, phone_Number, date_of_birth, marital_status, number_of_dependants)
VALUES (2003, 1003, 'Test', 'User', 'Test@wiltech.com', null, null, null, null, 0);
INSERT INTO tp_person(id, user_Id, first_name, last_name, email, gender, phone_Number, date_of_birth, marital_status, number_of_dependants)
VALUES (2004, 1004, 'Athina', 'Theodorou', 'athina@wiltech.com', 'FEMALE', '+44 7540595289', '2007-04-11', 'DIVORCED', 1);
