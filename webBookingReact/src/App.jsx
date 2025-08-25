import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home';
import List from './pages/hotelLists/List';
import HotelInfo from './pages/hotelPage/hotelInfo'; 
import Login from './pages/login/Login';
// Import ToastContainer and styles
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: '/',
    element:<Home />
  },
  {
    path: '/hotels',
    element:<List/>
  },
  {
    path: '/hotels/:id',
    element:<HotelInfo/>
  },
  {
    path: 'login',
    element:<Login/>
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      {/* Add ToastContainer */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default App
