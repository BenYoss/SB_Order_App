package models

type Credential struct {
	ID           string `json:"id"`
	PasswordHash string `json:"password_hash"`
	DateChanged  string `json:"date_changed"`
}
