-- MOCK DATA : PLEASE COPY AND PASTE TO START SEEING DATA.
INSERT INTO CREDENTIAL ("id", password_hash, date_changed) VALUES
  ('11111111-1111-1111-1111-111111111111',
   crypt('Password123!', gen_salt('bf')),
   '2024-01-15'),
  
  ('22222222-2222-2222-2222-222222222222',
   crypt('SecurePass456$', gen_salt('bf')),
   '2024-02-20');

-- Insert mock data into USER table
INSERT INTO "user" ("id", username, email, phone, arrival_date, last_active, is_admin, credential_id) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
   'john_doe',
   'john.doe@example.com',
   '555-1234',
   '2024-03-01',
   '2024-09-15',
   TRUE,
   '11111111-1111-1111-1111-111111111111'),
  
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
   'jane_smith',
   'jane.smith@example.com',
   '555-5678',
   '2024-04-10',
   '2024-09-18',
   FALSE,
   '22222222-2222-2222-2222-222222222222');

-- Insert mock data into STORE_PRODUCT table
INSERT INTO STORE_PRODUCT ("id", product_name, product_category, product_description, product_image_url, product_color, price, quantity, last_shipment, last_modified) VALUES
  ('33333333-3333-3333-3333-333333333333',
   'Wireless Mouse',
   'Electronics',
   'Ergonomic wireless mouse with adjustable DPI.',
   'https://example.com/images/mouse.jpg',
   'Black',
   29.99,
   150,
   '2024-08-01',
   '2024-09-10'),
  
  ('44444444-4444-4444-4444-444444444444',
   'Gaming Keyboard',
   'Electronics',
   'Mechanical keyboard with RGB lighting and programmable keys.',
   'https://example.com/images/keyboard.jpg',
   'White',
   89.99,
   80,
   '2024-07-15',
   '2024-09-12'),
  
  ('55555555-5555-5555-5555-555555555555',
   'Water Bottle',
   'Accessories',
   'Stainless steel water bottle with insulation.',
   'https://example.com/images/waterbottle.jpg',
   'Blue',
   19.99,
   200,
   '2024-06-20',
   '2024-09-08');

-- Insert mock data into STORE_CART table
INSERT INTO STORE_CART (product_id, user_id, date_added) VALUES
  ('33333333-3333-3333-3333-333333333333', -- Wireless Mouse
   'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', -- john_doe
   '2024-09-19'),
  
  ('44444444-4444-4444-4444-444444444444', -- Gaming Keyboard
   'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', -- jane_smith
   '2024-09-20');

-- Insert mock data into PAYMENT_METHOD table
INSERT INTO PAYMENT_METHOD ("id", user_id, "type", card_number, exp_date, date_changed) VALUES
  ('66666666-6666-6666-6666-666666666666',
   'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', -- john_doe
   'Credit Card',
   '4111111111111111',
   pgp_sym_encrypt('12/25', 'your_secure_key'),
   '2024-09-01'),
  
  ('77777777-7777-7777-7777-777777777777',
   'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', -- jane_smith
   'Debit Card',
   '5500000000000004',
   pgp_sym_encrypt('11/24', 'your_secure_key'),
   '2024-09-05');

-- Insert mock data into transaction table
INSERT INTO "transaction" ("id", payment_id, date_ordered, shipping_address, shipping_city, shipping_state, shipping_zip, tax_rate) VALUES
  ('88888888-8888-8888-8888-888888888888',
   '66666666-6666-6666-6666-666666666666', -- john_doe's Payment Method
   '2024-09-18',
   '123 Elm Street',
   'Springfield',
   'Illinois',
   '62704',
   8.75),
  
  ('99999999-9999-9999-9999-999999999999',
   '77777777-7777-7777-7777-777777777777', -- jane_smith's Payment Method
   '2024-09-19',
   '456 Oak Avenue',
   'Metropolis',
   'New York',
   '10001',
   9.25);

