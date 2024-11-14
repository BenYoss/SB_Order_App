package repository

import (
	"fmt"
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
	fmt.Println(credentialID)
	err2 := r.DB.Raw("SELECT * FROM credential WHERE id = ?", credentialID).Scan(&credential).Error
	return credential, err2
}

func (r *Repository) UpdatePassword(username string, newPassword string) error {
	var credentialID string
	var Credential models.Credential

	err1 := r.DB.Raw(`SELECT credential_id FROM "user" WHERE username = ?`, username).Scan(&credentialID).Error
	if err1 != nil {
		return err1
	}

	err := r.DB.Raw(`CALL update_credential_sp(
											?, 
											?
											)`, credentialID, newPassword).Scan(&Credential).Error
	return err
}
