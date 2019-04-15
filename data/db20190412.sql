
--- Table: public.organisations

-- DROP TABLE public.organisations;

CREATE TABLE public.organisations
(
    id bigint NOT NULL,
    name character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT organisation_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.organisations
    OWNER to postgres;
    
-- Table: public.microapps

-- DROP TABLE public.microapps;

CREATE TABLE public.microapps
(
    id character varying(100) COLLATE pg_catalog."default" NOT NULL,
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    active boolean,
    organisation_id bigint,
    CONSTRAINT microapps_pkey PRIMARY KEY (id),
    CONSTRAINT microapp_organisation FOREIGN KEY (organisation_id)
        REFERENCES organisations (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.microapps
    OWNER to postgres;


    -- Table: public.link_microapps_users

-- DROP TABLE public.link_microapps_users;

CREATE TABLE public.link_microapps_users
(
    microapp_id character varying(100) COLLATE pg_catalog."default" NOT NULL,
    user_id character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT micro_app FOREIGN KEY (microapp_id)
        REFERENCES microapps (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.link_microapps_users
    OWNER to postgres;

INSERT INTO organisations VALUES (1,'Datavillage');
INSERT INTO microapps values ('G8kmDbjXpcXOIbJNqME8hYLMq895mFuQ','Neo','Explore your digital twin',true,1);
INSERT INTO link_microapps_users VALUES ('G8kmDbjXpcXOIbJNqME8hYLMq895mFuQ','facebook|10216409294199742');
INSERT INTO microapps values ('bHP5QohhV9AP7qNz4P4m28LJZptrM00E','Location','Discover your location history and predict your future',true,1);
INSERT INTO link_microapps_users VALUES ('bHP5QohhV9AP7qNz4P4m28LJZptrM00E','facebook|10216409294199742');
