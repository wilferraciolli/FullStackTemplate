DROP TABLE IF EXISTS tp_user_role;
CREATE TABLE tp_user_role
(
    user_id BIGINT NOT NULL,
    role    VARCHAR(80)
);

DROP TABLE IF EXISTS tp_user;
CREATE TABLE tp_user
(
    id       BIGINT NOT NULL auto_increment,
    username VARCHAR(255),
    password VARCHAR(255),
    active   BIT,
    PRIMARY KEY (id)
);
CREATE UNIQUE INDEX unique_username_on_user ON tp_user (username);

DROP TABLE IF EXISTS tp_person;
CREATE TABLE tp_person
(
    id                   BIGINT       NOT NULL auto_increment,
    user_id              BIGINT       NOT NULL,
    image_id             VARCHAR(36)  NULL,
    first_name           VARCHAR(255) NOT NULL,
    last_name            VARCHAR(255) NOT NULL,
    email                VARCHAR(255) NOT NULL,
    gender               VARCHAR(80),
    phone_number         VARCHAR(80),
    date_of_birth        DATE,
    marital_status       VARCHAR(80),
    number_of_dependants INT,
    PRIMARY KEY (id)
);

DROP VIEW IF EXISTS tp_user_details_view;
CREATE VIEW tp_user_details_view AS
SELECT u.id,
       p.id as person_id,
       p.first_name,
       p.last_name,
       u.username,
       u.password,
       p.date_of_birth,
       u.active
FROM tp_user u,
     tp_person p
WHERE u.id = p.user_id;

DROP TABLE IF EXISTS tp_token;
CREATE TABLE tp_token
(
    id                   BIGINT       NOT NULL auto_increment,
    user_id              BIGINT       NOT NULL,
    token                VARCHAR(20000)  NOT NULL,
    token_type           VARCHAR(25)  NOT NULL,
    revoked              BIT,
    expired              BIT,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS tp_refresh_token;
CREATE TABLE tp_refresh_token
(
    id            BIGINT        NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id       BIGINT        NOT NULL,
    username      VARCHAR(255)  NOT NULL,
    refresh_Token VARCHAR(2000) NOT NULL,
    created_Date  TIMESTAMP
);
