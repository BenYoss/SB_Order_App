package routes

import (
	"net/http"
	"server/internal/models"
	"server/internal/repository"
	"server/internal/storage"

	"github.com/gofiber/fiber/v2"
)

type UserHandler struct {
	Repo *repository.Repository
}

func (h *UserHandler) CreateUser(context *fiber.Ctx) error {
	var user models.User

	if err := context.BodyParser(&user); err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"mesage": "request failed"})
		return err
	}

	password, errResponse := h.Repo.CreateUser(&user)

	if err := errResponse; err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not create user"})
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": password})

	return nil
}

func (h *UserHandler) GetUser(context *fiber.Ctx) error {

	users, err := h.Repo.GetUser()

	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not get users."})
		return err
	}

	context.Status(http.StatusOK).JSON(
		&fiber.Map{
			"message": "recieved user.",
			"data":    &users,
		})

	return nil
}

func (h *UserHandler) DeleteUser(context *fiber.Ctx) error {

	id := context.Params("id") //! TODO: Check id type and text to prevent injection.

	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty.",
		})
		return nil
	}

	if err := h.Repo.DeleteUser(id); err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not delete user."})
		return err
	}

	context.Status(http.StatusOK).JSON(
		&fiber.Map{
			"message": "deleted user successfully.",
		})

	return nil
}

func (h *UserHandler) GetUserByID(context *fiber.Ctx) error {
	var user models.User
	storage := storage.GetStorage()
	sess, err := storage.Get(context)

	if err != nil {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "non-existent session fetch.",
		})
	}

	id := context.Params("id")

	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty.",
		})
		return nil
	}

	password := sess.Get("pass")

	if passStr, ok := password.(string); ok {
		user, err = h.Repo.GetUserByID(passStr)
	} else {
		context.Status(http.StatusInternalServerError).JSON(
			&fiber.Map{"message": "Could not convert credential to string."})
		return err
	}

	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not find user."})
		return err
	}

	context.Status(http.StatusOK).JSON(
		&fiber.Map{
			"message": "found user successfully.",
			"data":    &user,
		})

	return nil
}
