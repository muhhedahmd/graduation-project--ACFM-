import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ViewedFileContextProvider } from './Components/Contexts/viewedFileContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
<ViewedFileContextProvider>
    <App />
</ViewedFileContextProvider>
  </BrowserRouter>
);


