CREATE DATABASE prs_db;

USE prs_db;

CREATE TABLE product_review (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    username VARCHAR(255) NOT NULL,
    rating INT NOT NULL,
    review_text VARCHAR(1000),
    review_date DATE,
    status ENUM('Visible','Hidden','Reported') DEFAULT 'Visible',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
