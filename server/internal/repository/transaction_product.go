package repository

import (
	"server/internal/models"
)

func (r *Repository) CreateTransactionProduct(transactionProduct *models.TransactionProduct) error {
	return r.DB.Raw(`
	CALL add_transaction_product_sp(
		?,
		?,
		?
	)`,
		transactionProduct.TransactionID,
		transactionProduct.ProductID,
		transactionProduct.ProductAmount).Scan(&transactionProduct).Error
}

func (r *Repository) GetTransactionProduct() ([]models.TransactionProduct, error) {
	var transactionProducts []models.TransactionProduct

	err := r.DB.Raw("SELECT * FROM TransactionProduct").Scan(&transactionProducts).Error

	return transactionProducts, err
}

func (r *Repository) GetTransactionProductByID(id string) (models.TransactionProduct, error) {
	var transactionProduct models.TransactionProduct

	err := r.DB.Raw("SELECT * FROM transaction_product WHERE id = ?", id).Scan(&transactionProduct).Error

	return transactionProduct, err
}

func (r *Repository) DeleteTransactionProduct(id string) error {
	var transactionProduct models.TransactionProduct

	err := r.DB.Raw("CALL delete_transaction_product_sp(?)", id).Scan(&transactionProduct).Error

	return err
}
