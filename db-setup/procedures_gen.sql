
CREATE OR REPLACE PROCEDURE add_user_sp
(
	username VARCHAR DEFAULT NULL,
	credential_id UUID DEFAULT NULL,
	email VARCHAR DEFAULT NULL,
	phone VARCHAR DEFAULT NULL
)
LANGUAGE plpgsql
AS $$
BEGIN -- Create a new user and credential table
	IF email = NULL OR phone = NULL OR username = NULL THEN
		RAISE EXCEPTION 'Syntax Error: Please include an email, username, and phone number.';
	END IF;
	INSERT INTO "user" (
		username,
		credential_id,
		email,
		phone,
		arrival_date,
		last_active,
		is_admin
	) VALUES
	(
		username,
		credential_id,
		email,
		phone,
		NOW(),
		NOW(),
		'false'
	);
END;
$$;

CREATE OR REPLACE PROCEDURE add_credential_sp
(
	password TEXT
)
LANGUAGE plpgsql AS $$
BEGIN -- Create a new credential for user
	INSERT INTO credential (password_hash, date_changed) VALUES
	("password", NOW());
END;
$$;

CREATE OR REPLACE PROCEDURE add_store_product_sp
(
		product_name VARCHAR,
		product_category VARCHAR,
		product_description VARCHAR,
		product_image_url VARCHAR,
		product_color VARCHAR,
		price DECIMAL,
		quantity INT
)
LANGUAGE plpgsql AS $$
BEGIN -- Add a new instance of a product in the store
	INSERT INTO store_product
	(
		product_name,
		product_category,
		product_description,
		product_image_url,
		product_color,
		price,
		quantity,
		last_shipment,
		last_modified
	)
	VALUES
	(
		product_name,
		product_category,
		product_description,
		product_image_url,
		product_color,
		price,
		quantity,
		NOW(),
		NOW()
	);
END;
$$;
CREATE OR REPLACE PROCEDURE delete_user_sp
(
	user_id UUID
)
LANGUAGE plpgsql AS $$
DECLARE prev_credential_id UUID;
BEGIN -- Deletes a user from the database.
	prev_credential_id := (SELECT credential_id from "user"
	WHERE "id" = user_id);
	DELETE FROM "user" WHERE "id" = user_id;
	DELETE FROM credential WHERE "id" = prev_credential_id;
END;
$$;

CREATE PROCEDURE delete_product_sp
(
	product_id UUID
)
LANGUAGE plpgsql AS $$
BEGIN -- Deletes a product from the database.
	DELETE FROM "store_product" WHERE "id" = product_id;
END;
$$;

CREATE PROCEDURE delete_transaction_sp
(
	transaction_id UUID
)
LANGUAGE plpgsql AS $$
BEGIN -- Deletes a transaction from the database.
	DELETE FROM "transaction" WHERE "id" = transaction_id;
END;
$$;

CREATE PROCEDURE delete_payment_method_sp
(
	payment_id UUID
)
LANGUAGE plpgsql AS $$
BEGIN -- Deletes a payment method from the database.
	DELETE FROM "payment_method" WHERE "id" = payment_id;
END;
$$;

CREATE OR REPLACE PROCEDURE delete_store_cart_sp
(
	u_user_id UUID,
	u_product_id UUID
)
LANGUAGE plpgsql AS $$
BEGIN -- Deletes a store cart from the database.
	DELETE FROM store_cart WHERE store_cart.user_id = u_user_id AND store_cart.product_id = u_product_id;
END;
$$;

DROP PROCEDURE delete_store_cart_sp;

CREATE PROCEDURE delete_documentation_record
(
	"object_name" UUID
)
LANGUAGE plpgsql AS $$
BEGIN -- Deletes a record from documentation table (db_guide).
	DELETE FROM db_guide WHERE obj_type = object_name;
END;
$$;

CREATE OR REPLACE PROCEDURE update_user_sp
(
	u_user_id UUID,
	u_username VARCHAR DEFAULT NULL,
	u_credential_id UUID DEFAULT NULL,
	u_email VARCHAR DEFAULT NULL,
	u_phone VARCHAR DEFAULT NULL,
	u_arrival_date DATE DEFAULT NULL,
	u_last_active DATE DEFAULT NULL,
	u_is_admin BOOL DEFAULT NULL
)
LANGUAGE plpgsql AS $$
DECLARE 
-- Starting variables.
	n_pass_hash TEXT;
	n_credential_id UUID;
	user_count INT;
	credential_count INT;
