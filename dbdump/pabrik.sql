-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: pabrik
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `access_token`
--

DROP TABLE IF EXISTS `access_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `access_token` (
  `id_access_token` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `access_token` text,
  `ip` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_access_token`),
  KEY `Access_Token_UsernameFK_User_idx` (`username`),
  CONSTRAINT `Access_Token_UsernameFK_User` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `access_token`
--

LOCK TABLES `access_token` WRITE;
/*!40000 ALTER TABLE `access_token` DISABLE KEYS */;
INSERT INTO `access_token` VALUES (1,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJ1c2VybmFtZSI6ImFkbWluMiIsImVtYWlsIjoiYWRtaW4ycGFicmlrQGdtYWlsLmNvbSIsIm5hbWUiOiJhZG1pbjIiLCJwYXNzd29yZCI6ImFkbWluIiwiaXNBZG1pblBhYnJpayI6MH1dLCJpYXQiOjE2Mzc0MjQ5NzgsImV4cCI6MTYzNzQyNjQxOH0.Z-3nNj2o94nbYW02rw027ZeGuo4mND2u-8jkFnADkYM','192.168.1.15'),(2,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJ1c2VybmFtZSI6ImFkbWluMSIsImVtYWlsIjoiYWRtaW4xQGdtYWlsLmNvbSIsIm5hbWUiOiJhZG1pbjEiLCJwYXNzd29yZCI6ImFkbWluIiwiaXNBZG1pblBhYnJpayI6MH1dLCJpYXQiOjE2Mzc0MjUyODAsImV4cCI6MTYzNzQyNjcyMH0.oGKz9Z-VrFMetgmC13UTF4eEBpb7QFZWD16t0X539M8','192.168.1.15'),(3,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJ1c2VybmFtZSI6ImFkbWluMiIsImVtYWlsIjoiYWRtaW4yQGdtYWlsLmNvbSIsIm5hbWUiOiJhZG1pbjIiLCJwYXNzd29yZCI6IjIxMjMyZjI5N2E1N2E1YTc0Mzg5NGEwZTRhODAxZmMzIiwiaXNBZG1pblBhYnJpayI6MH1dLCJpYXQiOjE2Mzc0NzM4OTgsImV4cCI6MTYzNzQ3NTMzOH0.zKiyttQ6NlnlOcaNpvQ3wGsY20f9JtgxKi1eMJGEDks','192.168.1.15'),(4,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJ1c2VybmFtZSI6ImFkbWluMiIsImVtYWlsIjoiYWRtaW4yQGdtYWlsLmNvbSIsIm5hbWUiOiJhZG1pbjIiLCJwYXNzd29yZCI6IjIxMjMyZjI5N2E1N2E1YTc0Mzg5NGEwZTRhODAxZmMzIiwiaXNBZG1pblBhYnJpayI6MH1dLCJpYXQiOjE2Mzc0Nzk2MDgsImV4cCI6MTYzNzQ4MTA0OH0.VwOefuhihbfmLzgOThbwI_2d0y2gcE72UBwm4Hik_j4','192.168.1.15'),(5,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJ1c2VybmFtZSI6ImFkbWluMiIsImVtYWlsIjoiYWRtaW4yQGdtYWlsLmNvbSIsIm5hbWUiOiJhZG1pbjIiLCJwYXNzd29yZCI6IjIxMjMyZjI5N2E1N2E1YTc0Mzg5NGEwZTRhODAxZmMzIiwiaXNBZG1pblBhYnJpayI6MH1dLCJpYXQiOjE2Mzc0Nzk4MTEsImV4cCI6MTYzNzQ4MTI1MX0.tB32DBE2P-bv9nHpyy2jWrByvxQFP3nj4jetvYJUyCU','192.168.1.15'),(6,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJ1c2VybmFtZSI6ImFkbWluMiIsImVtYWlsIjoiYWRtaW4yQGdtYWlsLmNvbSIsIm5hbWUiOiJhZG1pbjIiLCJwYXNzd29yZCI6IjIxMjMyZjI5N2E1N2E1YTc0Mzg5NGEwZTRhODAxZmMzIiwiaXNBZG1pblBhYnJpayI6MH1dLCJpYXQiOjE2Mzc0ODI1MTQsImV4cCI6MTYzNzQ4Mzk1NH0.VbTyl6dDWoadawCedCcKjWnruDM41UPeQ549qZ_-mPE','192.168.1.15'),(7,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJ1c2VybmFtZSI6ImFkbWluMiIsImVtYWlsIjoiYWRtaW4yQGdtYWlsLmNvbSIsIm5hbWUiOiJhZG1pbjIiLCJwYXNzd29yZCI6IjIxMjMyZjI5N2E1N2E1YTc0Mzg5NGEwZTRhODAxZmMzIiwiaXNBZG1pblBhYnJpayI6MH1dLCJpYXQiOjE2Mzc1OTQzMTcsImV4cCI6MTYzNzU5NTc1N30.RpN5PllQOQz6Mp7S8otW0Quj_Jnx8akuxUgB4SYcdVY','192.168.1.15');
/*!40000 ALTER TABLE `access_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bahan_baku`
--

DROP TABLE IF EXISTS `bahan_baku`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bahan_baku` (
  `idBahan` int NOT NULL AUTO_INCREMENT,
  `namaBahan` varchar(50) NOT NULL,
  `stokBahan` int NOT NULL,
  PRIMARY KEY (`idBahan`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bahan_baku`
--

LOCK TABLES `bahan_baku` WRITE;
/*!40000 ALTER TABLE `bahan_baku` DISABLE KEYS */;
INSERT INTO `bahan_baku` VALUES (1,'Cokicoki',40),(2,'Gula',30),(3,'baking soda',30),(4,'coklat',30),(5,'stroberi',10),(6,'vanilla',15),(7,'',0),(8,'',0),(9,'',0),(10,'',0),(11,'null',0),(12,'null',0),(13,'',0),(14,'Baking Powder',2),(15,'Ube',66),(16,'Ubi cilembu',55);
/*!40000 ALTER TABLE `bahan_baku` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `idItem` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) NOT NULL,
  PRIMARY KEY (`idItem`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (1,'Dorayaki Original'),(2,'Dorayaki Pisang'),(3,'Dorayaki Matcha'),(4,'Dorayaki Coklat'),(5,'Dorayaki Stroberi'),(6,'Dorayaki Pizza'),(7,'Dorayaki Gogo'),(8,'Dorayaki Dora'),(9,'Dorarara'),(10,'Dorayaki Melon'),(11,'Dorayaki Lasagna');
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log_request`
--

DROP TABLE IF EXISTS `log_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `log_request` (
  `ip` varchar(50) NOT NULL,
  `endpoint` varchar(50) NOT NULL,
  `timestamp` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_request`
--

LOCK TABLES `log_request` WRITE;
/*!40000 ALTER TABLE `log_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `log_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request` (
  `idRequest` int NOT NULL AUTO_INCREMENT,
  `ip` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `idItem` int NOT NULL,
  `quantity` int NOT NULL,
  `timestamp` timestamp NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'PENDING',
  PRIMARY KEY (`idRequest`),
  KEY `RequestIdItem_Item_idx` (`idItem`),
  KEY `RequestIdItemFK_Item_idx` (`idItem`),
  CONSTRAINT `RequestIdItemFK_Item` FOREIGN KEY (`idItem`) REFERENCES `item` (`idItem`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request`
--

LOCK TABLES `request` WRITE;
/*!40000 ALTER TABLE `request` DISABLE KEYS */;
INSERT INTO `request` VALUES (1,'121212','halohalo',1,3,'2020-01-01 08:10:10','ACCEPT'),(2,'121212','halohalo',1,3,'2020-01-01 08:10:10','DECLINE'),(3,'121212','halohalo',1,3,'2020-01-01 08:10:10','PENDING');
/*!40000 ALTER TABLE `request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resep`
--

DROP TABLE IF EXISTS `resep`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resep` (
  `idItem` int NOT NULL,
  `idBahan` int NOT NULL,
  `jumlahBahan` int NOT NULL,
  KEY `ResepIdBahanFK_BahanBaku_idx` (`idBahan`),
  KEY `ResepIdItemFK_Item_idx` (`idItem`),
  CONSTRAINT `ResepIdBahanFK_BahanBaku` FOREIGN KEY (`idBahan`) REFERENCES `bahan_baku` (`idBahan`),
  CONSTRAINT `ResepIdItemFK_Item` FOREIGN KEY (`idItem`) REFERENCES `item` (`idItem`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resep`
--

LOCK TABLES `resep` WRITE;
/*!40000 ALTER TABLE `resep` DISABLE KEYS */;
INSERT INTO `resep` VALUES (1,1,3),(1,2,3),(2,1,3),(2,2,3),(1,3,12),(9,2,2);
/*!40000 ALTER TABLE `resep` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdminPabrik` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`username`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('admin1','admin1@gmail.com','admin1','admin',0),('admin2','admin2@gmail.com','admin2','21232f297a57a5a743894a0e4a801fc3',0),('haikallf','haikalfadil68@gmail.com','adminmaster','21232f297a57a5a743894a0e4a801fc3',0),('polarisgray','polarisgray4@gmail.com','adminpolaris','21232f297a57a5a743894a0e4a801fc3',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-24 10:25:17
