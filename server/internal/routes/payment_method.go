package routes

import (
	"fmt"
	"net/http"
	"server/internal/models"
	"server/internal/repository"

	"github.com/gofiber/fiber/v2"
)

type PaymentMethodHandler struct {
	Repo *repository.Repository
}

func (h *PaymentMethodHandler) CreatePaymentMethod(context *fiber.Ctx) error {
	var payment models.PaymentMethod

	if err := context.BodyParser(&payment); err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"mesage": "request failed"})
		return err
	}
	fmt.Println(payment)
	if err := h.Repo.CreatePaymentMethod(&payment); err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not create payment"})
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "payment has been added!"})

	return nil
}

func (h *PaymentMethodHandler) GetPaymentMethod(context *fiber.Ctx) error {

	payments, err := h.Repo.GetPaymentMethod()

	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not get payments."})
		return err
	}

	context.Status(http.StatusOK).JSON(
		&fiber.Map{
			"message": "recieved payment.",
			"data":    &payments,
		})

	return nil
}

func (h *PaymentMethodHandler) DeletePaymentMethod(context *fiber.Ctx) error {

	id := context.Params("id") //! TODO: Check id type and text to prevent injection.

	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty.",
		})
		return nil
	}

	if err := h.Repo.DeletePaymentMethod(id); err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not delete payment."})
		return err
	}

	context.Status(http.StatusOK).JSON(
		&fiber.Map{
			"message": "deleted payment successfully.",
		})

	return nil
}

func (h *PaymentMethodHandler) GetPaymentMethodByID(context *fiber.Ctx) error {
	var payment models.PaymentMethod

	id := context.Params("id")

	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty.",
		})
		return nil
	}

	payment, err := h.Repo.GetPaymentMethodByID(id)

	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not find payment."})
		return err
	}

	context.Status(http.StatusOK).JSON(
		&fiber.Map{
			"message": "found payment successfully.",
			"data":    &payment,
		})

	return nil
}
