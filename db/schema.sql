DROP DATABASE IF EXISTS burgers_db;

CREATE database burgers_db;

USE burgers_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  burger_name VARCHAR(30) NULL,
  devoured BOOLEAN
  PRIMARY KEY (id)
);


