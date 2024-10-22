package main

import (
	"log"
	"os"
	"path/filepath"
	"server/internal/repository"
	"server/internal/routes"
	"server/internal/storage"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal(err)
	}

	config := &storage.Config{
		Host:     os.Getenv("DB_HOST"),
		Port:     os.Getenv("DB_PORT"),
		Password: os.Getenv("DB_PASS"),
		User:     os.Getenv("DB_USER"),
		SSLMode:  os.Getenv("DB_SSLMODE"),
		DBName:   os.Getenv("DB_NAME"),
	}
	db, err := storage.NewConnection(config)

	if err != nil {
		panic("could not load code to database.")
	}

	app := fiber.New()

	r := &repository.Repository{
		DB: db,
	}

	storeProductHandler := &routes.StoreProductHandler{Repo: r}
	userHandler := &routes.UserHandler{Repo: r}
	storeCartHandler := &routes.StoreCartHander{Repo: r}
	paymentMethodHandler := &routes.PaymentMethodHandler{Repo: r}
	transactionHandler := &routes.TransactionHandler{Repo: r}
	transactionProductHandler := &routes.TransactionProductHandler{Repo: r}
	credentialHandler := &routes.CredentialHandler{Repo: r}
	app.Static("/", "../client/dist")

	api := app.Group("/api")
	//! TODO: Add additional routes for each entity in DB following CRUD.

	//* STORE PRODUCT ROUTES
	api.Post("/create_store_product", storeProductHandler.CreateStoreProduct)
	api.Delete("/delete_store_product/:id", storeProductHandler.DeleteStoreProduct)
	api.Get("/get_store_product/:id", storeProductHandler.GetStoreProductByID)
	api.Get("/store_product/:number", storeProductHandler.GetStoreProducts)
	api.Get("/store_product_search", storeProductHandler.GetStoreProductsAdvanced)

	//* USER ROUTES
	api.Post("/create_user", userHandler.CreateUser)
	api.Delete("/delete_user/:id", userHandler.DeleteUser)
	api.Get("/get_user/:id", userHandler.GetUserByID)
	api.Get("/user", userHandler.GetUser)

	//* STORE CART ROUTES
	api.Post("/create_store_cart", storeCartHandler.CreateStoreCart)
	api.Delete("/delete_store_cart/:id", storeCartHandler.DeleteStoreCart)
	api.Get("/get_store_cart/:id", storeCartHandler.GetStoreCartByID)
	api.Get("/store_cart", storeCartHandler.GetStoreCart)

	//* PAYMENT METHOD ROUTES
	api.Post("/create_payment_method", paymentMethodHandler.CreatePaymentMethod)
	api.Delete("/delete_payment_method/:id", paymentMethodHandler.DeletePaymentMethod)
	api.Get("/get_payment_method/:id", paymentMethodHandler.GetPaymentMethodByID)
	api.Get("/payment_method", paymentMethodHandler.GetPaymentMethod)

	//* TRANSACTION ROUTES
	api.Post("/create_transaction", transactionHandler.CreateTransaction)
	api.Delete("/delete_transaction/:id", transactionHandler.DeleteTransaction)
	api.Get("/get_transaction/:id", transactionHandler.GetTransactionByID)
	api.Get("/transaction", transactionHandler.GetTransaction)

	//* TRANSACTION PRODUCT ROUTES
	api.Post("/create_transaction_product", transactionProductHandler.CreateTransactionProduct)
	api.Delete("/delete_transaction_product/:id", transactionProductHandler.DeleteTransactionProduct)
	api.Get("/get_transaction_product/:id", transactionProductHandler.GetTransactionProductByID)
	api.Get("/transaction_product/", transactionProductHandler.GetTransactionProduct)

	//* CREDENTIAL ROUTES
	api.Get("/get_credential/:id", credentialHandler.GetCredentialByUsername)
	api.Get("/credential", credentialHandler.GetCredential)

	//! TODO: Prevent directory traversal.
	app.Get("/*", func(context *fiber.Ctx) error {
		return context.SendFile(filepath.Join("../client/dist", "index.html"))
	})
	//? EVENT LISTENER
	err = app.Listen(":8081")

	if err != nil {
		panic(err)
	}
}
