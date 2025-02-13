import React from 'react'
import MyNavbar from './assets/component/user/Navbar/MyNavbar'
import AuthLayout from './assets/layouts/AuthLayout';
import DashboardLayout from './assets/layouts/DashboardLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginScreen from './assets/pages/user/login/LoginScreen';
import RegisterScreen from './assets/pages/user/register/RegisterPage';
import Home from './assets/pages/user/Home/Home';
import Contact from './assets/pages/user/Contact/Contact';
import { ToastContainer, toast } from 'react-toastify';
import Products from './assets/pages/user/Products/Products';
import CategoryProducts from './assets/pages/user/Products/CategoryProducts';
import ProductDetails from './assets/pages/user/Products/ProductDetails';
import Cart from './assets/pages/user/Cart/Cart';
import ProtectedRoute from './assets/component/user/ProtectedRoute'
import AuthProtectedRoute from './assets/component/user/AuthProtectedRoute'
import UserLayout from './assets/layouts/UserLayout';
import CartContextProvider from './assets/component/user/context/CartContext'
import UserContextProvider from './assets/component/user/context/UserContext'
import Profile from './assets/pages/user/Profile/Profile'
import Info from './assets/pages/user/Profile/Info'
import Orders from './assets/pages/user/Profile/Orders'
import ForgotPass from './assets/pages/user/ForgotPassword/ForgotPass';
import ResetPass from './assets/pages/user/ForgotPassword/ResetPass';

export default function App() {

  const r = createBrowserRouter(
    [
      {
        path: '/auth',
        element:
          <AuthProtectedRoute>
            <AuthLayout />
          </AuthProtectedRoute>,
        children: [
          {
            path: 'login',
            element: <LoginScreen />
          },
          {
            path: 'register',
            element: <RegisterScreen />
          },
          {
            path: 'forgotPass',
            element: <ForgotPass />,
          },
          {
            path: 'resetPass/:userEmail',
            element: <ResetPass />
          }
        ]
      },
      {
        path: '/',
        element:
          <UserContextProvider>
            <CartContextProvider>
              <ProtectedRoute>
                <UserLayout />
              </ProtectedRoute>
            </CartContextProvider>
          </UserContextProvider>,
        children: [
          {
            path: 'home',
            element: <Home />
          },
          {
            path: '/',
            element: <Home />
          },
          {
            path: 'contact',
            element: <Contact />
          },
          {
            path: 'products',
            element: <Products />
          },
          {
            path: 'products/:productId',
            element: <ProductDetails />
          },
          {
            path: 'CategoryProduct/:categoryId',
            element: <CategoryProducts />
          },
          {
            path: 'cart',
            element: <Cart />
          },
          {
            path: 'profile',
            element: <Profile />,
            children: [
              {
                path: 'Information',
                element: <Info />
              },
              {
                path: 'Orders',
                element: <Orders />
              }
            ]
          }

        ]
      },
      {
        path: '/dashboard',
        element: <DashboardLayout />
      },
    ]
  );

  return (
    <>
      <UserContextProvider>
        <CartContextProvider>
          <ToastContainer />
          <RouterProvider router={r} />
        </CartContextProvider>
      </UserContextProvider>
    </>
  )
}
