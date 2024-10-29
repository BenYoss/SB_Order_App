//* HELPER FUNCTIONS FOR API/CLIENT INTERRACTIONS 


/**======================
 **      INTERFACES
 *========================**/
import {UserInterface} from "../interfaces/registeryInterface";
import {LoginInterface} from "../interfaces/loginInterface";


/**======================
 **      DEPENDENCIES
 *========================**/
import axios from "axios";

export async function createUser (userInfo: UserInterface) {
    await axios.post("/api/create_user", userInfo)
    .then(({ data }) => {
        alert(data.password);
    })
    .catch(err => console.error(err));
}

export async function decryptPassword (loginInfo: LoginInterface) {
    return await axios.get((`/api/get_credential/${loginInfo.password}`), { params: { username: loginInfo.username } })
    .then(({ data }) => {
        return data.data;
    })
    .catch(err => console.error(err));
}

export async function getUserInfo (sessionId: string) {
    // implement call to the server with Axios
    return await axios.get(`/api/get_user/${sessionId}`)
    .then(({ data }) => {
        return data.data;
    })
    .catch(err => console.error(err));
}

export async function getProducts (amount: number) {
    return await axios.get('/api/store_product/' + amount)
    .then(({ data })  => {
        return data;
    })
    .catch((err) => console.error(err));
}

const searchAmount = 15;

export async function getProductsFromSearch (
    productName: string,
    productCategory: string | null,
    pageNumber: number) {
        let startIndex = 0;
        if (pageNumber > 1) {
            startIndex *= pageNumber;
        }

        return await axios.get(`/api/store_product_search/?product_name=${productName}&product_category=${productCategory || ' '}&amount=${searchAmount}&start_index=${startIndex}`)
        .then(({ data }) => {
            return data.data;
        })
        .catch(err => console.error(err));

}

export async function getFeaturedProduct (username: string) {
    //! TODO: Next steps for additional featuring.
}

export async function getProductByID (id: string) {
    return await axios.get(`/api/get_store_product/${id}`)
    .then(({ data }) => {
        return data.data;
    })
    .catch(err => console.error(err));
}

export async function getColorsOfProduct(productName: string) {
    return await axios.get(`api/store_product_colors/${productName}`)
    .then(({ data }) => {
        return data.data;
    })
    .catch((err) => console.error(err));
}

export async function addProductToCart(userID: string, productID: string) {
    return await axios.post('/api/create_store_cart',
        {userID: userID,
        productID: productID})
    .then(() => {})
    .catch(err => console.error(err));
}

export async function getCart(userID: string) {
    const cartInfo = await axios.get(`api/get_store_cart/${userID}`).catch((err) => console.error(err));

    return cartInfo;
}

export async function deleteCartItem(userID: string, productID: string) {
    await axios.delete(`api/delete_store_cart?userID=${userID}&productID=${productID}`).catch(err => console.error(err));
}

export async function createPaymentInfo(userID: string, cardNumber: string, expiry: string, cardType: string) {
    return await axios.post('/api/create_payment_method',
        {
            user_id: userID,
            card_number: cardNumber,
            exp_date: expiry,
            card_type: cardType
        }
    )
    .then(({data}) => {
        return data.data;
    })
    .catch((err) => console.error(err));
}

export async function createTransaction(paymentID: string, shippingAddress: string, shippingCity: string, shippingState: string, shippingZip: string, taxRate = 1.2) {
    return await axios.post('/api/create_transaction',
        {
            paymentID: paymentID,
            shippingAddress: shippingAddress,
            shippingCity: shippingCity,
            shippingState: shippingState,
            shippingZip: shippingZip,
            taxRate: taxRate
        }
    )
    .then(({data}) => {
        return data.data;
    }).catch((err) => console.error(err));
}

export async function createTransactionProduct(transactionID: string, productID: string, productAmount: number, productTotal: number) {
    await axios.post('/api/create_transaction_product',
        {
            transactionID: transactionID,
            productID: productID,
            productAmount: productAmount,
            productTotal: productTotal,
        }
    )
    .then(({data}) => {
        return data.data;
    }).catch((err) => console.error(err));
}

module.exports = {
    createUser,
    decryptPassword,
    getProducts,
    getUserInfo,
    getProductsFromSearch,
    getProductByID,
    getColorsOfProduct,
    addProductToCart,
    getCart,
    deleteCartItem,
    createTransaction,
    createTransactionProduct,
    createPaymentInfo
}
