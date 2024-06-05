import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';

// Step 1: Create the context
const UserContext = createContext();

// Step 2: Define action types
const SET_USERS = 'SET_USERS';
const ADD_USER = 'ADD_USER';
const DELETE_USER = 'DELETE_USER';
const EDIT_USER = 'EDIT_USER';

// Step 3: Define reducer function
const userReducer = (state, action) => {
  switch (action.type) {
    case SET_USERS:
      return action.payload.map(user => ({ ...user, checked: false }));
    case ADD_USER:
      return [...state, action.payload];
    case DELETE_USER:
      return state.filter(user => user.id !== action.payload);
    case EDIT_USER:
      return state.map(user =>
        user.id === action.payload.id ? { ...user, ...action.payload.userData } : user
      );
    default:
      return state;
  }
};

// Step 4: Create the custom hook
export const useUserContext = () => useContext(UserContext);
    
export const UserProvider = ({ children }) => {
  const [users, dispatch] = useReducer(userReducer, []);

  // Fetch users data on component mount
  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://optima-software-solutions.com/apis/usershow.php?id=2&access=admin");
      dispatch({ type: SET_USERS, payload: res.data });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const [loader ,setloader] = useState(false)
  // Function to add a new user
  const addUser = async (newUser) => {
    setloader(true)
    try {
      const res = await axios.post("https://optima-software-solutions.com/apis/useradd.php", newUser);
      dispatch({ type: ADD_USER, payload: res.data });
      fetchUsers();
      setloader(false)
    } catch (error) {
      console.error('Error adding user:', error);
      setloader(false)
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://optima-software-solutions.com/apis/userdelete.php?id=${id}`);
      dispatch({ type: DELETE_USER, payload: id });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const editUser = async (id, userData) => {
    try {
      await axios.put(`https://optima-software-solutions.com/apis/useredit.php?id=${id}`, userData);
      dispatch({ type: EDIT_USER, payload: { id, userData } });
      fetchUsers();
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  return (
    <UserContext.Provider value={{
      loader,
       users, fetchUsers,  addUser, deleteUser, editUser }}>
      {children}
    </UserContext.Provider>
  );
};
