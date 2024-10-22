package repository

import (
	"server/internal/models"
)

func (r *Repository) CreateTransaction(Transaction *models.Transaction) error {
	return r.DB.Raw(`
	CALL add_transaction_sp(
		?,
		?,
		?,
		?,
		?,
		?
	)`,
		Transaction.PaymentID,
		Transaction.ShippingAddress,
		Transaction.ShippingCity,
		Transaction.ShippingState,
		Transaction.ShippingZip,
		Transaction.TaxRate).Scan(&Transaction).Error
}

func (r *Repository) GetTransaction() ([]models.Transaction, error) {
	var payments []models.Transaction

	err := r.DB.Raw("SELECT * FROM transaction").Scan(&payments).Error

	return payments, err
}

func (r *Repository) GetTransactionByID(id string) (models.Transaction, error) {
	var payment models.Transaction

	err := r.DB.Raw("SELECT * FROM transaction WHERE id = ?", id).Scan(&payment).Error

	return payment, err
}

func (r *Repository) DeleteTransaction(id string) error {
	var payment models.Transaction

	err := r.DB.Raw("CALL delete_transaction_sp(?)", id).Scan(&payment).Error

	return err
}
