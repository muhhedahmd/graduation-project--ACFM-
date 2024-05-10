import React, { createContext, useContext, useReducer } from 'react';

// Step 1: Create the context
const SemesterContext = createContext();

// Step 2: Define action types
const SET_SEMESTER_DATA = 'SET_SEMESTER_DATA';

const semesterReducer = (state, action) => {
    switch (action.type) {
      case SET_SEMESTER_DATA:
 
    return state       
      default:
        return state;
    }
  };
  

// Step 4: Create the custom hook
export const useCourseOperation = () => useContext(SemesterContext);

export const SemesterProvider = ({ children }) => {
  const [semesterState, dispatch] = useReducer(semesterReducer, []);

  const setSemesterData = (newSemesterData) => {
    dispatch({ type: SET_SEMESTER_DATA, payload: newSemesterData });
  };

  return (
    <SemesterContext.Provider value={{ semesterState, setSemesterData }}>
      {children}
    </SemesterContext.Provider>
  );
};
