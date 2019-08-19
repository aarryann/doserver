CREATE USER appuser WITH PASSWORD 'appuserpw';

CREATE DATABASE dostarter;

GRANT ALL PRIVILEGES ON DATABASE "dostarter" to appuser;

CREATE DATABASE dostarter_test;

GRANT ALL PRIVILEGES ON DATABASE "dostarter_test" to appuser;
