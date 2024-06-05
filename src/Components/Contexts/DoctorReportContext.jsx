import React, { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useCourseContext } from './CourseContexts';

// Create the context
const DoctorReportContext = createContext();

// Define action types
const SET_REPORTS = 'SET_REPORTS';
const ADD_REPORT = 'ADD_REPORT';
const DELETE_REPORT = 'DELETE_REPORT';
const EDIT_REPORT = 'EDIT_REPORT';

// Reducer function
const doctorReportReducer = (state, action) => {
  switch (action.type) {
    case SET_REPORTS:
      return action.payload;
    case ADD_REPORT:
      return [...state, action.payload];
    case DELETE_REPORT:
      return state.filter(report => report.id !== action.payload);
    case EDIT_REPORT:
      return state.map(report =>
        report.id === action.payload.id ? { ...report, ...action.payload.reportData } : report
      );
    default:
      return state;
  }
};

// Custom hook to access the context
export const useDoctorReportContext = () => useContext(DoctorReportContext);

// Provider component
export const DoctorReportProvider = ({ children }) => {
  const [reports, dispatch] = useReducer(doctorReportReducer, []);

  // Fetch all reports
  const fetchReports = useCallback(async () => {
    try {
      const res = await axios.get('https://optima-software-solutions.com/apis/doctorreportshow.php');
      dispatch({ type: SET_REPORTS, payload: res.data });
    } catch (error) {
      console.log('Error fetching reports:', error);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  // Add a new report
  const addReport = async (newReport) => {
    try {
      const res = await axios.post('https://optima-software-solutions.com/apis/doctorreportadd.php', newReport);
      dispatch({ type: ADD_REPORT, payload: res.data });

      fetchReports();
      alert("report is Added sucessfully")
    } catch (error) {
      console.error('Error adding report:', error);
    }
  };

  // Edit an existing report
  const editReport = async (reportId, reportData) => {
    console.log(reportData)
    try {
      await axios.put(`https://optima-software-solutions.com/apis/doctorreportedit.php`, qs.stringify(reportData));
      alert("Report is updated")
      fetchReports();
      dispatch({ type: EDIT_REPORT, payload: { id: reportId, reportData } });
    } catch (error) {
      console.log('Error editing report:', error);
    }
  };

  // Delete a report
  const deleteReport = async (reportId) => {
    try {
      await axios.delete(`https://optima-software-solutions.com/apis/doctorreportdelete.php?id=${reportId}`);
      dispatch({ type: DELETE_REPORT, payload: reportId });
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };
  const [singleReport , setSingleReport ]  = useState({})
  const {MainDrawerCourse} =useCourseContext

  const  GetSingleReport = useCallback( ()=>{
    const SCourseRep = reports.filter((rep) => rep.courseid === MainDrawerCourse?.courseid);
    if (SCourseRep.length > 0) {
      setSingleReport(SCourseRep[0]);
    } else {
      setSingleReport(SCourseRep);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [MainDrawerCourse?.courseid]


) 



  return (
    <DoctorReportContext.Provider value={{ reports,  GetSingleReport , singleReport,  addReport, editReport, deleteReport }}>
      {children}
    </DoctorReportContext.Provider>
  );
};
