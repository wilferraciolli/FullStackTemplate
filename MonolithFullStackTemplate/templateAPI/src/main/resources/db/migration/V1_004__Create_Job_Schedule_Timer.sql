DROP TABLE IF EXISTS tp_scheduled_job;
CREATE TABLE tp_scheduled_job
(
    id                      VARCHAR(36)     NOT NULL,
    root_name               VARCHAR(80)     NOT NULL,
    job_data                VARCHAR(10000)  NOT NULL,
    scheduled_date_time     TIMESTAMP      NOT NULL,
    PRIMARY KEY (id)
);
