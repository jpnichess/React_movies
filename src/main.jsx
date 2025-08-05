import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import "./index.css";
import MoviePage from "./components/Pages/MoviePage";



const router = createBrowserRouter([
{
  path: "/",
  element: <App />,
},
{
  path: '/movie',
  element: <MoviePage />
}
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
  

