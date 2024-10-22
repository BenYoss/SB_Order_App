package routes

import (
	"net/http"
	"server/internal/models"
	"server/internal/repository"

	"github.com/gofiber/fiber/v2"
)

type TransactionProductHandler struct {
	Repo *repository.Repository
}

func (h *TransactionProductHandler) CreateTransactionProduct(context *fiber.Ctx) error {
	var transactionProduct models.TransactionProduct

	if err := context.BodyParser(&transactionProduct); err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"mesage": "request failed"})
		return err
	}

	if err := h.Repo.CreateTransactionProduct(&transactionProduct); err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not create TransactionProduct"})
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "TransactionProduct has been added!"})

	return nil
}

func (h *TransactionProductHandler) GetTransactionProduct(context *fiber.Ctx) error {

	transactionProducts, err := h.Repo.GetTransactionProduct()

	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not get TransactionProducts."})
		return err
	}

	context.Status(http.StatusOK).JSON(
		&fiber.Map{
			"message": "recieved TransactionProduct.",
			"data":    &transactionProducts,
		})

	return nil
}

func (h *TransactionProductHandler) DeleteTransactionProduct(context *fiber.Ctx) error {

	id := context.Params("id") //! TODO: Check id type and text to prevent injection.

	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty.",
		})
		return nil
	}

	if err := h.Repo.DeleteTransactionProduct(id); err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not delete TransactionProduct."})
		return err
	}

	context.Status(http.StatusOK).JSON(
		&fiber.Map{
			"message": "deleted TransactionProduct successfully.",
		})

	return nil
}

func (h *TransactionProductHandler) GetTransactionProductByID(context *fiber.Ctx) error {
	var transactionProduct models.TransactionProduct

	id := context.Params("id")

	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty.",
		})
		return nil
	}

	transactionProduct, err := h.Repo.GetTransactionProductByID(id)

	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not find TransactionProduct."})
		return err
	}

	context.Status(http.StatusOK).JSON(
		&fiber.Map{
			"message": "found TransactionProduct successfully.",
			"data":    &transactionProduct,
		})

	return nil
}
