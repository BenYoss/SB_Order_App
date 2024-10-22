package models

type TransactionProduct struct {
	TransactionID string `json:"transaction_id"`
	ProductID     string `json:"product_id"`
	ProductAmount string `json:"product_amount"`
	ProductTotal  string `json:"product_total"`
}
