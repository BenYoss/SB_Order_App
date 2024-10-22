import React, { useState, useEffect } from 'react';

import Toolbar from './toolbar/Toolbar';

import ProductSmall from './product/ProductSmall';

import { HomepageInterfaceProduct, HomepageInterfaceUser } from '../interfaces/homepageInterface';

import { getUserInfo, getProducts } from '../helpers/apiHelpers';

interface HomePageProps {
    session: string | null
}

const HomePage: React.FC<HomePageProps> = ({ session }) => {

    const [userInfo, setUserInfo] = useState<HomepageInterfaceUser>({
        username: '',
        userID: ''
    });

    const [productInfo, setProductInfo] = useState<HomepageInterfaceProduct[]>();

    useEffect(() => {
        if (!userInfo.username.length && typeof session == 'string') {
            getUserInfo(session)
            .then(({ username, id }) => {

                setUserInfo({
                    username: username,
                    userID: id
                });
            })
            .catch(err => console.error(err));
        }

        if (productInfo == null) {
            getProducts(3)
            .then(({ data }) => {
                setProductInfo([
                    ...data
                ]);
            })
            .catch(err => console.error(err));
        }

    }, [userInfo]);

    return (
        <div id="homepage-container">
            <Toolbar session={session} />
            
            <div id="homepage-header">
                <h1 className="hdr large" id="homepage-header-text">
                    Welcome Back {userInfo.username} !
                </h1>
            </div>
            <div id="homepage-body-header">
                <h1 className="hdr medium" id="homepage-body-text">
                    {`Today's Featured Items`}
                </h1>
            </div>
            <div id="homepage-body">
                <div id="featured-products-list">
                    {
                        productInfo?.map(({ id, product_name, product_image_url, price }) => (
                            <ProductSmall
                            productID={id}
                            productName={product_name}
                            productImageURL={product_image_url}
                            productPrice={price} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default HomePage;
