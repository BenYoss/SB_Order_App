package repository

import (
	"server/internal/models"
)

func (r *Repository) CreateStoreCart(userID string, productID string) error {
	return r.DB.Raw(`
	CALL add_storeCart_sp(
		?,
		?,
	)`,
		userID,
		productID).Error
}

func (r *Repository) GetStoreCart() ([]models.StoreCart, error) {
	var products []models.StoreCart

	err := r.DB.Raw("SELECT * FROM store_cart_gen_vw").Scan(&products).Error

	return products, err
}

func (r *Repository) GetStoreCartByID(id string) (models.StoreCart, error) {
	var product models.StoreCart

	err := r.DB.Raw("SELECT * FROM store_cart_gen_vw WHERE id = ?", id).Scan(&product).Error

	return product, err
}

func (r *Repository) DeleteStoreCart(id string) error {
	var product models.StoreCart

	err := r.DB.Raw("CALL delete_storeCart_sp(?)", id).Scan(&product).Error

	return err
}
