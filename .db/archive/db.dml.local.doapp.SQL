INSERT INTO USERS ( ID, FIRST_NAME, LAST_NAME, EMAIL, ENCRYPTED_PASSWORD, INSERTED_AT, UPDATED_AT )  
VALUES ( 1, 'John', 'Doe', '12345678', 'john@be.com', '2018-01-01 01:01:01',  '2018-01-01 01:01:01' );

INSERT INTO BOARDS ( ID, NAME, SLUG, USER_ID, INSERTED_AT, UPDATED_AT )  
VALUES ( 1, 'Board 1', 'board-1', 1, '2018-01-01 01:01:01',  '2018-01-01 01:01:01' );
INSERT INTO BOARDS ( ID, NAME, SLUG, USER_ID, INSERTED_AT, UPDATED_AT )  
VALUES ( 2, 'Board 2', 'board-2', 1, '2018-01-01 01:01:01',  '2018-01-01 01:01:01' );

INSERT INTO USER_BOARDS ( ID, USER_ID, BOARD_ID, INSERTED_AT, UPDATED_AT )  
VALUES ( 1, 1, 1, '2018-01-01 01:01:01',  '2018-01-01 01:01:01' );
INSERT INTO USER_BOARDS ( ID, USER_ID, BOARD_ID, INSERTED_AT, UPDATED_AT )  
VALUES ( 2, 1, 2, '2018-01-01 01:01:01',  '2018-01-01 01:01:01' );

INSERT INTO LISTS ( ID, NAME, POSITION, BOARD_ID, INSERTED_AT, UPDATED_AT )  
VALUES ( 1, 'List 1', 1024, 1, '2018-01-01 01:01:01',  '2018-01-01 01:01:01' );

INSERT INTO CARDS ( ID, NAME, DESCRIPTION, POSITION, TAGS, LIST_ID, INSERTED_AT, UPDATED_AT )  
VALUES ( 1, 'Card 1', NULL, 1024, '{YELLOW}', 1, '2018-01-01 01:01:01',  '2018-01-01 01:01:01' );