BEGIN -- Update the information in an existing user account using dynamic arguments.

	SELECT COUNT("id") INTO user_count FROM "user" WHERE "id" = u_user_id;
	SELECT COUNT("id") INTO credential_count FROM "credential" WHERE "id" = NULL;
	IF (user_count > 0) THEN
-- 	Updates the user account information dynamically. 
--  All "NULL" args default as existing record values.
		UPDATE "user"
		SET
			username = COALESCE(u_username , username),
				credential_id = COALESCE(u_credential_id , credential_id),
				email = COALESCE(u_email , email),
				phone = COALESCE(u_phone , phone),
				arrival_date = COALESCE(u_arrival_date , arrival_date),
				last_active = COALESCE(u_last_active , last_active),
				is_admin = COALESCE(u_is_admin , is_admin)
		WHERE "id" = u_user_id;
-- 	If the credential id does not exist or was not specified, create a new one.
-- 	This will add the last 4 digits of the users phone number as the temp password.
	ELSEIF (credential_count = 0 OR u_credential_id = NULL) THEN
		
		n_pass_hash := crypt((RIGHT(u_phone, 4) || '1234'), gen_salt('bf'));
		
		
		CALL add_credential_sp(
			n_pass_hash
		);
		
		n_credential_id := (SELECT "id" FROM credential WHERE password_hash = n_pass_hash);
		CALL add_user_sp
		(
		u_username,
		n_credential_id,
		u_email,
		u_phone
		);
	ELSE -- If the user did specify an existing credential_id, then the new user will be created.
		CALL add_user_sp
		(
			u_username,
			u_credential_id,
			u_email,
			u_phone
		);
	END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE add_payment_method_sp
(
	user_id UUID,
	type VARCHAR,
	card_number TEXT,
	exp_date BYTEA
)
LANGUAGE plpgsql AS $$
BEGIN
	INSERT INTO payment_method
	(
		user_id,
		type,
		card_number,
		exp_date,
		date_changed
	)
	VALUES
	(
		user_id,
		type,
		card_number,
		exp_date,
		NOW()
	);
END;
$$;


CREATE OR REPLACE PROCEDURE update_payment_method_sp
(
	u_payment_id UUID DEFAULT NULL,
	u_user_id UUID DEFAULT NULL,
	u_type VARCHAR DEFAULT NULL,
	u_card_number TEXT DEFAULT NULL,
	u_exp_date BYTEA DEFAULT NULL,
	u_date_changed DATE DEFAULT NULL
) -- Updates a record in the payment method entity.
 LANGUAGE plpgsql AS $$
 DECLARE
	payment_method_count INT;
	user_count INT;
 BEGIN
	-- If the user does not exist, an exception is raised.
 	SELECT COUNT("id") INTO user_count FROM "user" WHERE "id" = u_user_id;
	SELECT COUNT("id") INTO payment_method_count FROM "payment_method" WHERE "id" = u_payment_id;
	
	IF (payment_method_count > 0) THEN -- Successful condition
		UPDATE "payment_method"
		SET
			payment_id = COALESCE(u_payment_id, payment_id),
			user_id = COALESCE(u_user_id, user_id),
			"type"= COALESCE(u_type, "type"),
			card_number = COALESCE(u_card_number, card_number),
			exp_date = COALESCE(u_exp_date, exp_date),
			date_changed = COALESCE(u_date_changed, date_changed)
		WHERE "id" = u_payment_id;
	ELSE
		IF user_count = 0 THEN -- Exception raised if invalid user ID.
			RAISE EXCEPTION 'Syntax Error: Please include a valid user id.';
		END IF;
		CALL add_payment_method_sp
		(
			u_user_id,
			u_type,
			u_card_number,
			u_exp_date
		);
	END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE update_store_product_sp
