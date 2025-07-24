CREATE TABLE tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL, 
    description TEXT, 
    endDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    priority ENUM("Low" , "Medium" , "High"), 
    completed BOOLEAN NOT NULL,
    user VARCHAR(100),
    
    FOREIGN KEY (user) REFERENCES users(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;