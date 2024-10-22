package models

type User struct {
	ID           string `json:"id"`
	CredentialID string `json:"credential_id"`
	Username     string `json:"username"`
	Email        string `json:"email"`
	Phone        string `json:"phone"`
	ArrivalDate  string `json:"arrival_date"`
	LastActive   string `json:"last_active"`
	IsAdmin      bool   `json:"is_admin"`
}
