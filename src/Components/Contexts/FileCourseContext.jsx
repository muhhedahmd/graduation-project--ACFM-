import axios from "axios";
import { useCallback } from "react";
import { createContext, useContext,  useReducer, useState } from "react";

export const FILE_OPERATION = {
  UPLOAD_FILE: "UPLOAD_FILE",
  UPLOAD_FILE_ANOTHER_USER: "UPLOAD_FILE_ANOTHER_USER",
  SET_FILES: "SET_FILES",
};

const DEFAULT_STATE = {
  uploadedFiles: [], 

};


const FileContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case FILE_OPERATION.UPLOAD_FILE:
      return {
        ...state,
        uploadedFiles: [
      
          action.payload 
        ]
      };
    case FILE_OPERATION.SET_FILES:
      return {
        ...state,
        uploadedFiles: [
      
          ...action.payload 
        ]
      };
    default:
      return state;
  }
};

export const FileContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);
  
  const [progressContext ,setProgressContext] = useState()

  const FetchFilesOFCatagory = async (userid , courseid , category) => {
   console.log(userid , courseid , category)
    try {
      const res = await axios.post(`http://optima-software-solutions.com/apis/filesshow.php`, {
        
          userid: userid,
          courseid: courseid,
          category: category
        
      });
      dispatch({ type: FILE_OPERATION.SET_FILES, payload: res.data });
} catch (error) {
      console.error('Error fetching files:', error);
    }
  };


  const FetchAlldilesofCourses = useCallback( async (users, courseid, category) => {
    try {
      const promises = users.map(async (item) => {
        const res = await axios.post(`http://optima-software-solutions.com/apis/filesshow.php`, {
          userid: item.id,
          courseid: courseid,
          category: category
        });
      
        return res.data; 
      });
      const results = await Promise.all(promises);
      const flattenedData = results.reduce((acc, curr) => acc.concat(curr), []); // Fl
      dispatch({ type: FILE_OPERATION.SET_FILES, payload: flattenedData });
    } catch (error) {
      console.log('Error fetching files:', error);
    }
  } , [])    
  
  const uploadFile = async (file, description, userId, courseId, category) => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('courseId', courseId);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('files[]', file);
    try {
      await axios.post(
        'http://optima-software-solutions.com/apis/uploadfile.php',
        formData,
        { 
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            setProgressContext(progress);
          }
        }
      );
      console.log("progressContext" , progressContext)
      dispatch({
        type: FILE_OPERATION.UPLOAD_FILE,
        payload: { file, description },
      });
      alert("Uploaded Successfully");
      FetchFilesOFCatagory(userId, courseId, category);
  
    } catch (error) {
      console.error('Error uploading file:', error.response.data); 
    }
  };
  return (
    <FileContext.Provider value={{  FetchAlldilesofCourses, progressContext, uploadFile, FetchFilesOFCatagory, state }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => {
  return useContext(FileContext);
};