-- Insert mock data into TRANSACTION_PRODUCT table
INSERT INTO TRANSACTION_PRODUCT (transaction_id, product_id, product_amount, product_total) VALUES
  ('88888888-8888-8888-8888-888888888888', -- Transaction by john_doe
   '33333333-3333-3333-3333-333333333333', -- Wireless Mouse
   2,
   59.98),
  
  ('99999999-9999-9999-9999-999999999999', -- Transaction by jane_smith
   '55555555-5555-5555-5555-555555555555', -- Water Bottle
   3,
   59.97);
   
   INSERT INTO STORE_PRODUCT (
    id, 
    product_name, 
    product_category, 
    product_description, 
    product_image_url, 
    product_color, 
    price, 
    quantity, 
    last_shipment, 
    last_modified
) VALUES
  ('123e4567-e89b-12d3-a456-426614174000',
   'Bluetooth Speaker',
   'Electronics',
   'Portable Bluetooth speaker with high-quality sound.',
   'https://example.com/images/speaker.jpg',
   'Red',
   49.99,
   100,
   '2024-08-10',
   '2024-09-10'),

  ('123e4567-e89b-12d3-a456-426614174001',
   'Smart Watch',
   'Electronics',
   'Water-resistant smart watch with multiple fitness tracking features.',
   'https://example.com/images/smartwatch.jpg',
   'Black',
   199.99,
   50,
   '2024-07-15',
   '2024-09-12'),

  ('123e4567-e89b-12d3-a456-426614174002',
   'USB-C Hub',
   'Accessories',
   'Multi-port USB-C hub with HDMI and USB 3.0 ports.',
   'https://example.com/images/usbhub.jpg',
   'Gray',
   39.99,
   80,
   '2024-08-05',
   '2024-09-09'),

  ('123e4567-e89b-12d3-a456-426614174003',
   'Laptop Stand',
   'Accessories',
   'Adjustable aluminum laptop stand for better ergonomics.',
   'https://example.com/images/laptopstand.jpg',
   'Silver',
   29.99,
   70,
   '2024-07-20',
   '2024-09-11'),

  ('123e4567-e89b-12d3-a456-426614174004',
   'Wireless Charger',
   'Electronics',
   'Fast wireless charger compatible with multiple devices.',
   'https://example.com/images/wirelesscharger.jpg',
   'White',
   24.99,
   150,
   '2024-08-15',
   '2024-09-07'),

  ('123e4567-e89b-12d3-a456-426614174005',
   'Noise Cancelling Headphones',
   'Electronics',
   'Over-ear headphones with active noise cancellation.',
   'https://example.com/images/headphones.jpg',
   'Black',
   149.99,
   60,
   '2024-07-30',
   '2024-09-13'),

  ('123e4567-e89b-12d3-a456-426614174006',
   'Fitness Tracker',
   'Electronics',
   'Slim fitness tracker with heart rate monitoring.',
   'https://example.com/images/fitnesstracker.jpg',
   'Blue',
   59.99,
   90,
   '2024-06-10',
   '2024-09-06'),

  ('123e4567-e89b-12d3-a456-426614174007',
   'External Hard Drive',
   'Electronics',
   '1TB external hard drive with USB 3.0 connectivity.',
   'https://example.com/images/harddrive.jpg',
   'Black',
   79.99,
   40,
   '2024-08-20',
   '2024-09-14'),

  ('123e4567-e89b-12d3-a456-426614174008',
   'Webcam',
   'Electronics',
   'HD webcam with built-in microphone.',
   'https://example.com/images/webcam.jpg',
   'Black',
   49.99,
   110,
   '2024-07-05',
   '2024-09-05'),

  ('123e4567-e89b-12d3-a456-426614174009',
   'Gaming Chair',
   'Furniture',
   'Ergonomic gaming chair with adjustable height and recline.',
   'https://example.com/images/gamingchair.jpg',
   'Blue',
   249.99,
   30,
   '2024-08-25',
   '2024-09-15'),

  ('123e4567-e89b-12d3-a456-42661417400A',
   'Portable SSD',
   'Electronics',
   '512GB portable SSD with high-speed data transfer.',
   'https://example.com/images/portablessd.jpg',
   'Silver',
   99.99,
   60,
   '2024-08-12',
   '2024-09-11'),

  ('123e4567-e89b-12d3-a456-42661417400B',
   'Wireless Earbuds',
   'Electronics',
   'Compact wireless earbuds with long battery life.',
   'https://example.com/images/earbuds.jpg',
   'White',
   89.99,
   100,
   '2024-07-18',
   '2024-09-09'),

  ('123e4567-e89b-12d3-a456-42661417400C',
   '4K Monitor',
   'Electronics',
   '27-inch 4K UHD monitor with HDR support.',
   'https://example.com/images/4kmonitor.jpg',
   'Black',
   329.99,
   40,
   '2024-08-08',
   '2024-09-13'),

  ('123e4567-e89b-12d3-a456-42661417400D',
   'Mechanical Keyboard',
   'Electronics',
   'Mechanical keyboard with RGB lighting and programmable keys.',
   'https://example.com/images/mechanicalkeyboard.jpg',
   'White',
   89.99,
   80,
   '2024-07-15',
   '2024-09-12'),

  ('123e4567-e89b-12d3-a456-42661417400E',
   'Wireless Mouse',
   'Electronics',
   'Ergonomic wireless mouse with adjustable DPI.',
   'https://example.com/images/mouse.jpg',
   'Black',
   29.99,
   150,
   '2024-08-01',
   '2024-09-10'),

  ('123e4567-e89b-12d3-a456-42661417400F',
   'Gaming Laptop',
   'Electronics',
   'High-performance gaming laptop with latest GPU.',
   'https://example.com/images/gaminglaptop.jpg',
   'Black',
   1499.99,
   20,
   '2024-07-22',
   '2024-09-16'),

  ('123e4567-e89b-12d3-a456-426614174010',
   'Smartphone',
   'Electronics',
   'Latest model smartphone with advanced features.',
   'https://example.com/images/smartphone.jpg',
   'Blue',
   999.99,
   70,
   '2024-08-18',
   '2024-09-17'),

  ('123e4567-e89b-12d3-a456-426614174011',
   'Tablet',
   'Electronics',
   '10-inch tablet with high-resolution display.',
   'https://example.com/images/tablet.jpg',
   'Silver',
   499.99,
   60,
   '2024-07-25',
   '2024-09-19'),

  ('123e4567-e89b-12d3-a456-426614174012',
   'Wireless Keyboard',
   'Electronics',
   'Slim wireless keyboard with rechargeable battery.',
   'https://example.com/images/wirelesskeyboard.jpg',
   'Black',
   59.99,
   90,
   '2024-08-03',
   '2024-09-11'),

  ('123e4567-e89b-12d3-a456-426614174013',
   'Smart Light Bulb',
   'Home Automation',
   'Wi-Fi enabled smart light bulb with color changing.',
   'https://example.com/images/smartlightbulb.jpg',
   'Multi-color',
   19.99,
   200,
   '2024-07-28',
   '2024-09-14'),

  ('123e4567-e89b-12d3-a456-426614174014',
   'Smart Thermostat',
   'Home Automation',
   'Programmable smart thermostat with remote control.',
   'https://example.com/images/smartthermostat.jpg',
   'White',
   129.99,
   50,
   '2024-08-07',
   '2024-09-12'),

  ('123e4567-e89b-12d3-a456-426614174015',
   'Robot Vacuum',
   'Home Appliances',
   'Autonomous robot vacuum cleaner with scheduling features.',
   'https://example.com/images/robotvacuum.jpg',
   'Gray',
   299.99,
   30,
   '2024-08-20',
   '2024-09-15'),

  ('123e4567-e89b-12d3-a456-426614174016',
   'Air Purifier',
   'Home Appliances',
   'HEPA air purifier with quiet operation.',
   'https://example.com/images/airpurifier.jpg',
   'White',
   199.99,
   40,
   '2024-07-30',
   '2024-09-13'),

  ('123e4567-e89b-12d3-a456-426614174017',
   'Electric Kettle',
   'Kitchen Appliances',
   '1.7L electric kettle with temperature control.',
   'https://example.com/images/electrickettle.jpg',
   'Stainless Steel',
   49.99,
   100,
   '2024-08-14',
   '2024-09-10'),

  ('123e4567-e89b-12d3-a456-426614174018',
   'Blender',
   'Kitchen Appliances',
   'High-speed blender with multiple settings.',
   'https://example.com/images/blender.jpg',
   'Black',
   89.99,
   80,
   '2024-07-19',
   '2024-09-12'),

  ('123e4567-e89b-12d3-a456-426614174019',
   'Coffee Maker',
   'Kitchen Appliances',
   'Automatic coffee maker with programmable timer.',
   'https://example.com/images/coffeemaker.jpg',
   'Black',
   79.99,
   90,
   '2024-08-09',
   '2024-09-11'),

  ('123e4567-e89b-12d3-a456-42661417401A',
   'Air Fryer',
   'Kitchen Appliances',
   'Oil-less air fryer with digital controls.',
   'https://example.com/images/airfryer.jpg',
   'Silver',
   129.99,
   60,
   '2024-07-23',
   '2024-09-14'),

  ('123e4567-e89b-12d3-a456-42661417401B',
   'Electric Toothbrush',
   'Personal Care',
   'Rechargeable electric toothbrush with multiple modes.',
   'https://example.com/images/electrictoothbrush.jpg',
   'Blue',
   59.99,
   150,
   '2024-08-11',
   '2024-09-10'),

  ('123e4567-e89b-12d3-a456-42661417401C',
   'Hair Dryer',
   'Personal Care',
   'Compact hair dryer with ionic technology.',
   'https://example.com/images/hairdryer.jpg',
   'Pink',
   39.99,
   120,
   '2024-07-27',
   '2024-09-12'),

  ('123e4567-e89b-12d3-a456-42661417401D',
   'Electric Razor',
   'Personal Care',
   'Waterproof electric razor with multiple attachments.',
   'https://example.com/images/electricrazor.jpg',
   'Black',
   89.99,
   70,
   '2024-08-16',
   '2024-09-13'),

  ('123e4567-e89b-12d3-a456-42661417401E',
   'Smart Scale',
   'Fitness',
   'Bluetooth-enabled smart scale with body composition analysis.',
   'https://example.com/images/smartscale.jpg',
   'Silver',
   59.99,
   100,
   '2024-07-21',
   '2024-09-14'),

  ('123e4567-e89b-12d3-a456-42661417401F',
   'Yoga Mat',
   'Fitness',
   'Eco-friendly non-slip yoga mat with carrying strap.',
   'https://example.com/images/yogamat.jpg',
   'Green',
   29.99,
   200,
   '2024-08-19',
   '2024-09-15'),

  ('123e4567-e89b-12d3-a456-426614174020',
   'Dumbbell Set',
   'Fitness',
   'Adjustable dumbbell set with ergonomic grips.',
   'https://example.com/images/dumbbells.jpg',
   'Black',
   99.99,
   50,
   '2024-07-24',
   '2024-09-16'),

  ('123e4567-e89b-12d3-a456-426614174021',
   'Resistance Bands',
   'Fitness',
   'Set of 5 resistance bands with varying tensions.',
   'https://example.com/images/resistancebands.jpg',
   'Multicolor',
   19.99,
   300,
   '2024-08-22',
   '2024-09-17'),

  ('123e4567-e89b-12d3-a456-426614174022',
   'Treadmill',
   'Fitness',
   'Electric treadmill with multiple workout programs.',
   'https://example.com/images/treadmill.jpg',
   'Black',
   799.99,
   20,
   '2024-07-29',
   '2024-09-18'),

  ('123e4567-e89b-12d3-a456-426614174023',
   'Elliptical Trainer',
   'Fitness',
   'Compact elliptical trainer with adjustable resistance.',
   'https://example.com/images/elliptical.jpg',
   'Gray',
   699.99,
   25,
   '2024-08-23',
   '2024-09-19'),

  ('123e4567-e89b-12d3-a456-426614174024',
   'Stationary Bike',
   'Fitness',
   'Stationary bike with heart rate monitor and LCD display.',
   'https://example.com/images/stationarybike.jpg',
   'Blue',
   499.99,
   35,
   '2024-07-31',
   '2024-09-20'),

  ('123e4567-e89b-12d3-a456-426614174025',
   'Jump Rope',
   'Fitness',
   'Adjustable speed jump rope for cardio workouts.',
   'https://example.com/images/jumprope.jpg',
   'Red',
   14.99,
   250,
   '2024-08-24',
   '2024-09-21');
   
