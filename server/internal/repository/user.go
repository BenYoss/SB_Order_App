package repository

import (
	"server/internal/models"
)

func (r *Repository) CreateUser(user *models.User) (string, error) {
	var password string = "password"

	err := r.DB.Raw(`
	CALL update_user_sp(
		NULL,
		?,
		NULL,
		?,
		?
	)`,
		user.Username,
		user.Email,
		user.Phone).Scan(&user).Error

	return password, err
}

func (r *Repository) GetUser() ([]models.User, error) {
	var products []models.User

	err := r.DB.Raw("SELECT * FROM user_gen_vw").Scan(&products).Error

	return products, err
}

func (r *Repository) GetUserByID(id string) (models.User, error) {
	var product models.User

	err := r.DB.Raw(`SELECT * FROM "user" WHERE credential_id = ?`, id).Scan(&product).Error

	return product, err
}

func (r *Repository) DeleteUser(id string) error {
	var product models.User

	err := r.DB.Raw("CALL delete_user_sp('?')", id).Scan(&product).Error

	return err
}
