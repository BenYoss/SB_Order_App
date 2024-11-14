
-- DEVOPS ROLE PERMISSIONS
REVOKE SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA "public" FROM "devops";

GRANT SELECT ON TABLE "db_guide" To "devops";
GRANT SELECT ON TABLE "transaction_product" To "devops";

GRANT SELECT ON "user_gen_vw" TO "devops";
GRANT SELECT ON "payment_method_gen_vw" TO "devops";
GRANT SELECT ON "transaction_gen_vw" TO "devops";
GRANT SELECT ON "store_cart_gen_vw" TO "devops";
GRANT SELECT ON "store_product_gen_vw" TO "devops";
GRANT SELECT ON "user_avg_spending_habits_vw" TO "devops";

GRANT SELECT ON ALL TABLES IN SCHEMA "public" TO "devops" WHERE table_name LIKE %_vw;


-- DATA ENG ROLE PERMISSIONS
CREATE ROLE data_eng WITH LOGIN PASSWORD '40kSGMLzkiDI';

REVOKE SELECT, INSERT, UPDATE ON "credential" FROM "data_eng";
REVOKE SELECT, INSERT, UPDATE ON "payment_method" FROM "data_eng";


-- PROCESS MGMT ROLE PERMISSIONS
CREATE ROLE process_mgmt WITH LOGIN PASSWORD 'MPTsdGkcwGuW';

REVOKE SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA "public" FROM process_mgmt;

GRANT SELECT ON "user_gen_vw" TO "process_mgmt";
GRANT SELECT ON "payment_method_gen_vw" TO "process_mgmt";
GRANT SELECT ON "transaction_gen_vw" TO "process_mgmt";
GRANT SELECT ON "store_cart_gen_vw" TO "process_mgmt";
GRANT SELECT ON "store_product_gen_vw" TO "process_mgmt";
GRANT SELECT ON "user_avg_spending_habits_vw" TO "process_mgmt";

GRANT SELECT ON TABLE "db_guide" To "process_mgmt";
GRANT SELECT ON TABLE "transaction_product" To "process_mgmt";

