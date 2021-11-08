/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50731
Source Host           : localhost:3306
Source Database       : merchant_payment

Target Server Type    : MYSQL
Target Server Version : 50731
File Encoding         : 65001

Date: 2021-11-07 22:37:04
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `merchant`
-- ----------------------------
DROP TABLE IF EXISTS `merchant`;
CREATE TABLE `merchant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `merchant_name` varchar(255) DEFAULT NULL,
  `account` varchar(255) DEFAULT NULL,
  `webhook` varchar(255) DEFAULT NULL,
  `apikey` varchar(255) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `payment_log`
-- ----------------------------
DROP TABLE IF EXISTS `payment_log`;
CREATE TABLE `payment_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `payment_address` varchar(255) DEFAULT NULL,
  `merchant` varchar(255) DEFAULT NULL,
  `balance` decimal(10,4) DEFAULT NULL,
  `gas` decimal(10,4) DEFAULT NULL,
  `sender` varchar(255) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL,
  `tx` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8;
