-- Primero, corregimos la creación de la tabla
CREATE TABLE CLIENTE (
    IDCLIENTE NUMBER(10),
    NOMBRE VARCHAR2(100),
    CONSTRAINT PK_CLIENTE PRIMARY KEY (IDCLIENTE)  -- Primary Key explícita
);

DROP TABLE CLIENTE;
DROP SEQUENCE SEQ_CLIENTE;

-- Agregamos una secuencia para el ID (recomendado)
CREATE SEQUENCE SEQ_CLIENTE
    START WITH 1
    INCREMENT BY 1
    NOCACHE
    NOCYCLE;

-- Creamos una primary key (recomendado)
ALTER TABLE CLIENTE ADD CONSTRAINT PK_CLIENTE PRIMARY KEY (IDCLIENTE);

-- Ahora los 10 inserts con diferentes nombres
INSERT INTO CLIENTE (IDCLIENTE, NOMBRE) VALUES (SEQ_CLIENTE.NEXTVAL, 'Juan Pérez Rodríguez');
INSERT INTO CLIENTE (IDCLIENTE, NOMBRE) VALUES (SEQ_CLIENTE.NEXTVAL, 'María González López');
INSERT INTO CLIENTE (IDCLIENTE, NOMBRE) VALUES (SEQ_CLIENTE.NEXTVAL, 'Carlos Ramírez Sánchez');
INSERT INTO CLIENTE (IDCLIENTE, NOMBRE) VALUES (SEQ_CLIENTE.NEXTVAL, 'Ana García Martínez');
INSERT INTO CLIENTE (IDCLIENTE, NOMBRE) VALUES (SEQ_CLIENTE.NEXTVAL, 'Roberto Hernández Torres');
INSERT INTO CLIENTE (IDCLIENTE, NOMBRE) VALUES (SEQ_CLIENTE.NEXTVAL, 'Patricia Luna Flores');
INSERT INTO CLIENTE (IDCLIENTE, NOMBRE) VALUES (SEQ_CLIENTE.NEXTVAL, 'Miguel Ángel Castro Ruiz');
INSERT INTO CLIENTE (IDCLIENTE, NOMBRE) VALUES (SEQ_CLIENTE.NEXTVAL, 'Laura Mendoza Vázquez');
INSERT INTO CLIENTE (IDCLIENTE, NOMBRE) VALUES (SEQ_CLIENTE.NEXTVAL, 'Fernando Silva Morales');
INSERT INTO CLIENTE (IDCLIENTE, NOMBRE) VALUES (SEQ_CLIENTE.NEXTVAL, 'Diana Torres Jiménez');

-- Commit para guardar los cambios
COMMIT;

-- Verificar los datos
SELECT * FROM CLIENTE ORDER BY IDCLIENTE;