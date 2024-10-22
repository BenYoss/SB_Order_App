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

}

export async function getProductByID (id: string) {
    return await axios.get(`/api/get_store_product/${id}`)
    .then(({ data }) => {
        return data.data;
    })
    .catch(err => console.error(err));
}



module.exports = {
    createUser,
    decryptPassword,
    getProducts,
    getUserInfo,
    getProductsFromSearch,
    getProductByID
}
