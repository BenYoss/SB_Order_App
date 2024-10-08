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
	app.Static("/", "../client/dist")
	//! TODO: Prevent directory traversal.
	app.Get("/*", func(context *fiber.Ctx) error {
		return context.SendFile(filepath.Join("../client/dist", "index.html"))
	})

	api := app.Group("/api")
	//! TODO: Add additional routes for each entity in DB following CRUD.
	api.Post("/create_store_product", storeProductHandler.CreateStoreProduct)
	api.Delete("/delete_store_product/:id", storeProductHandler.DeleteStoreProduct)
	api.Get("/get_store_product/:id", storeProductHandler.GetStoreProductByID)
	api.Get("/store_product", storeProductHandler.GetStoreProducts)

	err = app.Listen(":8081")

	if err != nil {
		panic(err)
	}
}