INSERT INTO PAYMENT_METHOD (id, user_id, type, card_number, exp_date, date_changed) VALUES
  ('22222222-2222-2222-2222-222222222222',
   'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
   'Credit Card',
   '4111111111111301',
   pgp_sym_encrypt('06/31', 'your_secure_key'),
   '2024-09-20'),

  ('33333333-3333-3333-3333-333333333333',
   'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
   'Debit Card',
   '5500000000000101',
   pgp_sym_encrypt('07/32', 'your_secure_key'),
   '2024-09-22'),

  ('44444444-4444-4444-4444-444444444444',
   'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
   'Credit Card',
   '4111111111111311',
   pgp_sym_encrypt('08/33', 'your_secure_key'),
   '2024-09-24'),

  ('55555555-5555-5555-5555-555555555555',
   'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
   'Debit Card',
   '5500000000000111',
   pgp_sym_encrypt('09/34', 'your_secure_key'),
   '2024-09-26');

-- Insert corresponding 5 transactions for Jane
INSERT INTO "transaction" (id, payment_id, date_ordered, shipping_address, shipping_city, shipping_state, shipping_zip, tax_rate) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
   '22222222-2222-2222-2222-222222222222',
   '2024-09-21',
   '1212 Cherry Street',
   'Gotham',
   'New Jersey',
   '07030',
   7.50),

  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
   '33333333-3333-3333-3333-333333333333',
   '2024-09-23',
   '1313 Oak Avenue',
   'Star City',
   'California',
   '90002',
   8.00),

  ('cccccccc-cccc-cccc-cccc-cccccccccccc',
   '44444444-4444-4444-4444-444444444444',
   '2024-09-25',
   '1414 Pine Road',
   'Central City',
   'Missouri',
   '63005',
   7.75),

  ('dddddddd-dddd-dddd-dddd-dddddddddddd',
   '55555555-5555-5555-5555-555555555555',
   '2024-09-27',
   '1515 Maple Lane',
   'Coast City',
   'Florida',
   '32004',
   8.25);
   
INSERT INTO TRANSACTION_PRODUCT (transaction_id, product_id, product_amount, product_total) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
   '123e4567-e89b-12d3-a456-426614174000', -- Bluetooth Speaker
   1,
   49.99),

  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
   '123e4567-e89b-12d3-a456-426614174001', -- Smart Watch
   1,
   199.99),

  ('cccccccc-cccc-cccc-cccc-cccccccccccc',
   '123e4567-e89b-12d3-a456-426614174002', -- USB-C Hub
   2,
   79.98),

  ('dddddddd-dddd-dddd-dddd-dddddddddddd',
   '123e4567-e89b-12d3-a456-426614174003', -- Laptop Stand
   1,
   29.99);