package models

type StoreCart struct {
	CartOwner       string `json:"cart_owner"`
	ProductID       string `json:"product_id"`
	ProductName     string `json:"product_name"`
	ProductCategory string `json:"product_category"`
	ProductImageURL string `json:"product_image_url"`
	ProductColor    string `json:"product_color"`
	Price           string `json:"price"`
	DateAdded       string `json:"date_added"`
}
