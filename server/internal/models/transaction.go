package models

type Transaction struct {
	ID              string  `json:"id"`
	PaymentID       string  `json:"payment_id"`
	ShippingAddress string  `json:"shipping_address"`
	ShippingCity    string  `json:"shipping_city"`
	ShippingState   string  `json:"shipping_state"`
	ShippingZip     string  `json:"shipping_zip"`
	TaxRate         float32 `json:"tax_rate"`
}
