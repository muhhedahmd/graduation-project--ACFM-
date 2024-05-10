import React, { useState, useContext } from 'react';

// 1. Create a Context
const ImageContext = React.createContext();

// 2. Provider Component
export const ImageProvider = ({ children }) => {
  const [showImage, setShowImage] = useState(false);

  return (
    <ImageContext.Provider value={{ showImage, setShowImage }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImage = () => useContext(ImageContext);
