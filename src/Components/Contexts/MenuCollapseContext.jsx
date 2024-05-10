// MenuCollapseContext.js
import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { MainDrawerData } from "../Components/Data/Data";
import UseAuth from "../Components/Contexts/Authantication";

const MenuCollapseContext = createContext();

export const useMenuCollapseContext = () => useContext(MenuCollapseContext);

export const MenuCollapseProvider = ({ children }) => {
  const { Access } = UseAuth();

  const initialState = useMemo(() => {
    return MainDrawerData.reduce((acc, item) => {
      acc[item.Ttitle.split(" ").join("-")] = false;
      return acc;
    }, {});
  }, []);

  const [collapse, setCollapse] = useState({ ...initialState });

  const filteredItems = useMemo(() => {
    return MainDrawerData.filter(
      (item) => item.roles.includes(Access) || !item.roles
    );
  }, [Access]);

  useEffect(() => {
    return () => {
      // Cleanup function to reset state when component unmounts
      setCollapse(initialState);
    };
  }, [initialState]);

  return (
    <MenuCollapseContext.Provider value={{ collapse, setCollapse, filteredItems }}>
      {children}
    </MenuCollapseContext.Provider>
  );
};
