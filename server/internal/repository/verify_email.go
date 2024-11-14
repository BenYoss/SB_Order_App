package repository

import (
	"errors"
	"server/internal/email"
)

func (r *Repository) SendEmailVerification(verificationCode string, userEmail string) error {

	err := email.SendGridEmailVerify(verificationCode, userEmail)

	if err != nil {
		err = errors.New("ExecutionError: SendGridAPI Failed to Send Email.")
	}
	return err
}

func (r *Repository) VerifyEmail(realVerificationCode string, verificationAttempt string) bool {

	return realVerificationCode == verificationAttempt

}
