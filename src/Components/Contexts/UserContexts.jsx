import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import qs from 'qs'

const UserContext = createContext();

const SET_USERS = 'SET_USERS';
const ADD_USER = 'ADD_USER';
const DELETE_USER = 'DELETE_USER';
const EDIT_USER = 'EDIT_USER';

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

export const useUserContext = () => useContext(UserContext);
    
export const UserProvider = ({ children }) => {
  const [users, dispatch] = useReducer(userReducer, []);

  const fetchUsers = async () => {
    setloader(true)

    try {
      const res = await axios.get("https://optima-software-solutions.com/apis/usershow.php?id=2&access=admin");
      dispatch({ type: SET_USERS, payload: res.data });
      setloader(false)
      
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    setloader(false)
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const [loader ,setloader] = useState(false)
  const addUser = async (newUser) => {
    setloader(true)
    try {
      const res = await axios.post("https://optima-software-solutions.com/apis/useradd.php", newUser);
      dispatch({ type: ADD_USER , payload: res.data });
      fetchUsers();
      setloader(false)
      alert("user is Added successfully")
    } catch (error) {
      console.log('Error adding user:', error);
      setloader(false)
    }
  };

  const deleteUser = async (id) => {
    console.log(id)
    try {
      await axios.delete(`https://optima-software-solutions.com/apis/userdelete.php?id=${id}`);
      dispatch({ type: DELETE_USER, payload: id });
      alert('user is Delte sucessfully')
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const editUser = async (id, formData) => {
    setloader(true)
    try {
      
      await axios.post(
        "https://optima-software-solutions.com/apis/useredit.php",
        qs.stringify(formData),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          
        }
      );
      dispatch({ type: EDIT_USER, payload: { id, formData } });
      fetchUsers();
      setloader(false)
      alert("user updated successfully")
    } catch (error) {
      setloader(false)
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
