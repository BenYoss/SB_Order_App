package models

type Email struct {
	Email string `json:"email"`
}

type VerificationCode struct {
	VerifyCode string `json:"verifyCode"`
}
