package repository

import (
	"fmt"
	"server/internal/models"
)

func (r *Repository) CreateStoreCart(userID string, productID string) error {
	var storeCart models.StoreCart
	err := r.DB.Raw(`
	CALL add_store_cart_sp(
		?,
		?
)`,
		productID,
		userID).Scan(&storeCart).Error
	fmt.Println(storeCart)
	fmt.Println(err)
	fmt.Println("complete")
	return err
}

func (r *Repository) GetStoreCart() ([]models.StoreCart, error) {
	var products []models.StoreCart

	err := r.DB.Raw("SELECT * FROM store_cart_gen_vw").Scan(&products).Error

	return products, err
}

func (r *Repository) GetStoreCartByID(id string) ([]models.StoreCart, error) {
	var products []models.StoreCart

	err := r.DB.Raw("SELECT * FROM store_cart_gen_vw WHERE cart_owner_id = ?", id).Scan(&products).Error

	return products, err
}

func (r *Repository) DeleteStoreCart(userID string, productID string) error {
	var product models.StoreCart

	err := r.DB.Raw("CALL delete_store_cart_sp(?, ?)", userID, productID).Scan(&product).Error

	return err
}
