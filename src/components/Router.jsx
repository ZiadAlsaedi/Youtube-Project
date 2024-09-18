import React from 'react'
import Home from './Home';
import Sidebar from './Sidebar';
import Video from './Video';
import Signup from './Signup';
import SearchResults from './SearchResults';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom"
  
  
  const router = createBrowserRouter([
    {
      path: "/Home",
      element: <Home/>
    },
    {
      path: "/",
      element: <Signup/>
    },
    {
      path: "/Video/:id",
      element: <Video/>
    },
    {
        path: "Sidebar",
        element: <Sidebar/>
      },
      {
        path: "/search",
        element: <SearchResults/>
      },
   
    
  ]);
const Router = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default Router