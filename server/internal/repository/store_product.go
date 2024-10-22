package repository

import (
	"fmt"
	"server/internal/models"
	"strconv"

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

func (r *Repository) GetStoreProducts(number int16) ([]models.StoreProduct, error) {
	var products []models.StoreProduct

	err := r.DB.Raw("SELECT * FROM store_product_gen_vw ORDER BY id DESC LIMIT ?", number).Scan(&products).Error

	return products, err
}

func (r *Repository) GetStoreProductsByID(id string) (models.StoreProduct, error) {
	var product models.StoreProduct

	err := r.DB.Raw("SELECT * FROM store_product_gen_vw WHERE id = ?", id).Scan(&product).Error

	return product, err
}

func (r *Repository) GetStoreProductsAdvanced(
	query map[string]string) ([]models.StoreProduct, error) {
	var products []models.StoreProduct
	var err error

	var productName string = fmt.Sprintf("%%%s%%", query["product_name"])

	limit, err := strconv.ParseInt(query["amount"], 0, 16)

	if err != nil {
		return products, err
	}

	offset, err := strconv.ParseInt(query["start_index"], 0, 16)

	if err != nil {
		return products, err
	}

	if query["product_category"] == " " {
		err = r.DB.Raw("SELECT * FROM store_product_gen_vw WHERE product_name LIKE ? LIMIT ? OFFSET ?",
			productName,
			limit,
			offset).Scan(&products).Error
	} else {
		err = r.DB.Raw("SELECT * FROM store_product_gen_vw WHERE product_name LIKE ? AND product_category = ? LIMIT ? OFFSET ?",
			productName,
			query["product_category"],
			limit,
			offset).Scan(&products).Error
	}

	return products, err
}

func (r *Repository) DeleteStoreProduct(id string) error {
	var product models.StoreProduct

	err := r.DB.Raw("CALL delete_product_sp(?)", id).Scan(&product).Error

	return err
}
