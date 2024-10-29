package repository

import (
	"server/internal/models"
)

func (r *Repository) CreatePaymentMethod(PaymentMethod *models.PaymentMethod) error {

	return r.DB.Raw(`
	CALL add_payment_method_sp(
		?,
		?,
		?,
		?
	)`,
		PaymentMethod.UserID,
		PaymentMethod.CardType,
		PaymentMethod.CardNumber,
		PaymentMethod.ExpDate).Scan(&PaymentMethod).Error
}

func (r *Repository) GetPaymentMethod() ([]models.PaymentMethod, error) {
	var payments []models.PaymentMethod

	err := r.DB.Raw("SELECT * FROM payment_method").Scan(&payments).Error

	return payments, err
}

func (r *Repository) GetPaymentMethodByID(id string) (models.PaymentMethod, error) {
	var payment models.PaymentMethod

	err := r.DB.Raw("SELECT * FROM payment_method WHERE id = ?", id).Scan(&payment).Error

	return payment, err
}

func (r *Repository) DeletePaymentMethod(id string) error {
	var payment models.PaymentMethod

	err := r.DB.Raw("CALL delete_payment_method_sp(?)", id).Scan(&payment).Error

	return err
}
