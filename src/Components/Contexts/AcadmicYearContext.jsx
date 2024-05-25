import React, { createContext, useCallback, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';

// Step 1: Create the context
const AcademicYearContext = createContext();

// Step 2: Define action types
const SET_ACADEMIC_YEARS = 'SET_ACADEMIC_YEARS';
const ADD_ACADEMIC_YEAR = 'ADD_ACADEMIC_YEAR';
const DELETE_ACADEMIC_YEAR = 'DELETE_ACADEMIC_YEAR';

// Step 3: Define reducer function
const academicYearReducer = (state, action) => {
  switch (action.type) {
    case SET_ACADEMIC_YEARS:
      return [...action.payload];
    case ADD_ACADEMIC_YEAR:
      return [...state,  action.payload];
    case DELETE_ACADEMIC_YEAR:
      return state.filter(year => year.id !== action.payload);
    default:
      return state;
  }
};

// Step 4: Create the custom hook
export const useAcademicYear = () => useContext(AcademicYearContext);
    
// Step 5: Create the context provider
export const AcademicYearProvider = ({ children }) => {
  const [academicYears, dispatch] = useReducer(academicYearReducer, []);

  // Fetch academic years data on component mount
  const fetchAcademicYears = useCallback(async () => {
    try {
      const res = await axios.get("https://optima-software-solutions.com/apis/academicyearsshow.php");
      dispatch({ type: SET_ACADEMIC_YEARS, payload: res.data });
    } catch (error) {
      console.error('Error fetching academic years:', error);
    }
  }, []);
  useEffect(() => {
    fetchAcademicYears();
  }, [fetchAcademicYears]);

  const addAcademicYear = async (newYear) => {
    try {
      const res = await axios.post("https://optima-software-solutions.com/apis/academicyearsadd.php", { name: newYear });
      dispatch({ type: ADD_ACADEMIC_YEAR, payload: res.data });
      fetchAcademicYears();

    } catch (error) {
      console.error('Error adding academic year:', error);
    }
  };

  const deleteAcademicYear = async (id) => {
    try {
      await axios.delete(`https://optima-software-solutions.com/apis/academicyearsdelete.php?id=${id}`);
      dispatch({ type: DELETE_ACADEMIC_YEAR, payload: id });
      fetchAcademicYears();
    } catch (error) {
      console.error('Error deleting academic year:', error);
    }
  };

  return (
    <AcademicYearContext.Provider value={{ academicYears,  addAcademicYear, deleteAcademicYear }}>
      {children}
    </AcademicYearContext.Provider>
  );
};
