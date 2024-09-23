import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import Main from '../layouts/Main';
import Register from '../components/Register/Register';
import Home from '../components/Home/Home';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        // {
        //     path: "/",
        //     element: <Home />
        // },  
        {
              path: "/registration",
              element: <Register />
          }
      ]
    },
  ]);
  
  export default router;