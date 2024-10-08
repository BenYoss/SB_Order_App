package routes

import (
	"net/http"
	"server/internal/models"
	"server/internal/repository"

	"github.com/gofiber/fiber/v2"
)

type StoreProductHandler struct {
	Repo *repository.Repository
}

func (h *StoreProductHandler) CreateStoreProduct(context *fiber.Ctx) error {
	var product models.StoreProduct

	if err := context.BodyParser(&product); err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"mesage": "request failed"})
		return err
	}

	if err := h.Repo.CreateStoreProduct(&product); err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not create product"})
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "product has been added!"})

	return nil
}

func (h *StoreProductHandler) GetStoreProducts(context *fiber.Ctx) error {

	products, err := h.Repo.GetStoreProducts()

	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not get products."})
		return err
	}

	context.Status(http.StatusOK).JSON(
		&fiber.Map{
			"message": "recieved product.",
			"data":    &products,
		})

	return nil
}

func (h *StoreProductHandler) DeleteStoreProduct(context *fiber.Ctx) error {

	id := context.Params("id") //! TODO: Check id type and text to prevent injection.

	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty.",
		})
		return nil
	}

	if err := h.Repo.DeleteStoreProduct(id); err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not delete product."})
		return err
	}

	context.Status(http.StatusOK).JSON(
		&fiber.Map{
			"message": "deleted product successfully.",
		})

	return nil
}

func (h *StoreProductHandler) GetStoreProductByID(context *fiber.Ctx) error {
	var product models.StoreProduct

	id := context.Params("id")

	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty.",
		})
		return nil
	}

	product, err := h.Repo.GetStoreProductsByID(id)

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
