CREATE TABLE CREDENTIAL(
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	password_hash TEXT NOT NULL,
	date_changed DATE NOT NULL
);

CREATE TABLE "user" (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	username VARCHAR(60) NOT NULL,
	email VARCHAR(60) NOT NULL,
	phone VARCHAR(60),
	arrival_date DATE NOT NULL,
	last_active DATE NOT NULL,
	is_admin BOOL,
	credential_id UUID REFERENCES CREDENTIAL (id) ON DELETE SET NULL,
	UNIQUE(credential_id)
);

CREATE TABLE STORE_PRODUCT (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	product_name VARCHAR(60) NOT NULL,
	product_category VARCHAR(60) NOT NULL,
	product_description VARCHAR(255) NOT NULL,
	product_image_url VARCHAR(125) NOT NULL,
	product_color VARCHAR(20),
	price DECIMAL(10, 2),
	quantity INT,
	last_shipment DATE NOT NULL,
	last_modified DATE NOT NULL
);

CREATE TABLE STORE_CART (
	product_id UUID REFERENCES STORE_PRODUCT (id),
	user_id UUID REFERENCES "user" (id) ON DELETE CASCADE,
	date_added DATE NOT NULL,
	UNIQUE(product_id),
	UNIQUE(user_id)
);

CREATE TABLE PAYMENT_METHOD (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	user_id UUID REFERENCES "user" (id) ON DELETE CASCADE,
	type VARCHAR (15),
	card_number TEXT NOT NULL,
	exp_date BYTEA NOT NULL,
	date_changed DATE NOT NULL
);


CREATE TABLE "transaction" (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	payment_id UUID REFERENCES PAYMENT_METHOD (id) ON DELETE SET NULL,
	date_ordered DATE NOT NULL,
	shipping_address VARCHAR(60) NOT NULL,
	shipping_city VARCHAR(60) NOT NULL,
	shipping_state VARCHAR(60) NOT NULL,
	shipping_zip VARCHAR(20) NOT NULL,
	tax_rate FLOAT(3),
	UNIQUE(payment_id)
);

CREATE TABLE TRANSACTION_PRODUCT (
	transaction_id UUID REFERENCES "transaction" (id) ON DELETE CASCADE,
	product_id UUID REFERENCES STORE_PRODUCT (id) ON DELETE SET NULL,
	product_amount DECIMAL(10, 2),
	product_total DECIMAL (10, 2),
	UNIQUE(transaction_id),
	UNIQUE(product_id)
);

