import React from 'react';
import { createRoot } from 'react-dom/client';

// Different components imported for route identification.
import HomePage from './components/HomePage';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Profile from './components/Profile';
import Registry from './components/Registry';
import ShoppingCart from './components/ShoppingCart';
import ShoppingList from './components/ShoppingList';
import ShoppingItem from './components/ShoppingItem';


import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';

//* INFO SCSS styles are imported for app

import "./styles/app.scss";

// Initialize root element

const root = createRoot(document.getElementById('root')!);

/**=======================
 * *       Router routes for the app.
 *  
 *  
 *========================**/
const router = createBrowserRouter([{
    path: '/',
    element: <LandingPage />
},
{
    path: '/profile',
    element: <Profile />
},
{
    path: '/register',
    element: <Registry />
},
{
    path: '/home',
    element: <HomePage />
},
{
    path: '/login',
    element: <Login />
},{
    path: '/browse',
    element: <ShoppingList />,
},
{
    path: '/item',
    element: <ShoppingItem />
},
{
    path: '/profile',
    element: <Profile />
}, {
    path: '/cart',
    element: <ShoppingCart />
}
])

/**=======================
 * *       App render for root.
 *  
 *  
 *========================**/
if (!root) {
    console.error("Root element not found!");
} else {
    root.render(<RouterProvider router={router} />);
}
