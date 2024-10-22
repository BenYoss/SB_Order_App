package routes

import (
	"net/http"
	"server/internal/models"
	"server/internal/repository"

	"github.com/gofiber/fiber/v2"
)

type TransactionHandler struct {
	Repo *repository.Repository
}

func (h *TransactionHandler) CreateTransaction(context *fiber.Ctx) error {
	var transaction models.Transaction

	if err := context.BodyParser(&transaction); err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"mesage": "request failed"})
		return err
	}

	if err := h.Repo.CreateTransaction(&transaction); err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not create transaction"})
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "transaction has been added!"})

	return nil
}

func (h *TransactionHandler) GetTransaction(context *fiber.Ctx) error {

	transactions, err := h.Repo.GetTransaction()

	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not get transactions."})
		return err
	}

	context.Status(http.StatusOK).JSON(
		&fiber.Map{
			"message": "recieved transaction.",
			"data":    &transactions,
		})

	return nil
}

func (h *TransactionHandler) DeleteTransaction(context *fiber.Ctx) error {

	id := context.Params("id") //! TODO: Check id type and text to prevent injection.

	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty.",
		})
		return nil
	}

	if err := h.Repo.DeleteTransaction(id); err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not delete transaction."})
		return err
	}

	context.Status(http.StatusOK).JSON(
		&fiber.Map{
			"message": "deleted transaction successfully.",
		})

	return nil
}

func (h *TransactionHandler) GetTransactionByID(context *fiber.Ctx) error {
	var transaction models.Transaction

	id := context.Params("id")

	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty.",
		})
		return nil
	}

	transaction, err := h.Repo.GetTransactionByID(id)

	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not find transaction."})
		return err
	}

	context.Status(http.StatusOK).JSON(
		&fiber.Map{
			"message": "found transaction successfully.",
			"data":    &transaction,
		})

	return nil
}
