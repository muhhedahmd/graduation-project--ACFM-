import React, { createContext, useContext, useReducer } from "react";

// Initial state for user context
const initialUserState = [];

// Action types
const SET_USER_DATA = "SET_USER_DATA";

// Reducer function for user context
const userReducer = (state, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      const { userData } = action.payload;
      console.log(state)
      const existingUserIndex = state.findIndex(
        (user) => user.email === userData.email
      );

      if (existingUserIndex !== -1) {
        // If the user already exists, update the user data
        return state.map((user, index) => {
          if (index === existingUserIndex) {
            return userData;
          }
          return user;
        });
      } else {
        // If it's a new user, add it to the state
        return [...state, userData];
      }
    default:
      return state;
  }
};

// Create the user context
const UserContext = createContext(null);

// User context provider component
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);
  const setUserData = (userData) => {
    dispatch({

        type: SET_USER_DATA,
        payload: { userData },
    })
  }
 
  return (
    <UserContext.Provider value={{ setUserData, state }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUserContext = () => useContext(UserContext);

// Action creator function to set user data
