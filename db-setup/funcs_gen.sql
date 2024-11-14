CREATE FUNCTION get_quarterly_user_product_info()
RETURNS TABLE(
	user_id UUID,
	username VARCHAR,
	email VARCHAR,
	phone VARCHAR,
	quart_spending_avg DECIMAL,
	quart_spending_total DECIMAL,
	quart_purchases_count BIGINT
	) AS $$ -- Recieves the quarterly user-product behaviors.
	BEGIN
		RETURN QUERY
		SELECT 
			u.id AS user_id,
			u.username AS username, 
			u.email AS email,
			u.phone AS phone,
			AVG(sp.price) AS quart_spending_avg,
			SUM(sp.price) AS quart_spending_total,
			COUNT(tp.product_amount) AS quart_purchases_count
		FROM store_product_gen_vw AS sp 
			JOIN transaction_product AS tp ON tp.product_id = sp.id
			JOIN "transaction_gen_vw" AS tr ON tr.id = tp.transaction_id
			JOIN payment_method_gen_vw AS pm ON pm.id = tr.payment_card_id
			JOIN "user_gen_vw" AS u ON u.id = pm.user_id
		WHERE EXTRACT(YEAR FROM tr.date_ordered) = EXTRACT(YEAR FROM CURRENT_DATE)
		AND EXTRACT(QUARTER FROM tr.date_ordered) = EXTRACT(QUARTER FROM CURRENT_DATE)
		GROUP BY 
			u.id, u.username, u.email, u.phone;
	END;
$$ LANGUAGE plpgsql;


CREATE FUNCTION get_all_product_categories()
RETURNS TABLE (
	category VARCHAR(60)
) AS $$ -- Retrieves only the product categories distinctly. 
		-- Better than querying all products in the database everytime someone tries a search filter haha.
	BEGIN
		RETURN QUERY SELECT product_category FROM store_product GROUP BY product_category;
	END;
$$ LANGUAGE plpgsql;

SELECT get_all_product_categories();
