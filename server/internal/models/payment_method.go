package models

type PaymentMethod struct {
	ID          string `json:"id"`
	UserID      string `json:"user_id"`
	CardNumber  string `json:"card_number"`
	CardType    string `json:"card_type"`
	ExpDate     string `json:"exp_date"`
	DateChanged string `json:"date_changed"`
}
