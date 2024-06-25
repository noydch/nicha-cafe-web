import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from '../views/home/Home';
import { Cart } from '../views/cart/Cart';
import { Payment } from '../views/payment/Payment';
import { History } from '../views/orderHistory/History';

export default function RouterPath() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '/:id',
            element: <Home />,
        },
        {
            path: '/cart',
            element: <Cart />
        },
        {
            path: '/payment',
            element: <Payment />
        },
        {
            path: '/history',
            element: <History />
        }
    ])
    return <RouterProvider router={router} />
}
