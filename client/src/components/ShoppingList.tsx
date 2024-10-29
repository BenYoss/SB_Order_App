import React, { useEffect, useState } from 'react';

import Toolbar from './toolbar/Toolbar';

import { getProductsFromSearch } from '../helpers/apiHelpers';
import ProductSmall from './product/ProductSmall';
import Footer from './toolbar/Footer';

interface ShoppingListProps {
    session: string | null
}

interface ShoppingListProducts {
    id: string
    product_name: string
    product_category: string
    product_description: string
    product_image_url: string
    product_color: string
    price: string
    quantity: string
    last_shipment: string,
    last_modified: string,
}

const ShoppingList: React.FC<ShoppingListProps> = ({ session }) => {

    const [products, setProducts] = useState<ShoppingListProducts[]>([]);
    const [pageNumber, setPageNumber] = useState(1);


    useEffect(() => {
        if (!session) {
            window.location.href = '/';
        }
        const url = new URL(window.location.href);
        const queryParams = Object.fromEntries(url.searchParams.entries());
        if (!products.length) {
            getProductsFromSearch(queryParams.query, queryParams.filter || '', pageNumber)
            .then((searchedProducts) => {
                setProducts(searchedProducts);
                setPageNumber(prevPageNumber => prevPageNumber + 1);
            })
            .catch((err) => console.error(err));
        }
    }, [pageNumber]);

    return (
        <div id="shopping-list-container">
            <Toolbar session={session} />
            
            <div id="shopping-list-header">
                <h1 className="hdr large" id="shopping-list-header-text">
                    Shopping List
                </h1>
            </div>
            <div id="shopping-list-body">
                <h1 className="page-number">Page number {pageNumber - 1}</h1>
                <div className="shopping-list">
                        {
                            products.map(({ id, product_name, product_image_url, price }) => (
                                <div id="shopping-list-item">
                                    <ProductSmall
                                    productID={id}
                                    productName={product_name}
                                    productImageURL={product_image_url}
                                    productPrice={price} />
                                </div>
                            ))
                        }
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ShoppingList;