interface HomepageInterfaceUser {
    username: string,
    userID: string,
}

interface HomepageInterfaceProduct {
    id: string,
    product_name: string,
    product_image_url: string,
    price: string
}

export {
    HomepageInterfaceUser,
    HomepageInterfaceProduct
}
