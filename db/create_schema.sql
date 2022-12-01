CREATE DATABASE `snsdatabase`;
CREATE TABLE `CLARO` (
  `id` int NOT NULL AUTO_INCREMENT,
  `networkType` varchar(45) NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `rssi` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `DEFAULT` (
  `id` int NOT NULL AUTO_INCREMENT,
  `networkType` varchar(45) NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `rssi` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `TIGO` (
  `id` int NOT NULL AUTO_INCREMENT,
  `networkType` varchar(45) NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `rssi` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


