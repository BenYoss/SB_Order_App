package models

type StoreCart struct {
	CartOwner       string `json:"cart_owner"`
	ProductName     string `json:"product_name"`
	ProductCategory string `json:"product_category"`
	ProductColor    string `json:"product_color"`
	DateAdded       string `json:"date_added"`
}
