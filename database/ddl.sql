-- MariaDB dump 10.19  Distrib 10.4.25-MariaDB, for Linux (x86_64)
--
-- Host: classmysql.engr.oregonstate.edu    Database: cs340_flatherz
-- ------------------------------------------------------
-- Server version	10.6.9-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Cities`
--

DROP TABLE IF EXISTS `Cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Cities` (
  `city_id` int(11) NOT NULL AUTO_INCREMENT,
  `city_name` varchar(50) NOT NULL,
  PRIMARY KEY (`city_id`),
  UNIQUE KEY `city_id` (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cities`
--

LOCK TABLES `Cities` WRITE;
/*!40000 ALTER TABLE `Cities` DISABLE KEYS */;
INSERT INTO `Cities` VALUES (1,'San Francisco'),(2,'Portland'),(3,'Los Angeles');
/*!40000 ALTER TABLE `Cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Cuisines`
--

DROP TABLE IF EXISTS `Cuisines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Cuisines` (
  `cuisine_id` int(11) NOT NULL AUTO_INCREMENT,
  `cuisine_name` varchar(50) NOT NULL,
  PRIMARY KEY (`cuisine_id`),
  UNIQUE KEY `cuisine_id` (`cuisine_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cuisines`
--

LOCK TABLES `Cuisines` WRITE;
/*!40000 ALTER TABLE `Cuisines` DISABLE KEYS */;
INSERT INTO `Cuisines` VALUES (1,'Mediterranean'),(2,'Japanese'),(3,'Cajun'),(4,'French'),(5,'Ramen'),(6,'Southern'),(7,'Vegetarian');
/*!40000 ALTER TABLE `Cuisines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Restaurants`
--

DROP TABLE IF EXISTS `Restaurants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Restaurants` (
  `restaurant_id` int(11) NOT NULL AUTO_INCREMENT,
  `restaurant_name` varchar(255) NOT NULL,
  `restaurant_website` varchar(75) DEFAULT NULL,
  `restaurant_email` varchar(75) DEFAULT NULL,
  `city_id` int(11) NOT NULL,
  PRIMARY KEY (`restaurant_id`),
  UNIQUE KEY `restaurant_id` (`restaurant_id`),
  KEY `city_id` (`city_id`),
  CONSTRAINT `Restaurants_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `Cities` (`city_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Restaurants`
--

LOCK TABLES `Restaurants` WRITE;
/*!40000 ALTER TABLE `Restaurants` DISABLE KEYS */;
INSERT INTO `Restaurants` VALUES (1,'Savor','https://savor.menu/',NULL,1),(2,'Marufuku Ramen','https://www.marufukuramen.com/sanfrancisco',NULL,1),(3,'Screen Door Eastside','https://screendoorrestaurant.com/',NULL,2),(4,'Republique','https://republiquela.com/','info@republiquela.com',3),(5,'Savor','https://savor.menu/',NULL,1),(6,'Marufuku Ramen','https://www.marufukuramen.com/sanfrancisco',NULL,1),(7,'Screen Door Eastside','https://screendoorrestaurant.com/',NULL,2),(8,'Republique','https://republiquela.com/','info@republiquela.com',3);
/*!40000 ALTER TABLE `Restaurants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Restaurant_has_cuisines`
--

DROP TABLE IF EXISTS `Restaurant_has_cuisines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Restaurant_has_cuisines` (
  `restaurant_cuisine_id` int(11) NOT NULL AUTO_INCREMENT,
  `restaurant_id` int(11) NOT NULL,
  `cuisine_id` int(11) NOT NULL,
  PRIMARY KEY (`restaurant_cuisine_id`),
  UNIQUE KEY `restaurant_cuisine_id` (`restaurant_cuisine_id`),
  KEY `restaurant_id` (`restaurant_id`),
  KEY `cuisine_id` (`cuisine_id`),
  CONSTRAINT `Restaurant_has_cuisines_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `Restaurants` (`restaurant_id`) ON DELETE CASCADE,
  CONSTRAINT `Restaurant_has_cuisines_ibfk_2` FOREIGN KEY (`cuisine_id`) REFERENCES `Cuisines` (`cuisine_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Restaurants_has_cuisines`
--

LOCK TABLES `Restaurant_has_cuisines` WRITE;
/*!40000 ALTER TABLE `Restaurant_has_cuisines` DISABLE KEYS */;
INSERT INTO `Restaurant_has_cuisines` VALUES (1,1,1),(2,1,7),(3,2,2),(4,2,5),(5,2,7),(6,3,3),(7,3,6),(8,4,4);
/*!40000 ALTER TABLE `Restaurant_has_cuisines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_first_name` varchar(50) NOT NULL,
  `user_last_name` varchar(50) NOT NULL,
  `user_email` varchar(50) NOT NULL,
  `user_city_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id` (`user_id`),
  UNIQUE KEY `user_email` (`user_email`),
  KEY `user_city_id` (`user_city_id`),
  CONSTRAINT `Users_ibfk_1` FOREIGN KEY (`user_city_id`) REFERENCES `Cities` (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'Michael','Scott','mscott@gmail.com',3),(2,'Pamela','Beesly','pbeesly@gmail.com',3),(3,'Jim','Halpert','jhalpert@gmail.com',3),(4,'Dwight','Schrute','dschrute@aol.com',2),(5,'Angela','Martin','amartin@yahoo.com',1);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reviews`
--

DROP TABLE IF EXISTS `Reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Reviews` (
  `review_id` int(11) NOT NULL AUTO_INCREMENT,
  `review_rating` int(11) NOT NULL,
  `review_date` datetime NOT NULL,
  `review_restaurant_id` int(11) NOT NULL,
  `review_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`review_id`),
  UNIQUE KEY `review_id` (`review_id`),
  KEY `review_restaurant_id` (`review_restaurant_id`),
  KEY `review_user_id` (`review_user_id`),
  CONSTRAINT `Reviews_ibfk_1` FOREIGN KEY (`review_restaurant_id`) REFERENCES `Restaurants` (`restaurant_id`) ON DELETE CASCADE,
  CONSTRAINT `Reviews_ibfk_2` FOREIGN KEY (`review_user_id`) REFERENCES `Users` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reviews`
--

LOCK TABLES `Reviews` WRITE;
/*!40000 ALTER TABLE `Reviews` DISABLE KEYS */;
INSERT INTO `Reviews` VALUES (1,3,'2022-10-05 00:00:00',1,4),(2,4,'2022-02-10 00:00:00',4,3),(3,5,'2020-04-20 00:00:00',3,4),(4,4,'2021-05-24 00:00:00',2,4),(5,2,'2021-03-23 00:00:00',5,2);
/*!40000 ALTER TABLE `Reviews` ENABLE KEYS */;
UNLOCK TABLES;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-20 17:04:30










