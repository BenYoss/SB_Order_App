import React, { useState, useEffect } from 'react';

import {
    Link
} from 'react-router-dom';

import Toolbar from './toolbar/Toolbar';

import { getProductByID, getColorsOfProduct, getUserInfo, addProductToCart } from '../helpers/apiHelpers'; 
import Footer from './toolbar/Footer';

import Modal from './styleComponents/Modal';

import {AnimatePresence, motion} from 'framer-motion';

interface ShoppingItemProps {
    session: string | null
}

interface ShoppingItemProduct {
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

interface AddedInterface {
    addedName: string
    addedDescription: String
    addedType: string
}

const ShoppingItem: React.FC<ShoppingItemProps> = ({ session }) => {
    const [product, setProduct] = useState<ShoppingItemProduct>({
        id: '',
        product_name: '',
        product_category: '',
        product_description: '',
        product_image_url: '',
        product_color: '',
        price: '',
        quantity: '',
        last_shipment: '',
        last_modified: ''
    });

    const [added, setAdded] = useState<AddedInterface>({
        addedName: '',
        addedDescription: '',
        addedType: ''
    });

    const [exited, setExited] = useState<boolean>(false);

    const [productColors, setProductColors] = useState<ShoppingItemProduct[]>([]);
    
    useEffect(() => {
        if (exited) {
            setExited(false);
            setAdded({
                addedName: '',
                addedDescription: '',
                addedType: ''
            });
        }
    });


    useEffect(() => {

        if (!session) {
            window.location.href = '/';
        }

        const id = window.location.href.split('=')[1];
        
        if (!product.id) {
            getProductByID(id)
            .then((productData) => {
                getColorsOfProduct(productData.product_name)
                .then((colorData) => {
                    setProduct(productData);
                    setProductColors(colorData);
                })
                .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
        }
    }, [product.product_name]);

    useEffect(() => {
        for (let i = 0; i < productColors.length; i++) {
            console.log(productColors[i].product_color, product.product_color);
        }
    }, [productColors]);

    const handleRedirect = (id: string) => {
        window.location.href = `/item?id=${id}`;
    }

    const handleCartAdd = async () => {
        if (session) {
            const user = await getUserInfo(session).catch(err => console.error(err));

            await addProductToCart(user.id, product.id).catch(err => console.error(err));

            setAdded({
                addedName: 'Item Added to Cart!',
                addedDescription: `Item ${product.product_name} has been added to your cart.`,
                addedType: 'Info'
            });
        } else {
            console.error("Error:✴ Session was undefined.");
        }
    }

    return (
        <>
            <Toolbar session={session} />
            <AnimatePresence>
                {
                    added.addedDescription.length && !exited ? (
                        <Modal 
                        title={added.addedName}
                        variant="info"
                        body={{
                            header: null,
                            text: `${added.addedDescription}`,
                            buttonRoute: null,
                            inputRequired: false,
                            inputHandler: null,
                            inputResult: false,
                        }}
                        setExited={setExited}
                        />
                    ) : null
                }
            </AnimatePresence>
            <div id="shopping-item-container" className='page small'>
                
                <div id="shopping-item-header">
                    <div id="shopping-item-header-image">
                        <img src={product.product_image_url} referrerPolicy="no-referrer" alt="Product icon" id="shopping-item-icon" />
                    </div>
                    <div id="shopping-item-header-block">
                        <h1 className="hdr medium" id="shopping-item-header-text">
                            {product.product_name}
                        </h1>
                    </div>
                </div>
                <div id="shopping-item-body">
                        <h1 className="hdr medium" id="shopping-item-description-header">
                            Description
                        </h1>
                        <span id="shopping-item-description">
                            {product.product_description}
                        </span>
                        <h1 className="hdr medium" id="shopping-item-description-header">
                            Colors
                        </h1>
                        <div id="colors-list">
                            {
                                productColors.map(({ id, product_color }) => (
                                    <div className="color-element-container" id={`color ${product_color}`}>
                                        <button type="button" onClick={() => handleRedirect(id)} style={
                                            product_color === product.product_color
                                            ?
                                            {"backgroundColor": `${product_color}`, "border": "3px solid lime"}
                                            :
                                            {"backgroundColor": `${product_color}`}
                                            }className="color-element" />
                                    </div>
                                ))
                            }
                        </div>
                        <div id="shopping-item-price">
                            <span className="dollar-sign">$</span>
                            <span className="price">{product.price}</span>
                        </div>
                        <button className="btn" onClick={handleCartAdd} type='button'>Add to Cart</button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ShoppingItem;
