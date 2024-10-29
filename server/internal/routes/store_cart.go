package routes

import (
	"net/http"
	"server/internal/models"
	"server/internal/repository"

	"github.com/gofiber/fiber/v2"
)

type StoreCartHander struct {
	Repo *repository.Repository
}

type UserProductHandler struct {
	UserID    string
	ProductID string
}

func (h *StoreCartHander) CreateStoreCart(context *fiber.Ctx) error {
	var userProduct *UserProductHandler
	if err := context.BodyParser(&userProduct); err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"mesage": "request failed"})
		return err
	}

	if err := h.Repo.CreateStoreCart(userProduct.UserID, userProduct.ProductID); err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not create product"})
		return err
	}
	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "product has been added!"})

	return nil
}

func (h *StoreCartHander) GetStoreCart(context *fiber.Ctx) error {

	products, err := h.Repo.GetStoreCart()

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

func (h *StoreCartHander) DeleteStoreCart(context *fiber.Ctx) error {

	userID := context.Query("userID")
	productID := context.Query("productID")

	if userID == "" || productID == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty.",
		})
		return nil
	}

	if err := h.Repo.DeleteStoreCart(userID, productID); err != nil {
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

func (h *StoreCartHander) GetStoreCartByID(context *fiber.Ctx) error {
	var product []models.StoreCart

	id := context.Params("id")

	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty.",
		})
		return nil
	}
	product, err := h.Repo.GetStoreCartByID(id)

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