(
	u_product_id UUID DEFAULT NULL,
	u_product_name VARCHAR DEFAULT NULL,
	u_product_category VARCHAR DEFAULT NULL,
	u_product_description VARCHAR DEFAULT NULL,
	u_product_image_url VARCHAR DEFAULT NULL,
	u_product_color VARCHAR DEFAULT NULL,
	u_price DECIMAL DEFAULT NULL,
	u_quantity INT DEFAULT NULL,
	u_last_shipment DATE DEFAULT NULL,
	u_last_modified DATE DEFAULT NULL
) -- Updates a record in store product. NOTE: params are optional and default to null if not entered.
LANGUAGE plpgsql AS $$
DECLARE
	product_count INT;
BEGIN
	SELECT COUNT("id") INTO product_count FROM store_product WHERE "id" = u_product_id;
	
	IF (product_count > 0) THEN -- If the store product exists, elements will be updated.
		UPDATE "store_product"
		SET
			product_name = COALESCE(u_product_name, product_name),
			product_category = COALESCE(u_product_category, product_category),
			product_description = COALESCE(u_product_description, product_description),
			product_image_url = COALESCE(u_product_image_url, product_image_url),
			product_color = COALESCE(u_product_color, product_color),
			price = COALESCE(u_price, price),
			quantity = COALESCE(u_quantity, quantity),
			last_shipment = COALESCE(u_last_shipment, last_shipment),
			last_modified = COALESCE(u_last_modified, last_modified)
		WHERE "id" = u_product_id;
	ELSE -- Otherwise, create a new Store Product record.
		CALL add_store_product_sp (
			u_product_name,
			u_product_category,
			u_product_description,
			u_product_image_url,
			u_product_color,
			u_price,
			u_quantity
		);
	END IF;
END;
$$;
CREATE OR REPLACE PROCEDURE add_store_cart_sp
(
	product_id UUID,	
	user_id UUID
) -- Is a surrogate key that pairs two UUIDs from product and user.
LANGUAGE plpgsql AS $$
BEGIN
	INSERT INTO store_cart
	(
		product_id,
		user_id,
		date_added
	)
	VALUES
	(
		product_id,
		user_id,
		NOW()
	);
END;
$$;
CREATE OR REPLACE PROCEDURE update_store_cart_sp
(
	u_product_id UUID DEFAULT NULL,
	u_user_id UUID DEFAULT NULL,
	u_date_added DATE DEFAULT NULL
) -- The store cart can be updated. NOTE: params are optional and null by default.
LANGUAGE plpgsql AS $$
DECLARE
	product_count INT;
	user_count INT;
BEGIN
	SELECT COUNT("id") INTO product_count FROM store_product WHERE "id" = u_product_id;
	SELECT COUNT("id") INTO user_count FROM "user" WHERE "id" = u_user_id;
	-- There must be a valid user ID or product ID, otherwise an error will occur.
	IF (product_count > 0 AND user_count > 0) THEN
		UPDATE store_cart
		SET
			product_id = COALESCE(u_product_id, product_id),
			user_id = COALESCE(u_user_id , user_id ),
			date_added = COALESCE(u_date_added , date_added )
		WHERE "product_id" = u_product_id AND "user_id" = u_user_id;
	ELSEIF (product_count < 0) THEN
		RAISE EXCEPTION 'Syntax Error: Please include a valid product id.';
	ELSE
		RAISE EXCEPTION 'Syntax Error: Please include a valid user id.';
	END IF;
END;
$$;
CREATE OR REPLACE PROCEDURE add_transaction_sp
(
	payment_id UUID DEFAULT NULL,
	shipping_address VARCHAR DEFAULT NULL,
	shipping_city VARCHAR DEFAULT NULL,
	shipping_state VARCHAR DEFAULT NULL,
	shipping_zip VARCHAR DEFAULT NULL,
	tax_rate FLOAT DEFAULT NULL
) -- Creates a new transaction record.
LANGUAGE plpgsql AS $$
BEGIN
	INSERT INTO "transaction"
	(
		payment_id,
		date_ordered,
		shipping_address,
		shipping_city,
		shipping_state,
		shipping_zip,
		tax_rate
	)
	VALUES
	(
		payment_id,
		NOW(),
		shipping_address,
		shipping_city,
		shipping_state,
		shipping_zip,
		tax_rate
	);
END;
$$;

