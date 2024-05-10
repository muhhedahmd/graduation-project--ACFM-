import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ViewedFileContextProvider } from './Components/Contexts/viewedFileContext';
import { ImageProvider } from './Components/Contexts/ImageViewrContex';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
<ViewedFileContextProvider>
<ImageProvider>

    <App />

</ImageProvider>
</ViewedFileContextProvider>
  </BrowserRouter>
);


