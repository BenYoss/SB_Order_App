package repository

import (
	"server/internal/models"

	"gorm.io/gorm"
)

type Repository struct {
	DB *gorm.DB
}

func (r *Repository) CreateStoreProduct(product *models.StoreProduct) error {
	return r.DB.Raw(`
	CALL add_store_product_sp(
		?,
		?,
		?,
		?,
		?,
		?,
		?
	)`,
		product.ProductName,
		product.ProductCategory,
		product.ProductDescription,
		product.ProductImageURL,
		product.ProductColor,
		product.Price,
		product.Quantity).Scan(&product).Error
}

func (r *Repository) GetStoreProducts() ([]models.StoreProduct, error) {
	var products []models.StoreProduct

	err := r.DB.Raw("SELECT * FROM store_product_gen_vw").Scan(&products).Error

	return products, err
}

func (r *Repository) GetStoreProductsByID(id string) (models.StoreProduct, error) {
	var product models.StoreProduct

	err := r.DB.Raw("SELECT * FROM store_product_gen_vw WHERE 'id' = ?", id).Scan(&product).Error

	return product, err
}

func (r *Repository) DeleteStoreProduct(id string) error {
	var product models.StoreProduct

	err := r.DB.Raw("CALL delete_product_sp(?)", id).Scan(&product).Error

	return err
}
