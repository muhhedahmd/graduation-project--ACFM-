import React, { createContext, useContext, useState } from 'react';

const ViewFileContext = createContext(null);

export const ViewedFileContextProvider = ({ children }) => {
  const [viewFile, setViewFile] = useState(null);

  return (
    <ViewFileContext.Provider value={{ viewFile, setViewFile }}>
      {children}
    </ViewFileContext.Provider>
  );
};

export const UseView = () => useContext(ViewFileContext);
