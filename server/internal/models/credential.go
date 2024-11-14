package models

type Credential struct {
	ID           string `json:"id"`
	PasswordHash string `json:"password_hash"`
	DateChanged  string `json:"date_changed"`
}

type CredentialUpdateBody struct {
	Username    string `json:"username"`
	NewPassword string `json:"newPassword"`
}
