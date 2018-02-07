DROP VIEW IF EXISTS "_metadata_for_science";

CREATE VIEW IF NOT EXISTS "_metadata_for_science" (
    pk VARCHAR PRIMARY KEY,

    "base"."expired_at" VARCHAR,
    "base"."id" VARCHAR,
    "base"."identity_provider" VARCHAR,
    "base"."information_system" VARCHAR,
    "base"."person_id" VARCHAR,
    "base"."phrase" VARCHAR,
    "base"."scope" VARCHAR,
    "base"."sia_id" VARCHAR,

    "meta"."device" VARCHAR,
    "meta"."http.headers" VARCHAR,
    "meta"."ip_address" VARCHAR,
    "meta"."light" VARCHAR,
    "meta"."noise" VARCHAR,
    "meta"."operator" VARCHAR,
    "meta"."other" VARCHAR,
    "meta"."other_uniform" VARCHAR,
    "meta"."phrase" VARCHAR,
    "meta"."place" VARCHAR,
    "meta"."temperature" VARCHAR,
    "meta"."verification_ms" VARCHAR,
    "meta"."wet" VARCHAR,

    "result"."grcc-local_photo_1.1.2" VARCHAR,
    "result"."grcc-local_sound_1.1.2" VARCHAR,
    "result"."verify:photo" VARCHAR,
    "result"."verify:sound" VARCHAR
);