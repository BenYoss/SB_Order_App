package routes

import (
	"fmt"
	"math/rand"
	"net/http"
	"server/internal/models"
	"server/internal/repository"

	"github.com/gofiber/fiber/v2"
)

type VerifyEmailHandler struct {
	Repo *repository.Repository
}

var verificationCodeStorage map[string]string = make(map[string]string)

func (h *VerifyEmailHandler) SendEmailVerification(context *fiber.Ctx) error {

	// Email information stored
	// contains email address of user
	var bodyResponse models.Email
	var userEmail string

	if err := context.BodyParser(&bodyResponse); err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message": "request failed to parse body."})
	}

	userEmail = bodyResponse.Email
	generatedKey := fmt.Sprintf("%v", rand.Intn(999999))

	verificationCodeStorage[generatedKey] = generatedKey
	fmt.Println(bodyResponse)
	fmt.Println(generatedKey)
	errResponse := h.Repo.SendEmailVerification(generatedKey, userEmail)

	if errResponse != nil {
		context.Status(http.StatusInternalServerError).JSON(
			&fiber.Map{"message": errResponse})
	}

	return nil
}

func (h *VerifyEmailHandler) VerifyEmail(context *fiber.Ctx) error {

	var bodyResponse models.VerificationCode
	var userAttempt string

	if err := context.BodyParser(&bodyResponse); err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message": "request failed to parse body."})
	}
	userAttempt = bodyResponse.VerifyCode
	if _, exists := verificationCodeStorage[userAttempt]; exists {
		context.Status(http.StatusOK).JSON(
			&fiber.Map{
				"message": "Response succeeded.",
				"data":    true,
			})
		return nil
	}
	context.Status(http.StatusOK).JSON(
		&fiber.Map{
			"message": "There is no value in Map.",
			"data":    false,
		})
	return nil
}
