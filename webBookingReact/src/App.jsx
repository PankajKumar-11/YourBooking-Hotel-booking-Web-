
import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home';
import List from './pages/hotelLists/List';
import HotelInfo from './pages/hotelPage/hotelInfo'; 
import Login from './pages/login/Login';


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
   <RouterProvider router={router} />
  )
}

export default App
