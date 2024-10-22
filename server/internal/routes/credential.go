package routes

import (
	"net/http"
	"server/internal/models"
	"server/internal/repository"
	"server/internal/storage"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"

	"fmt"
)

type CredentialHandler struct {
	Repo *repository.Repository
}

func (h *CredentialHandler) GetCredential(context *fiber.Ctx) error {

	credentials, err := h.Repo.GetCredential()

	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not get credentials."})
		return err
	}

	context.Status(http.StatusOK).JSON(
		&fiber.Map{
			"message": "recieved credential.",
			"data":    &credentials,
		})

	return nil
}

func (h *CredentialHandler) GetCredentialByUsername(context *fiber.Ctx) error {
	var credential models.Credential
	passwordAttempt := context.Params("id")
	username := context.Query("username")
	credential, err := h.Repo.GetCredentialByUsername(username)
	if len(passwordAttempt) < 5 {
		context.Status(http.StatusOK).JSON(&fiber.Map{
			"message": "Password is too short.",
			"data":    false,
		})
		return nil
	}

	match := bcrypt.CompareHashAndPassword([]byte(credential.PasswordHash), []byte(passwordAttempt))

	if passwordAttempt == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "password cannot be empty.",
		})
		return nil
	}

	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not find credential."})
		return err
	}

	if match != nil {
		context.Status(http.StatusOK).JSON(&fiber.Map{
			"message": "Password does not match.",
			"data":    false,
		})
		return nil
	}
	storage := storage.GetStorage()
	sess, err := storage.Get(context)

	if err != nil {
		fmt.Println("errror")
	}

	sess.Set("authenticated", true)
	sess.Set("username", username)
	sess.Set("pass", credential.ID)

	sess.Save()

	context.Status(http.StatusOK).JSON(
		&fiber.Map{
			"message": "found credential successfully.",
			"data":    true,
		})

	return nil
}
