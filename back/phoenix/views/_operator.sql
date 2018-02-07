DROP VIEW IF EXISTS "_operator";

CREATE VIEW IF NOT EXISTS "_operator" (
    pk VARCHAR PRIMARY KEY,

    "base"."first_name" VARCHAR,
    "base"."second_name" VARCHAR,
    "base"."third_name" VARCHAR,
    "base"."password" VARCHAR,
    "base"."region" VARCHAR
);