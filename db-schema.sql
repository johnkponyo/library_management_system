-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 05, 2024 at 09:21 AM
-- Server version: 8.0.40-0ubuntu0.22.04.1
-- PHP Version: 8.1.2-1ubuntu2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `library`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `genre` varchar(100) DEFAULT NULL,
  `description` text,
  `available` int DEFAULT '1',
  `cover` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `title`, `author`, `genre`, `description`, `available`, `cover`, `created_at`, `updated_at`) VALUES
(2, 'The Watsons - a fragment', 'Jane Austen and L. Oulton', 'Romance', 'This edition doesn\'t have a description yet.!!!!!!!', 1, '/uploads/book-covers/1733243329726-59742256-mb.jpg', '2024-12-03 11:51:33', '2024-12-04 20:41:44'),
(3, 'Runaway Ralph', 'Beverly Cleary', 'Comics', 'Runaway Ralph is the second in a children\'s novel trilogy written by Beverly Cleary. First published in 1970, it is the last book by Cleary that Louis Darling illustrated before his death. The book features the titular character, Ralph S. Mouse, a house mouse that can talk to humans, and goes on adventures on his miniature motorcycle.', 1, '/uploads/book-covers/1733243344807-102763561-runnaway.jpg', '2024-12-03 11:59:40', '2024-12-04 20:41:44'),
(4, 'Faceless Killers', 'Henning Mankell', 'Action', 'One frozen January morning, Inspector Kurt Wallander responds to what he believes is a routine call-out. When he reaches the isolated farmhouse he discovers a bloodbath.\r\n\r\nAn old man has been beaten to death, his wife lies barely alive beside his shattered body, both victims of a violence beyond', 2, '/uploads/book-covers/1733227545956-99649829-faceless.jpg', '2024-12-03 12:05:45', '2024-12-04 20:44:05'),
(5, 'Book x', 'Book x', 'Book x', 'Book x', 2, '/uploads/book-covers/1733243473154-492217591-mb.jpg', '2024-12-03 16:31:13', '2024-12-04 20:44:09'),
(8, 'Book A', 'Book A', 'Book A', 'Book A', 1, '/uploads/book-covers/1733243572319-312662764-runnaway.jpg', '2024-12-03 16:32:52', '2024-12-04 23:50:16'),
(9, 'Book B', 'Book B', 'Book B', 'Book B', 1, '/uploads/book-covers/1733243606555-84944742-faceless.jpg', '2024-12-03 16:33:26', '2024-12-04 20:41:44'),
(10, 'Book C', 'Book C', 'Book C', 'Book C', 1, '/uploads/book-covers/1733243641914-978137582-faceless.jpg', '2024-12-03 16:34:01', '2024-12-04 20:41:44'),
(11, 'Agbale Gbator', 'Agbale Gbator', 'Agbale Gbator', 'Agbale Gbator', 1, '/uploads/book-covers/1733243702861-442123845-mb.jpg', '2024-12-03 16:35:02', '2024-12-05 08:59:09'),
(12, 'Agbale Evelia', 'Agbale Evelia', 'Agbale Evelia', 'Agbale Evelia', 0, '/uploads/book-covers/1733243739665-24007625-faceless.jpg', '2024-12-03 16:35:39', '2024-12-05 08:58:46'),
(13, 'Agbale Mamluetor', 'Agbale Mamluetor', 'Agbale Mamluetor', 'Agbale Mamluetor', 1, '/uploads/book-covers/1733243763717-603973261-runnaway.jpg', '2024-12-03 16:36:03', '2024-12-05 08:37:47'),
(14, 'Soul', 'Hay Jai', 'Mystery', 'No descriptions yet. Care to write one?', 1, '/uploads/book-covers/1733344726524-682128992-soul.jpg', '2024-12-04 20:36:52', '2024-12-05 08:59:06'),
(15, 'Techy', 'Kponyo JDK', 'Technology', 'Technology is the way!!!', 0, '/uploads/book-covers/1733389657218-170318473-Screenshot from 2024-12-05 09-07-11.png', '2024-12-05 09:07:24', '2024-12-05 09:10:29');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `book_id` int DEFAULT NULL,
  `borrow_date` text,
  `return_date` text,
  `status` tinyint NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `user_id`, `book_id`, `borrow_date`, `return_date`, `status`) VALUES
(28, 3, 14, 'Thursday, December 5, 2024', 'Thursday, December 12, 2024', 1),
(29, 3, 12, 'Thursday, December 5, 2024', 'Thursday, December 12, 2024', 0),
(30, 3, 11, 'Thursday, December 5, 2024', 'Thursday, December 12, 2024', 1),
(31, 3, 15, 'Thursday, December 5, 2024', 'Thursday, December 12, 2024', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('librarian','user') DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`) VALUES
(1, 'john', '$2a$10$vHcA.HzrNEsyGTcN.8XtQeh/vrvUqwoTDqu.LPrGBSKRvBdvi5myu', 'user'),
(2, 'librarian', '$2a$10$o6j6iJHmS5bEd4Op9ThnjePB0lXFOeRkwUP3cqL4A4kFC/JiFGK4i', 'librarian'),
(3, 'barak', '$2a$10$iFugRE.3KXUPH2IDOKR7Pua7N5r712E066l8bbIlEYlIijj5qODE.', 'user'),
(4, 'last', '$2a$10$J4eC1CFTJkngKrdQwlnpw.7ibzrC4vENQSx.YeMH4BdsRr/hsMwoK', 'user'),
(5, 'dave', '$2a$10$.3tFWjHp5f/LO4KoNjbCT.eolN4kkgr5hcy2i40yllTVGjlZPagta', 'user'),
(6, 'Ama', '$2a$10$OTV3bZDZalqEPatEQBdWCumbJUsl7Q.PmfSutS0tkJkaCuzuOp84O', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `book_id` (`book_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `username_2` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
