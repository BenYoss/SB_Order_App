-- Keeps track of documentation. Documentation is in its own schema and 
-- reserved for better understanding database procedures, functions, triggers, and entities.

-- To start, run the below script!
CREATE SCHEMA IF NOT EXISTS documentation;

SET search_path TO documentation;

CREATE TABLE db_guide
(
	id INT GENERATED ALWAYS AS IDENTITY,
	obj_type VARCHAR(60) NOT NULL,
	obj_name VARCHAR(60) NOT NULL,
	obj_desc TEXT,
	params TEXT,
	return_value TEXT DEFAULT 'No Return Value'
);
INSERT INTO db_guide (
obj_type,
obj_name,
obj_desc,
params
)
VALUES (
  'stored_procedure',
  'add_credential_sp',
  'Adds a new credential record to the database. Used as a means of creating secure passwords for users.',
  'password (TEXT)'
);

INSERT INTO db_guide (
obj_type,
obj_name,
obj_desc,
params
)
VALUES (
  'stored_procedure',
  'add_user_sp',
  'Adds a new user record to the database.',
  '	username (VARCHAR),
	credential_id (UUID),
	email (VARCHAR),
	phone (VARCHAR)'
);

INSERT INTO db_guide (
obj_type,
obj_name,
obj_desc,
params
)
VALUES (
  'stored_procedure',
  'add_store_product_sp',
  'Adds a new product record to the store.',
  '	product_name (VARCHAR),
		product_category (VARCHAR),
		product_description (VARCHAR),
		product_image_url (VARCHAR),
		product_color (VARCHAR),
		price (DECIMAL),
		quantity (INT)'
);

INSERT INTO db_guide (
obj_type,
obj_name,
obj_desc,
params
)
VALUES (
  'stored_procedure',
  'delete_product_sp',
  'Deletes a product record from the store.',
  '	product_id (UUID)'
);

INSERT INTO db_guide (
obj_type,
obj_name,
obj_desc,
params
)
VALUES (
  'stored_procedure',
  'delete_user_sp',
  'Deletes a user record from the database.',
  '	user_id (UUID)'
);

INSERT INTO db_guide (
obj_type,
obj_name,
obj_desc,
params
)
VALUES (
  'stored_procedure',
  'delete_transaction_sp',
  'Deletes a transaction record from the database.',
  '	transaction_id (UUID)'
);

INSERT INTO db_guide (
obj_type,
obj_name,
obj_desc,
params
)
VALUES (
  'stored_procedure',
  'delete_credential_sp',
  'Deletes a credential record from the user.',
  '	credential_id (UUID)'
);

INSERT INTO db_guide (
obj_type,
obj_name,
obj_desc,
params
)
VALUES (
  'stored_procedure',
  'delete_store_cart_sp',
  'Deletes a cart item record from the user store cart.',
  '	store_cart_id (UUID)'
);

INSERT INTO db_guide (
obj_type,
obj_name,
obj_desc,
params
)
VALUES (
  'stored_procedure',
  'delete_payment_method_sp',
  'Deletes a payment record from the user account.',
  '	payment_id (UUID)'
);


INSERT INTO db_guide (
obj_type,
obj_name,
obj_desc,
params
)
VALUES (
  'stored_procedure',
  'delete_documentation_record',
  'Deletes a documentation record from this entity. Usually used by database engineers and data admins.',
  '	object_name (UUID)'
);

INSERT INTO db_guide (
obj_type,
obj_name,
obj_desc,
params
)
VALUES (
  'view',
  'user_avg_spending_habits_vw',
  'Manages the average spending habits of the user in the past fiscal quarter. Best for finding recent customer behavior.',
  '	None'
);

INSERT INTO db_guide (
obj_type,
obj_name,
obj_desc,
params
)
VALUES (
  'view',
  'payment_method_gen_vw',
  'Displays the general info for the payment method entity. Generally used for simple search and viewability for non-admin accounts.',
  '	None'
);

INSERT INTO db_guide (
obj_type,
obj_name,
obj_desc,
params
)
VALUES (
  'view',
  'store_cart_gen_vw',
  'Displays the general info for the store_cart entity. Generally used for simple search and viewability for non-admin accounts.',
  '	None'
);

INSERT INTO db_guide (
obj_type,
obj_name,
obj_desc,
params
)
VALUES (
  'view',
  'store_product_gen_vw',
  'Displays the general info for the store_product entity. Generally used for simple search and viewability for non-admin accounts.',
  '	None'
);

INSERT INTO db_guide (
obj_type,
obj_name,
obj_desc,
params
)
VALUES (
  'view',
  'transaction_gen_vw',
  'Displays the general info for the transaction entity. Generally used for simple search and viewability for non-admin accounts.',
  '	None'
);

INSERT INTO db_guide (
obj_type,
obj_name,
obj_desc,
params
)
VALUES (
  'view',
  'user_gen_vw',
  'Displays the general info for the user entity. Generally used for simple search and viewability for non-admin accounts.',
  '	None'
);

INSERT INTO db_guide (
obj_type,
obj_name,
obj_desc,
params
)
VALUES (
  'table',
  'user',
  'The entity for customer accounts. Only admins or data engineers can directly operate entities. Is a dependency for:
	payment_method,
	store_cart,
	credential.',
  '	None'
);

INSERT INTO db_guide (
obj_type,
obj_name,
obj_desc,
params
)
VALUES (
  'table',
  'transaction',
  'Manages the transactions of the payment method for the designated user account and the product purchased. Also contains shipping information. Only admins or data engineers can directly operate entities. Is a dependency for:
	transaction_product,
	payment_method',
  '	None'
);

INSERT INTO db_guide (
obj_type,
obj_name,
obj_desc,
params
)
VALUES (
  'table',
  'payment_method',
  'Contains payment information for each user and is required to create transaction purchases. Users can have multiple of these. Only admins or data engineers can directly operate entities. Is a dependency for:
	user,
	transaction',
  '	None'
);
INSERT INTO db_guide (
obj_type,
obj_name,
obj_desc,
params
)
VALUES (
  'table',
  'store_cart',
  'Manages the products a user is interested in. Only admins or data engineers can directly operate entities. Is a dependency for:
	store_product,
	user',
  '	None'
);
INSERT INTO db_guide (
obj_type,
obj_name,
obj_desc,
params
)
VALUES (
  'table',
  'store_product',
  'Keeps track of inventory and product information. Only admins or data engineers can directly operate entities. Is a dependency for:
	transaction_product,
	store_cart',
  '	None'
);

INSERT INTO db_guide (
obj_type,
obj_name,
obj_desc,
params
)
VALUES (
  'table',
  'transaction_product',
  'A many-to-many relationship that keeps track of the product count a user had purchased for each product in the transaction. Only admins or data engineers can directly operate entities. Is a dependency for:
	transaction,
	store_product',
  '	None'
);

INSERT INTO db_guide (
obj_type,
obj_name,
obj_desc,
params
)
VALUES (
  'table',
  'credential',
  'The credentials of a user are stored here. Only admins or senior data engineers on reasonable request can directly operate entities. Is a dependency for:
	user',
  '	None'
);

SET search_path TO "public";
