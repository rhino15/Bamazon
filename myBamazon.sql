-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.13-log - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table bamazon_db.products
CREATE TABLE IF NOT EXISTS `products` (
  `itemID` int(11) NOT NULL AUTO_INCREMENT,
  `productName` varchar(30) DEFAULT NULL,
  `departmentName` varchar(30) DEFAULT NULL,
  `price` double(10,2) DEFAULT NULL,
  `stockQuantity` int(10) DEFAULT NULL,
  PRIMARY KEY (`itemID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- Dumping data for table bamazon_db.products: ~8 rows (approximately)
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` (`itemID`, `productName`, `departmentName`, `price`, `stockQuantity`) VALUES
	(1, 'Nintendo 3DS', 'Electronics', 150.99, 20),
	(2, 'XBOX ONE', 'Electronics', 279.00, 3),
	(3, 'Nintendo WiiU', 'Electronics', 259.00, 10),
	(4, 'PlayStation 4', 'Electronics', 349.00, 1),
	(5, 'Le Creuset Dutch Oven', 'Kitchen and Dining', 321.45, 8),
	(6, 'Cuisinart Ice cream Maker', 'Kitchen and Dining', 238.79, 1),
	(7, 'T-fal Nonstick Pan', 'Kitchen and Dining', 26.99, 9),
	(8, 'Wilson Football', 'Sports', 12.95, 18),
	(9, 'Spalding Basketball', 'Sports', 18.00, 15),
	(10, 'Babolat Tennis Racquet', 'Sports', 185.00, 3);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
