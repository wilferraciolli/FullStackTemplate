drop table IF EXISTS tp_user_setting;
create TABLE tp_user_setting
(
    id                VARCHAR(36) NOT NULL,
    user_id           BIGINT      NOT NULL,
    setting_user_type VARCHAR(30) NOT NULL,
    setting_code      VARCHAR(30) NOT NULL,
    setting_value     VARCHAR(80) NOT NULL,
    PRIMARY KEY (id)
);

-- system settings
INSERT INTO tp_user_setting(id, user_id, setting_user_type, setting_code, setting_value)
VALUES ('17ef270d-7789-43a5-875e-32efc444e48f', 0, 'SYSTEM', 'LANGUAGE', 'en-uk');
INSERT INTO tp_user_setting(id, user_id, setting_user_type, setting_code, setting_value)
VALUES ('4dea281c-53fe-4d0c-90b9-1004ace3ecf5', 0, 'SYSTEM', 'LOCALE', 'Europe/London');

INSERT INTO tp_user_setting(id, user_id, setting_user_type, setting_code, setting_value)
VALUES ('911e26ee-4d34-40d6-b94e-c45555f52b88', 1001, 'USER', 'LANGUAGE', 'pt-br');
INSERT INTO tp_user_setting(id, user_id, setting_user_type, setting_code, setting_value)
VALUES ('d43c5b71-91e9-4ea8-91a9-444d9f759b00', 1001, 'USER', 'LOCALE', 'Europe/Istanbul');

INSERT INTO tp_user_setting(id, user_id, setting_user_type, setting_code, setting_value)
VALUES ('1a02a3af-1c39-4ff0-b071-12123a94395f', 1002, 'USER', 'LANGUAGE', 'el');


INSERT INTO tp_user_role(user_id, role)
VALUES (1000, 'ROLE_ADMIN');