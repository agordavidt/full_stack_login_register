-- -----------------------------------------------------
-- Table `Users`
-- Stores basic customer registration data
-- -----------------------------------------------------
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Remember to store a HASHED password, not plain text!
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------
-- Table `Products`
-- Stores information about items for sale, including stock
-- -----------------------------------------------------
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    stock_quantity INT NOT NULL CHECK (stock_quantity >= 0),
    image_url VARCHAR(255)
);

-- -----------------------------------------------------
-- Table `Orders`
-- Records a customer's specific order details and delivery information
-- -----------------------------------------------------
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount >= 0),
    delivery_address TEXT NOT NULL,
    order_status VARCHAR(50) NOT NULL DEFAULT 'Pending Payment', 
    
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- -----------------------------------------------------
-- Table `Order_Items`
-- Links products to a specific order and stores purchased quantity and price
-- -----------------------------------------------------
CREATE TABLE order_Items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL CHECK (unit_price >= 0), -- Price at the time of order
    subtotal DECIMAL(10, 2) NOT NULL CHECK (subtotal >= 0), -- quantity * unit_price
    
    FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE RESTRICT
);

-- -----------------------------------------------------
-- Table `Payments`
-- Records details of the transaction, linked to a specific order
-- -----------------------------------------------------
CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT UNIQUE NOT NULL, -- Ensures one payment record per order
    transaction_ref VARCHAR(255) UNIQUE NOT NULL, -- Reference from the payment gateway (Paystack/Flutterwave)
    amount_paid DECIMAL(10, 2) NOT NULL CHECK (amount_paid >= 0),
    payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    payment_method VARCHAR(50),
    payment_status VARCHAR(50) NOT NULL DEFAULT 'Pending', -- e.g., Successful, Failed, Pending
    
    FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE RESTRICT
);