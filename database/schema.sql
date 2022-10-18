CREATE SCHEMA userdb;

CREATE TABLE `userDB`.`new_table` (
  `userid` INT NOT NULL AUTO_INCREMENT,
  `user` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`userid`));
