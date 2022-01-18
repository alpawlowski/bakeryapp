-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 18 Sty 2022, 19:03
-- Wersja serwera: 10.4.21-MariaDB
-- Wersja PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `piekarnia`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `city` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `apartment_number` varchar(50) NOT NULL,
  `date_placing_order` date NOT NULL DEFAULT current_timestamp(),
  `time_placing_order` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_receipt_order` date NOT NULL,
  `time_receipt_order` time DEFAULT NULL,
  `product` varchar(255) NOT NULL,
  `comments` text NOT NULL,
  `status` enum('zrealizowane','w trakcie zrealizacji','czeka na realizacje','anulowane') NOT NULL DEFAULT 'czeka na realizacje'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `orders`
--

INSERT INTO `orders` (`id`, `firstname`, `lastname`, `phone`, `email`, `city`, `street`, `apartment_number`, `date_placing_order`, `time_placing_order`, `date_receipt_order`, `time_receipt_order`, `product`, `comments`, `status`) VALUES
(24, 'Jan', 'Kowalski', '123456789', 'jan@kowalski.pl', 'Kielce', 'Uniwersytecka', '1', '2022-01-18', '2022-01-18 17:57:24', '2022-01-20', '12:00:00', 'Bułki', 'Mają być świeże i ciepłe', 'czeka na realizacje'),
(25, 'Jan', 'Kowalski', '123456789', 'jan@kowalski.pl', 'Kielce', 'Uniwersytecka', '1', '2022-01-18', '2022-01-18 18:00:56', '2022-01-20', '18:45:00', 'Jagodzianka', 'Z jagodami', 'czeka na realizacje'),
(26, 'Anna', 'Nowak', '123456789', 'anna@nowak.pl', 'Kielce', 'Uniwersytecka', '1', '2022-01-18', '2022-01-18 18:01:49', '2022-01-22', '10:00:00', 'Chleb', 'Poproszę świeżutki i pachnący', 'czeka na realizacje'),
(27, 'Jan', 'Kowalski', '123456789', 'jan@kowalski.pl', 'Kielce', 'Uniwersytecka', '1', '2022-01-18', '2022-01-18 18:02:49', '2022-01-27', '08:30:00', 'Bułki', '', 'czeka na realizacje');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT 'Produkt',
  `count` int(11) DEFAULT 0,
  `expiration_date` date NOT NULL,
  `price` float NOT NULL,
  `availability` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `products`
--

INSERT INTO `products` (`id`, `name`, `count`, `expiration_date`, `price`, `availability`) VALUES
(1, 'Jagodzianka', 15, '2022-01-20', 2, 1),
(2, 'Bułki', 30, '2022-01-21', 0.7, 1),
(3, 'Chleb', 10, '2022-01-22', 5, 1),
(4, 'Kajzerki', 0, '2022-01-19', 0.5, 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `login` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `position` enum('Pracownik','Kierownik') NOT NULL DEFAULT 'Pracownik',
  `username` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `email`, `position`, `username`) VALUES
(1, 'kierownik', 'pass', 'kierownik@bakeryapp.pl', 'Kierownik', 'Kierownik'),
(2, 'pracownik', 'qwe', 'pracownik@bakeryapp.pl', 'Pracownik', 'Pracownik 01');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT dla tabeli `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
