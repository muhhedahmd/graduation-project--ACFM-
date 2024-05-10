import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import UseAuth from './Authantication';

const CourseContext = createContext();

const SET_COURSES = 'SET_COURSES';
const ADD_COURSE = 'ADD_COURSE';
const DELETE_COURSE = 'DELETE_COURSE';
const EDIT_COURSE = 'EDIT_COURSE';

const courseReducer = (state, action) => {
  switch (action.type) {
    case SET_COURSES:
      return action.payload;
    case ADD_COURSE:
      return [...state, action.payload];
    case DELETE_COURSE:
      return state.filter(course => course.courseid !== action.payload);
    case EDIT_COURSE:
      return state.map(course =>
        course.courseid === action.payload.id ? { ...course, ...action.payload.courseData } : course
      );
    default:
      return state;
  }
};

// Step 4: Create the custom hook
export const useCourseContext = () => useContext(CourseContext);
    
// Step 5: Create the context provider
export const CourseProvider = ({ children }) => {
  const {Data} = UseAuth()
  const [courses, dispatch] = useReducer(courseReducer, []);

  
  const fetchCourses = async () => {
    try {
      const res = await axios.get(`https://optima-software-solutions.com/apis/courseshow.php?userid=${Data.user.id}`);
      dispatch({ type: SET_COURSES, payload: res.data });
    } catch (error) {
      console.log('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const addCourse = async (newCourse) => {
    console.log(newCourse)
    try {
      const res = await axios.post("https://optima-software-solutions.com/apis/courseadd.php", newCourse);
      dispatch({ type: ADD_COURSE, payload: res.data });
      fetchCourses();
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  // Function to delete a course
  const deleteCourse = async (courseId) => {
    console.log(courseId)
    try {
      await axios.delete(`https://optima-software-solutions.com/apis/coursedelete.php?courseid=${courseId}`);
      dispatch({ type: DELETE_COURSE, payload: courseId });
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  // Function to edit a course
  const editCourse = async (courseId, courseData) => {
    try {
      await axios.put(`https://optima-software-solutions.com/apis/courseedit.php?courseid=${courseId}`, qs.stringify(courseData));
      dispatch({ type: EDIT_COURSE, payload: { id: courseId, courseData } });
      fetchCourses();
    } catch (error) {
      console.error('Error editing course:', error);
    }
  };
  const [MainDrawerCourse ,SetMainDrawerCourse] = useState({})

  const SelectedCourse =  (course) => SetMainDrawerCourse(course)
  console.log(courses)

  
  return (
    <CourseContext.Provider value={{ courses, SelectedCourse , MainDrawerCourse  , addCourse, deleteCourse, editCourse }}>
      {children}
    </CourseContext.Provider>
  );
};