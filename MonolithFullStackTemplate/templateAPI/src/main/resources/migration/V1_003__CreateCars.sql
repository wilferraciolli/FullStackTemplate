drop table IF EXISTS car;
create TABLE car
(
    id                     BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    person_id              BIGINT NOT NULL,
    maker_id               BIGINT NOT NULL,
    model_id               BIGINT NOT NULL,
    fuel_type              VARCHAR(80),
    transmission_type      VARCHAR(80),
    purchase_date          DATE,
    car_owner              BIT,
    owner_type             VARCHAR(80),
    registered_keeper_type VARCHAR(80)
);
