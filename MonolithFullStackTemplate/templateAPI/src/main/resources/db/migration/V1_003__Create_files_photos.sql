drop table IF EXISTS tp_file;
create TABLE tp_file
(
    id          VARCHAR(36) NOT NULL,
    name        VARCHAR(512) NOT NULL,
    type        VARCHAR(252) NOT NULL,
    data        BLOB,
    PRIMARY KEY (id)
);

drop table IF EXISTS tp_person_photo;
create TABLE tp_person_photo
(
    id                  BIGINT       NOT NULL auto_increment,
    user_id             BIGINT       NOT NULL,
    file_id             VARCHAR(36) NOT NULL,
    PRIMARY KEY (id)
);