CREATE OR REPLACE PROCEDURE add_transaction_product_sp
(
	transaction_id UUID,
	product_id UUID,
	product_amount DECIMAL
) -- Creates a new surrogate relationship. This keeps track of product amount and total amount.
LANGUAGE plpgsql AS $$
DECLARE
	product_amount_total DECIMAL;
BEGIN
	SELECT (price * product_amount) INTO product_amount_total FROM store_product WHERE "id" = product_id;
	
	INSERT INTO transaction_product
	(
		transaction_id,
		product_id,
		product_amount,
		amount_total
	)
	VALUES
	(
		transaction_id,
		product_id,
		product_amount,
		product_amount_total
	);
END;
$$;
CREATE OR REPLACE PROCEDURE update_transaction_sp
(
	u_id UUID,
	u_payment_id UUID,
	u_date_ordered DATE DEFAULT NULL,
	u_shipping_address VARCHAR DEFAULT NULL,
	u_shipping_city VARCHAR DEFAULT NULL,
	u_shipping_state VARCHAR DEFAULT NULL,
	u_shipping_zip VARCHAR DEFAULT NULL,
	u_tax_rate FLOAT DEFAULT NULL
) -- Updates the existing transacation. NOTE: params are nullable by default.
LANGUAGE plpgsql AS $$
DECLARE
	payment_count INT;
	transaction_count INT;
BEGIN
	SELECT COUNT("id") INTO payment_count FROM payment_method WHERE "id" = u_payment_id;
	SELECT COUNT("id") INTO	transaction_count FROM "transaction" WHERE "id" = u_id;
	
	IF (transaction_count > 0) THEN -- A payment method and transaction must exist.
		UPDATE "transaction"
		SET
			id = COALESCE(u_id, id),
			payment_id = COALESCE(u_payment_id, payment_id),
			date_ordered = COALESCE(u_date_ordered, date_ordered),
			shipping_address = COALESCE(u_shipping_address, shipping_address),
			shipping_city = COALESCE(u_shipping_city, shipping_city),
			shipping_state = COALESCE(u_shipping_state, shipping_state),
			shipping_zip = COALESCE(u_shipping_zip, shipping_zip),
			tax_rate = COALESCE(u_tax_rate, tax_rate)
		WHERE "id" = u_id;
	ELSEIF (payment_count < 0) THEN
		RAISE EXCEPTION 'Syntax Error: Please include a valid payment method id.';
	ELSE
		CALL add_transaction_sp
		(
			payment_id,
			shipping_address,
			shipping_city,
			shipping_state,
			shipping_zip,
			tax_rate
		);
	END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE update_transaction_product_sp
(
	u_transaction_id UUID DEFAULT NULL,
	u_product_id UUID DEFAULT NULL,
	u_product_amount DECIMAL DEFAULT NULL,
	u_amount_total DECIMAL DEFAULT NULL
) -- Updates the transaction product record. NOTE: params are nullable by default.
LANGUAGE plpgsql AS $$
DECLARE
	transaction_count INT;
	product_count INT;
BEGIN
	SELECT COUNT("id") INTO transaction_count FROM "transaction" WHERE "id" = u_transaction_id;
	SELECT COUNT("id") INTO product_count FROM "product" WHERE "id" = u_product_id;
	
	-- If transaction or product IDs do not exist, create a new one.
	IF (transaction_count > 0 AND product_count > 0) THEN 
		UPDATE transaction_product
		SET
			transaction_id = COALESCE(u_transaction_id, transaction_id),
			product_id = COALESCE(u_product_id, product_id),
			product_amount = COALESCE(u_product_amount, product_amount)
		WHERE "transaction_id" = u_transaction_id AND "product_id" = u_product_id;
	ELSE
		CALL add_transaction_product_sp
		(
			u_transaction_id,
			u_product_id,
			u_product_amount
		);
	END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE update_credential_sp
(
	u_credential_id UUID,
	u_password_hash TEXT
) -- Updates an existing credential with a new password hash.
LANGUAGE plpgsql AS $$
DECLARE
	new_password_hash TEXT;
BEGIN
	new_password_hash := crypt((u_password_hash), gen_salt('bf'));
	
	UPDATE credential
	SET
		password_hash = new_password_hash
	WHERE "id" = u_credential_id AND "product_id" = u_product_id;
END;
$$;

