insert into user(id, username, password, active)
values (1000, 'WilFerraciolli@wiltech.com', '{bcrypt}$2a$10$2WacIN6u7bxhQOkx9gxPAOaTZjab0GCzoCSdJF7HU5ajf5CC4hgga', 1);
insert into User_Roles(user_id, role)
values (1000, 'ROLE_ADMIN');
insert into User_Roles(user_id, role)
values (1000, 'ROLE_HR_ADMIN');
insert into User_Roles(user_id, role)
values (1000, 'ROLE_USER');

insert into User(id, username, password, active)
values (1001, 'George@wiltech.com', '{bcrypt}$2a$10$2WacIN6u7bxhQOkx9gxPAOaTZjab0GCzoCSdJF7HU5ajf5CC4hgga', 1);
insert into User_Roles(user_id, role)
values (1001, 'ROLE_USER');
insert into User_Roles(user_id, role)
values (1001, 'ROLE_ADMIN');

insert into User(id, username, password, active)
values (1002, 'Maria@wiltech.com', '{bcrypt}$2a$10$2WacIN6u7bxhQOkx9gxPAOaTZjab0GCzoCSdJF7HU5ajf5CC4hgga', 1);
insert into User_Roles(user_id, role)
values (1002, 'ROLE_USER');

insert into person(id, user_Id, first_name, last_name, email, gender, phone_Number, date_of_birth, marital_status, number_of_dependants)
values (2000, 1000, 'Wiliam', 'Ferraciolli', 'WilFerraciolli@wiltech.com', 'MALE', '+44 7540595289', '1985-02-16', 'MARRIED', 1);
insert into person(id, user_Id, first_name, last_name, email, gender, phone_Number, date_of_birth, marital_status, number_of_dependants)
values (2001, 1001, 'George', 'Ferraciolli', 'George@wiltech.com', 'MALE', '+44 7540595289', '2015-07-13', 'SINGLE', 0);
insert into person(id, user_Id, first_name, last_name, email, gender, phone_Number, date_of_birth, marital_status, number_of_dependants)
values (2002, 1002, 'Maria', 'Georgiou', 'Maria@wiltech.com', 'FEMALE', '+44 7540595289', '2015-07-13', 'SINGLE', 1);


insert into provider(id, name, description, base_Url, client_Id, client_Secret, username, password, email, website, enabled)
values (3000, 'Admiral', 'Admiral Motors', 'https://www.admiral.com/api', 'clientId', 'clientSecret', null, null, 'admiral@company.com',
        'https://www.admiral.com', true);
insert into provider(id, name, description, base_Url, client_Id, client_Secret, username, password, email, website, enabled)
values (3001, 'Motor', 'Motors LTD', 'https://www.motor.com/api', 'clientId', 'clientSecret', null, null, 'motor@company.com',
        'https://www.motor.com', true);
insert into provider(id, name, description, base_Url, client_Id, client_Secret, username, password, email, website, enabled)
values (3002, 'BCC', 'BCC Motors', 'https://www.bcc.com/api', 'clientId', 'clientSecret', null, null, 'bcc@company.com', 'https://www.bcc.com',
        false);
insert into provider(id, name, description, base_Url, client_Id, client_Secret, username, password, email, website, enabled)
values (3003, 'Uniao', 'Uniao Motors', 'https://www.uniao.com/api', null, null, 'username1', 'password123', 'uniao@company.com',
        'https://www.uniao.com', true);

insert into car(id, person_id, maker_id, model_id, fuel_type, transmission_type, purchase_date, car_owner, owner_type, registered_keeper_type)
values (4000, 2000, 5000, 50001, 'DIESEL', 'MANUAL', '2020-01-01', 1, 'COMPANY', 'COMPANY');

insert into car(id, person_id, maker_id, model_id, fuel_type, transmission_type, purchase_date, car_owner, owner_type, registered_keeper_type)
values (4001, 2000, 5000, 50002, 'DIESEL', 'MANUAL', '2020-06-01', 1, 'COMPANY', 'COMPANY');
