package repository

import (
	"server/internal/models"
)

func (r *Repository) GetCredential() ([]models.Credential, error) {
	var Credentials []models.Credential

	err := r.DB.Raw("SELECT * FROM credential").Scan(&Credentials).Error

	return Credentials, err
}

func (r *Repository) GetCredentialByUsername(username string) (models.Credential, error) {
	var credential models.Credential
	var credentialID string

	err1 := r.DB.Raw(`SELECT credential_id FROM "user" WHERE username = ?`, username).Scan(&credentialID).Error
	if err1 != nil {
		return credential, err1
	}
	err2 := r.DB.Raw("SELECT * FROM credential WHERE id = ?", credentialID).Scan(&credential).Error
	return credential, err2
}
