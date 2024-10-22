package models

type StoreProduct struct {
	ID                 string  `json:"id"`
	ProductName        string  `json:"product_name"`
	ProductCategory    string  `json:"product_category"`
	ProductDescription string  `json:"product_description"`
	ProductImageURL    string  `json:"product_image_url"`
	ProductColor       string  `json:"product_color"`
	Price              float32 `json:"price"`
	Quantity           int16   `json:"quantity"`
}
