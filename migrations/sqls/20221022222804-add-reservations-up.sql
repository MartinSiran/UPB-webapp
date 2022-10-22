

CREATE TABLE `reservations` (
  `id` int NOT NULL,
  `provider` varchar(32) DEFAULT NULL,
  `published` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `reservation_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Kľúče pre exportované tabuľky
--

--
-- Indexy pre tabuľku `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pre exportované tabuľky
--

--
-- AUTO_INCREMENT pre tabuľku `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;
