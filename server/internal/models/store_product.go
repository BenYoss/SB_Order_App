package models

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type Repository struct {
	DB *gorm.DB
}

type StoreProduct struct {
	ProductName        string  `json:"product_name"`
	ProductCategory    string  `json:"product_category"`
	ProductDescription string  `json:"product_description"`
	ProductImageURL    string  `json:"product_image_url"`
	ProductColor       string  `json:"product_color"`
	Price              float32 `json:"price"`
	Quantity           int16   `json:"quantity"`
}

func (r *Repository) CreateStoreProduct(context *fiber.Ctx) error {
	var product StoreProduct

	err := context.BodyParser(&product)

	if err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"mesage": "request failed"})
		return err
	}

	err = r.DB.Raw(`
	CALL add_store_product_sp(
		?,
		?,
		?,
		?,
		?,
		?,
		?
	)`,
		product.ProductName,
		product.ProductCategory,
		product.ProductDescription,
		product.ProductImageURL,
		product.ProductColor,
		product.Price,
		product.Quantity).Scan(&product).Error

	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not create product"})
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "product has been added!"})

	return nil
}

func (r *Repository) GetStoreProduct(context *fiber.Ctx) error {
	var products []StoreProduct

	err := r.DB.Raw("SELECT * FROM store_product_gen_vw").Scan(&products).Error

	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not get products."})
		return err
	}

	context.Status(http.StatusOK).JSON(
		&fiber.Map{
			"message": "recieved product.",
			"data":    products,
		})

	return nil
}

func (r *Repository) DeleteStoreProduct(context *fiber.Ctx) error {
	var product StoreProduct

	id := context.Params("id")

	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty.",
		})
		return nil
	}

	err := r.DB.Raw("CALL delete_product_sp(?)", id).Scan(&product).Error

	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not delete product."})
		return err
	}

	context.Status(http.StatusOK).JSON(
		&fiber.Map{
			"message": "deleted product successfully.",
			"data":    &product,
		})

	return nil
}

func (r *Repository) GetStoreProductByID(context *fiber.Ctx) error {
	var product StoreProduct

	id := context.Params("id")

	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty.",
		})
		return nil
	}
	err := r.DB.Raw(`SELECT * FROM store_product_gen_vw WHERE "id" = ?`, id).Scan(&product).Error

	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not find product."})
		return err
	}

	context.Status(http.StatusOK).JSON(
		&fiber.Map{
			"message": "found product successfully.",
			"data":    &product,
		})

	return nil
}
