interface ShoppingCartProps {
    session: string | null
}

interface ShoppingCartItem {
    id: string
    product_name: string
    product_category: string
    product_description: string
    product_image_url: string
    product_color: string
    product_id: string
    price: string
    quantity: string
    last_shipment: string
    last_modified: string
}

interface ShippingFormObject {
    shipping_address: string
    shipping_state: string
    shipping_country: string
    shipping_city: string
    shipping_zip: string
}

interface TransactionFormObject {
    card_number: string
    exp_date: string
    type: string
}

export { ShoppingCartProps, ShoppingCartItem, ShippingFormObject, TransactionFormObject }