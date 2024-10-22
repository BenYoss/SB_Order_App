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

import { getUserSession } from './helpers/helperFuncs';


import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';

//* INFO SCSS styles are imported for app

import "./styles/app.scss";

// Initialize root element

const root = createRoot(document.getElementById('root')!);

const session = getUserSession();



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
    element: <Profile session={ session || null } />
},
{
    path: '/register',
    element: <Registry />
},
{
    path: '/home',
    element: <HomePage session={ session || null } />
},
{
    path: '/login',
    element: <Login session={ session || null } />
},{
    path: '/browse',
    element: <ShoppingList session={ session || null } />,
},
{
    path: '/item',
    element: <ShoppingItem session={ session || null } />
},
{
    path: '/cart',
    element: <ShoppingCart session={ session || null } />
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
