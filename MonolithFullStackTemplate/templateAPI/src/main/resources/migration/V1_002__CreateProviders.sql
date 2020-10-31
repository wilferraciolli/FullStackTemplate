drop table IF EXISTS provider;
create TABLE provider
(
    id            BIGINT        NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(255)  NOT NULL,
    description   VARCHAR(2000) NOT NULL,
    base_Url      VARCHAR(2000),
    client_Id     VARCHAR(255),
    client_Secret VARCHAR(255),
    username      VARCHAR(80),
    password      VARCHAR(80),
    email         VARCHAR(80),
    website       VARCHAR(255),
    enabled       BIT
);
