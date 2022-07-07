import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from "react-router-dom";

import "./index.css"

import { StoreProvider } from 'easy-peasy';

import userStore from './userStore';
ReactDOM.createRoot(document.getElementById('root')).render(
  <StoreProvider store={userStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreProvider>
)
