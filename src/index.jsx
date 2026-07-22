import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Game from './game';
import Rtsim from './rtsim';
import Home from './home';
const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Home />,
  },
  {
    path: "/game",
    element: <Game />,
    errorElement: <Game />,
  },
  {
    path: "/rtsim",
    element: <Rtsim />,
    errorElement: <Rtsim />,
  },
])


root.render(
  <React.StrictMode>
    <App >
      <RouterProvider router={router} />
    </App>
  </React.StrictMode>
);
