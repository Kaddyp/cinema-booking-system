CREATE DATABASE Odeon_db;
DROP DATABASE Odeon_db;

CREATE TABLE movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL, 
  releaseDate VARCHAR(255) NOT NULL,
  runtimeInMinutes INT,
  trailerUrl VARCHAR(255) NOT NULL,
  displayPriority INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO movies (title, releaseDate, runtimeInMinutes, trailerUrl, displayPriority)
VALUES 
('Moana 2', '2024-11-29', 100, 'https://www.youtube.com/watch?v=YPnNrd9Xc44', 1),
('Wicked', '2024-11-22', 161, 'https://www.youtube.com/watch?v=OlwRRxY5VHo', 2),
('Mufasa The Lion King', '2024-12-20', 118, 'https://www.youtube.com/watch?v=g8N7zH9w0XI', 3),
('Paddington in Peru', '2024-11-08', 105, 'null', 4),
('Conclave', '2024-11-29', 120, 'null', 5),
('Gladiator II', '2024-11-14', 148, 'https://www.youtube.com/watch?v=7S8ElnXTzm4', 3),
('The Wild Robot', '2024-10-18', 102, 'https://www.youtube.com/watch?v=JJudcOeSl-k', 11),
('Red One', '2024-11-06', 123, 'https://www.youtube.com/watch?v=8pIxnwkRvWs', 7),
('Conclave', '2024-11-29', 120, 'null', 5),
('Gladiator II', '2024-11-14', 148, 'https://www.youtube.com/watch?v=7S8ElnXTzm4', 3),
('The Wild Robot', '2024-10-18', 102, 'https://www.youtube.com/watch?v=JJudcOeSl-k', 11),
('Red One', '2024-11-06', 123, 'https://www.youtube.com/watch?v=8pIxnwkRvWs', 7);

DROP TABLE movies;
SELECT * FROM movies;



CREATE TABLE cinemas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  total_screens INT NOT NULL,
  alias VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  foodAndBeverageEnabled BOOLEAN NOT NULL,
  urlSegment VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL
);

INSERT INTO cinemas (name, location, total_screens, alias, foodAndBeverageEnabled, urlSegment, url)
VALUES 
('Acton', 'London', 10, 'cinema', true, 'acton', '/cinemas/acton/'),
('Banbury', '-', 10, 'closedCinema', false, 'banbury', '/cinemas/banbury/'),
('Andover', 'Andover', 2, 'cinema', true, 'andover', '/cinemas/andover/'),
('Boston', 'Boston', 12, 'cinema', true, 'boston', '/cinemas/boston/'),
('Cambridge', 'Cambridge', 5, 'cinema', true, 'cambridge', '/cinemas/cambridge/'),
('Charleston', '-', 10, 'closedCinema', false, 'charleston', '/cinemas/charleston/'),
('Colchester', 'Colchester', 12, 'cinema', true, 'colchester', '/cinemas/colchester/'),
('Durham', 'Durham', 6, 'cinema', true, 'durham', '/cinemas/durham/'),
('Eastbourne', 'Eastbourne', 10, 'cinema', true, 'eastbourne', '/cinemas/eastbourne/'),
('Exeter', 'Exeter', 12, 'cinema', true, 'exeter', '/cinemas/exeter/'),
('Gloucester', '-', 15, 'closedCinema', false, 'gloucester', '/cinemas/gloucester/'),
('Hastings', 'Hastings', 10, 'cinema', true, 'hastings', '/cinemas/hastings/'),
('London', 'London', 12, 'cinema', true, 'london', '/cinemas/london/'),
('Maidenhead', 'Maidenhead', 4, 'cinema', false, 'maidenhead', '/cinemas/maidenhead/'),
('Manchester', 'Manchester', 15, 'cinema', true, 'manchester', '/cinemas/manchester/'),
('Newcastle', 'Newcastle', 10, 'cinema', true, 'newcastle', '/cinemas/newcastle/'),
('Norwich', 'Norwich', 12, 'closedCinema', false, 'norwich', '/cinemas/norwich/');


CREATE TABLE movie_cinemas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  movie_id INT NOT NULL,
  cinema_id INT NOT NULL,
  show_time DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
  FOREIGN KEY (cinema_id) REFERENCES cinemas(id) ON DELETE CASCADE,
  UNIQUE(movie_id, cinema_id, show_time) 
);

INSERT INTO movie_cinemas (movie_id, cinema_id, show_time) 
VALUES 
(1, 10, '2024-12-08 18:30:00'),
(1, 13, '2024-12-13 18:30:00'),
(1, 14, '2024-12-08 16:30:00'),
(1, 17, '2024-12-08 10:30:00'),
(1, 10, '2024-12-08 20:00:00'),
(1, 10, '2024-12-08 16:30:00'),
(1, 10, '2024-12-08 10:30:00');
INSERT INTO movie_cinemas (movie_id, cinema_id, show_time) 
VALUES 
(3, 14, '2024-12-08 10:30:00');
INSERT INTO movie_cinemas (movie_id, cinema_id, show_time) 
VALUES 
(3, 5, '2024-12-08 16:30:00'),
(3, 8, '2024-12-08 18:30:00');
INSERT INTO movie_cinemas (movie_id, cinema_id, show_time) 
VALUES 
(1, 10, '2024-14-08 18:30:00'),
(1, 10, '2024-15-08 16:30:00');

CREATE TABLE seats (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    movie_cinema_id INT NOT NULL,           
    seat_number VARCHAR(10) NOT NULL,       
    status ENUM('available', 'reserved', 'occupied') DEFAULT 'available', 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    UNIQUE (movie_cinema_id, seat_number),  
    FOREIGN KEY (movie_cinema_id) REFERENCES movie_cinemas(id) ON DELETE CASCADE
);

INSERT INTO seats (movie_cinema_id, seat_number, status)
VALUES
    (11, 'B3', 'reserved'),
    (12, 'C1', 'occupied');


INSERT INTO seats (movie_cinema_id, seat_number, status)
VALUES
    (11, 'A1', 'available'),
    (11, 'A2', 'available'),
    (11, 'A3', 'available'),
    (11, 'B1', 'available'),
    (11, 'B2', 'available'),
    (11, 'B3', 'reserved'),
    (11, 'C1', 'occupied'),
    (11, 'C2', 'available');

SELECT 
    s.seat_number, 
    s.status, 
    mc.show_time
FROM 
    seats s
JOIN 
    movie_cinemas mc ON s.movie_cinema_id = mc.id
WHERE 
    s.status = 'available'
    AND mc.show_time = '2024-12-08 18:30:00'
ORDER BY 
    s.seat_number;



 SELECT 
        s.seat_number, 
        s.status, 
        mc.show_time
    FROM 
        seats s
    JOIN 
        movie_cinemas mc ON s.movie_cinema_id = mc.id
    WHERE 
        s.status = 'available' 
        AND mc.movie_id = 1 
        AND mc.cinema_id = 2 
        AND DATE(mc.show_time) = 2024-12-08 
        AND TIME(mc.show_time) = 18:30:00;



CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  movie_id INT NOT NULL,
  cinema_id INT NOT NULL,
  show_time DATETIME NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,  -- Total amount for the booking
  booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),  -- Assuming a 'users' table exists for user information
  FOREIGN KEY (movie_id) REFERENCES movies(id),
  FOREIGN KEY (cinema_id) REFERENCES cinemas(id)
);

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    movie_cinema_id INT NOT NULL,
    guest_name VARCHAR(255) NOT NULL,
    guest_email VARCHAR(255),
    booking_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_cinema_id) REFERENCES movie_cinemas(id)
);

