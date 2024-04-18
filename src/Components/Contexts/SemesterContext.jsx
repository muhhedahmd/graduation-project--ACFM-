import React, { createContext, useContext, useReducer } from 'react';

// Step 1: Create the context
const SemesterContext = createContext();

// Step 2: Define action types
const SET_SEMESTER_DATA = 'SET_SEMESTER_DATA';

const semesterReducer = (state, action) => {
    switch (action.type) {
      case SET_SEMESTER_DATA:
  console.log('reducer', state);
  const { Semester, year, courses } = action.payload;

  // Check if the semester and year combination already exists in the state
  const existingIndex = state.findIndex(entry => entry.Semester === Semester && entry.year === year);

  if (existingIndex !== -1) {
    // If the semester and year combination already exists, update the courses
    return state.map((entry, index) => {
      if (index === existingIndex) {
        // Update the courses for the existing semester and year
        return {
          ...entry,
          courses: courses
        };
      }
      return entry;
    });
  } else {
    // If it's a new semester and year combination, add it to the state
    return [
      ...state,
      {
        Semester: Semester,
        year: year,
        courses: courses
      }
    ];
  }
        
      default:
        return state;
    }
  };
  

// Step 4: Create the custom hook
export const useSemester = () => useContext(SemesterContext);

// Step 5: Create the context provider
export const SemesterProvider = ({ children }) => {
  const [semesterState, dispatch] = useReducer(semesterReducer, []);

  // Function to update semester data
  const setSemesterData = (newSemesterData) => {
    dispatch({ type: SET_SEMESTER_DATA, payload: newSemesterData });
  };

  return (
    <SemesterContext.Provider value={{ semesterState, setSemesterData }}>
      {children}
    </SemesterContext.Provider>
  );
};
