CREATE VIEW user_gen_vw AS SELECT * FROM "user";

CREATE VIEW user_avg_spending_habits_vw AS
SELECT user_id, username, quart_spending_avg, quart_spending_total, quart_purchases_count, 
-- Calculates the average spending habits of each user in the database.
-- Great for marketing and buisiness intelligence insights.
(SELECT
 	sp.product_name
	FROM store_product_gen_vw AS sp
 		JOIN transaction_product AS tp ON tp.product_id = sp.id
 		JOIN "transaction" AS tr ON tr.id = tp.transaction_id
 		JOIN payment_method AS pm ON pm.id = tr.payment_id
 		JOIN "user" AS u ON u.id = pm.user_id
	WHERE
 		EXTRACT(YEAR FROM tr.date_ordered) = EXTRACT(YEAR FROM CURRENT_DATE)
		AND EXTRACT(QUARTER FROM tr.date_ordered) = EXTRACT(QUARTER FROM CURRENT_DATE)
 	GROUP BY sp.product_name
 	ORDER BY COUNT(*) DESC
 	LIMIT 1
) AS quart_freq_purchased_product FROM get_quarterly_user_product_info();

CREATE VIEW store_product_gen_vw AS SELECT * FROM "store_product";

-- Displays payment method info without card numbers or expiration.
CREATE VIEW payment_method_gen_vw AS SELECT "id", user_id, "type", date_changed FROM payment_method;

-- Displays transaction information with usernames and payment method ID
-- to help visualize relationships.
CREATE VIEW transaction_gen_vw AS SELECT
tr.id, u.username AS "user", pm.id AS payment_card_id, tr.date_ordered,
tr.shipping_address, tr.shipping_city, tr.shipping_state, tr.shipping_zip,
tr.tax_rate
FROM "transaction" AS tr
JOIN payment_method AS pm ON pm.id = tr.payment_id
JOIN "user" AS u ON u.id = pm.user_id;

-- Displays the product information and username of the cart item and owner.
CREATE VIEW store_cart_gen_vw AS SELECT
ROW_NUMBER() OVER (ORDER BY sc.date_added) AS "row_number", u.id AS "cart_owner_id", sp.id AS "product_id", u.username AS "cart_owner", sp.product_name, sp.product_image_url, sp.price, sp.product_category, sp.product_color, sc.date_added
FROM store_cart AS sc
JOIN "user" AS u ON sc.user_id = u.id
JOIN store_product AS sp ON sc.product_id = sp.id;
