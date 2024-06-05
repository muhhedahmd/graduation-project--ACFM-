import React, { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react';
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

export const useCourseContext = () => useContext(CourseContext);
    
export const CourseProvider = ({ children }) => {
  const [AllCourses , setAllCourses] = useState([])
  const {Data} = UseAuth()
  const [courses, dispatch] = useReducer(courseReducer, []);

  
  const fetchAllCourses = async () => {
    try {
      const res = await axios.get(`https://optima-software-solutions.com/apis/courseshowall.php`);
      const coursesWithChecked = res.data.map(course => ({
        ...course,
        checked: false,
      }));
      setAllCourses(coursesWithChecked);
      console.log(coursesWithChecked)
    } catch (error) {
      console.log('Error fetching courses:', error);
    }
  };


  const fetchCourses = useCallback(async () => {
    try {
      const res = await axios.get(`https://optima-software-solutions.com/apis/courseshow.php?userid=${Data.user.id}`);
      dispatch({ type: SET_COURSES, payload: res.data });
    } catch (error) {
      console.log('Error fetching courses:', error);
    }
  },[Data?.user?.id]);

  useEffect(() => {
    fetchAllCourses()
    fetchCourses();
  }, [fetchCourses]);

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

const [EditLoader , setEditLoader  ] =useState(false)

  const editCourse = async (courseId, courseData) => {
    setEditLoader(true)
    try {
      await axios.put(`https://optima-software-solutions.com/apis/courseedit.php?courseid=${courseId}`, qs.stringify(courseData));
      dispatch({ type: EDIT_COURSE, payload: { id: courseId, courseData } });
      alert("Course is updated ")
      console.log( courseId, courseData)
      SetMainDrawerCourse({...courseData ,


        gradeA :courseData.A,
        gradeB:  courseData.B,
        gradeC: courseData.C,
        gradeD : courseData.D,
      })
      setEditLoader(false)
    } catch (error) {
      setEditLoader(false)
      console.error('Error editing course:', error);
    }
  };

  const [MainDrawerCourse ,SetMainDrawerCourse] = useState({})

  const SelectedCourse =  (course) => SetMainDrawerCourse(course)
  

  
  return (
    <CourseContext.Provider value={{AllCourses  , fetchCourses,  SetMainDrawerCourse,  EditLoader, fetchAllCourses,  courses, SelectedCourse , MainDrawerCourse  , addCourse, editCourse }}>
      {children}
    </CourseContext.Provider>
  );
};