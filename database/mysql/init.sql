CREATE DATABASE  IF NOT EXISTS `vacations` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacations`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: vacations
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `vacationId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userKey_idx` (`userId`),
  KEY `vacationKey_idx` (`vacationId`),
  CONSTRAINT `userKey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `vacationKey` FOREIGN KEY (`vacationId`) REFERENCES `vacations_table` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (1,1,1);
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `role` varchar(45) DEFAULT 'user',
  `salt` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'init','init','init','init','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations_table`
--

DROP TABLE IF EXISTS `vacations_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(45) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `price` int DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations_table`
--

LOCK TABLES `vacations_table` WRITE;
/*!40000 ALTER TABLE `vacations_table` DISABLE KEYS */;
INSERT INTO `vacations_table` VALUES (1,'Hawaii','Escape to the tropical paradise of Hawaii, where turquoise waters gently lap against pristine beaches framed by lush, green landscapes. Unwind under swaying palm trees, basking in the warmth of the sun. Explore vibrant coral reefs teeming with marine life, or embark on a thrilling hike through volcanic craters. Savor the flavors of Hawaiian cuisine, from fresh seafood to exotic fruits. Whether you seek relaxation or adventure, Hawaii offers the perfect blend of natural beauty, cultural richness, and relaxation, making it an unforgettable vacation destination.','2023-08-01 00:00:00','2023-08-17 00:00:00',1500,'https://i.natgeofe.com/k/f576c284-661a-4046-ba51-fa95699e1a8b/hawaii-beach_16x9.png');
INSERT INTO `vacations_table` VALUES (2,'Thailand','Embark on an enchanting journey to Thailand, where ancient temples, bustling markets, and stunning natural beauty await. Explore the grandeur of Bangkok''s royal palaces and serene temples, or venture to the tranquil hills of Chiang Mai. Dive into azure waters along the picturesque coastline of Phuket and Krabi. Savor the tantalizing flavors of Thai cuisine, from spicy street food to exquisite seafood dishes. With its vibrant culture, welcoming smiles, and a myriad of adventures, Thailand offers a captivating blend of tradition and modernity, making it an unforgettable vacation destination.','2023-06-12 00:00:00','2023-07-12 00:00:00',1450,'https://a.cdn-hotels.com/gdcs/production146/d585/aa60115c-bdfc-479f-88ba-5cb0f15a5af8.jpg');
INSERT INTO `vacations_table` VALUES (3,'Spain','Indulge in the timeless allure of Spain, a country where rich history and vibrant culture intertwine. Stroll along historic cobbled streets, adorned with stunning architecture from Moorish palaces to Gothic cathedrals. Savor tapas at bustling markets, delighting in the flavors of paella and sangria. Bask in the Mediterranean sun on golden beaches, or hike through rugged mountain landscapes. Spain''s diverse regions offer a tapestry of experiences, from the passionate rhythms of Flamenco in Andalusia to the avant-garde art scene in Barcelona. A vacation in Spain promises a captivating blend of tradition, cuisine, and endless exploration.','2023-09-01 00:00:00','2023-09-12 00:00:00',600,'https://i.natgeofe.com/k/e800ca90-2b5b-4dad-b4d7-b67a48c96c91/spain-madrid_16x9.jpg');
INSERT INTO `vacations_table` VALUES (4,'Philippines','Discover the Philippines, a tropical haven of stunning diversity. Picture yourself on pristine white-sand beaches, gazing at crystal-clear waters teeming with vibrant marine life. Immerse in rich culture as you explore bustling markets and historic sites. Trek through lush rainforests, hidden waterfalls, and ancient rice terraces. Savor delicious street food, from savory adobo to sweet halo-halo. With over 7,000 islands to explore, each offering its unique charm, a vacation in the Philippines promises unforgettable adventures, warm hospitality, and breathtaking natural beauty at every turn.','2023-12-15 00:00:00','2023-12-28 00:00:00',1200,'https://i.natgeofe.com/n/04505c35-858b-4e95-a1a7-d72e5418b7fc/steep-karst-cliffs-of-el-nido-in-palawan.jpg');
INSERT INTO `vacations_table` VALUES (5,'Rome','Experience the timeless beauty of Rome, where ancient history and modern vibrancy intertwine. Roam through the iconic Colosseum, reliving gladiator battles, and stand in awe of the grandeur of the Vatican City''s St. Peter''s Basilica. Savor delectable Italian cuisine at charming trattorias, and toss a coin into the Trevi Fountain to ensure your return. Wander through cobblestone streets, stumble upon hidden piazzas, and marvel at the artistry of Michelangelo''s Sistine Chapel. With every step, Rome whispers stories of its glorious past while embracing the excitement of the present, making it an unforgettable destination for culture enthusiasts and wanderers alike.','2023-08-04 00:00:00','2023-08-12 00:00:00',700,'https://www.travelandleisure.com/thmb/QDUywna6SQbiQte-ZmrJmXcywp0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rome-italy-lead-ROMETG0521-7bd455d3c2b545219498215df7143e0d.jpg');
INSERT INTO `vacations_table` VALUES (6,'Brazil','Embark on an exotic adventure to Brazil, a land of captivating contrasts. Lounge on the sun-kissed beaches of Copacabana and Ipanema, where the rhythm of samba fills the air and the ocean''s waves beckon. Explore the lush Amazon rainforest, teeming with diverse wildlife and verdant landscapes. Witness the grandeur of Rio de Janeiro''s Christ the Redeemer statue atop Corcovado Mountain. Savor the flavors of Brazilian barbecue and vibrant street food markets. With its vibrant culture, breathtaking natural wonders, and lively celebrations, Brazil promises a vacation filled with excitement, beauty, and unforgettable moments.','2023-09-10 00:00:00','2023-09-27 00:00:00',1000,'https://worldstrides.com/wp-content/uploads/2020/06/Brazil_Rio.jpg');
INSERT INTO `vacations_table` VALUES (7,'Mykonos','Escape to the idyllic island of Mykonos, Greece, where white-washed buildings adorned with vibrant blue accents overlook the crystal-clear waters of the Aegean Sea. Bask in the Mediterranean sun on pristine sandy beaches, followed by nights of dancing in world-renowned beach clubs. Explore the charming streets of Mykonos Town, with its charming boutiques and iconic windmills. Savor delectable Greek cuisine at waterfront tavernas, featuring fresh seafood and local specialties. Mykonos offers a perfect blend of relaxation and excitement against a backdrop of stunning Cycladic beauty.','2023-08-02 00:00:00','2023-08-06 00:00:00',350,'https://a.cdn-hotels.com/gdcs/production111/d285/75d4543c-a037-4c93-9c3e-6de54126f6b5.jpg');
INSERT INTO `vacations_table` VALUES (8,'Amsterdam','Discover the enchanting city of Amsterdam, where picturesque canals wind through historic neighborhoods, lined with 17th-century merchant houses and vibrant tulip gardens. Immerse yourself in Dutch culture by visiting world-class museums like the Rijksmuseum and the Van Gogh Museum. Explore the city by bike, gliding along scenic pathways. Cruise the iconic canals, passing under charming bridges and past iconic houseboats. Delight in the culinary scene with Dutch delicacies like bitterballen and stroopwafels. As evening falls, experience the electric nightlife at lively pubs and cultural venues. Amsterdam promises a rich tapestry of art, history, and modern vibrancy.','2023-04-20 00:00:00','2023-04-27 00:00:00',800,'https://cdn.britannica.com/30/180130-138-4FC01CDD/Overview-Amsterdam.jpg');
INSERT INTO `vacations_table` VALUES (9,'Berlin','Experience the dynamic city of Berlin, where history and innovation seamlessly coexist. Wander through the remnants of the Berlin Wall, a symbol of the city''s reunification. Explore iconic landmarks like the Brandenburg Gate and the historic Reichstag building. Dive into the vibrant arts scene with visits to world-renowned galleries and theaters. Savor the diverse culinary offerings, from traditional currywurst to international cuisine at bustling food markets. Enjoy the city''s green spaces like Tiergarten and Mauerpark. As night falls, Berlin''s nightlife comes alive with eclectic bars and pulsating clubs. Berlin offers a captivating blend of history, culture, and contemporary flair.','2023-05-01 00:00:00','2023-05-07 00:00:00',750,'https://destinationwellknown.com/wp-content/uploads/2022/10/berlin-city.jpg');
INSERT INTO `vacations_table` VALUES (10,'Japan','Embark on an unforgettable journey to Japan, a land where ancient traditions harmonize with cutting-edge modernity. Explore the historic streets of Kyoto, home to stunning temples and traditional tea houses. Witness the serenity of cherry blossoms in bloom during springtime. Immerse yourself in Tokyo''s bustling energy, with its neon-lit streets and futuristic architecture. Savor exquisite sushi and ramen, and soak in natural hot springs or "onsen." Discover the tranquility of Japanese gardens and the thrill of Sumo wrestling. Japan offers a captivating blend of old and new, making it a unique and enriching vacation destination.','2023-10-01 00:00:00','2023-10-20 00:00:00',2000,'https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg');
INSERT INTO `vacations_table` VALUES (11,'Las Vegas','Indulge in the glitz and glamour of Las Vegas, the Entertainment Capital of the World. This dazzling desert oasis offers a non-stop whirlwind of excitement. Try your luck at world-famous casinos, catch mesmerizing live shows, and dine at gourmet restaurants helmed by renowned chefs. Explore the iconic Las Vegas Strip, where colossal resorts boast themed attractions and stunning displays. By day, relax at luxurious pools, and by night, experience the vibrant nightlife. Las Vegas is a city that never sleeps, promising a vacation filled with entertainment, luxury, and a touch of the extraordinary.','2023-10-02 00:00:00','2023-11-02 00:00:00',2500,'https://vegasexperience.com/wp-content/uploads/2023/01/Photo-of-Las-Vegas-Downtown-1920x1280.jpg');
INSERT INTO `vacations_table` VALUES (12,'Paris','Discover the enchanting allure of Paris, the City of Love and Light. With its iconic Eiffel Tower, charming cobblestone streets, and world-class art and cuisine, Paris is the epitome of romance and culture. Stroll along the Seine River, visit the Louvre Museum to gaze upon the Mona Lisa, and savor delectable pastries at quaint cafés. Explore historic neighborhoods like Montmartre and Le Marais, where history and modernity seamlessly blend. Whether you''re admiring the city''s landmarks, sipping wine in charming bistros, or taking a boat ride on the Seine, Paris offers an unforgettable vacation filled with elegance and charm.','2023-11-02 00:00:00','2023-11-08 00:00:00',850,'https://wallpaperaccess.com/full/288027.jpg');
/*!40000 ALTER TABLE `vacations_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-17 17:15:56
