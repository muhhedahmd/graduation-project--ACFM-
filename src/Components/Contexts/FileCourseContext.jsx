import axios from "axios";
import { createContext, useContext,  useReducer, useState } from "react";

export const FILE_OPERATION = {
  UPLOAD_FILE: "UPLOAD_FILE",
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
         { ...state.uploadedFiles },
         {...action.payload}
         
        ],
      };
    case FILE_OPERATION.SET_FILES:
      return {
        ...state,
        uploadedFiles: action.payload,
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
      const res = await axios.post(`https://optima-software-solutions.com/apis/filesshow.php`, {
        
          userid: userid,
          courseid: courseid,
          category: category
        
        
      });
      dispatch({ type: FILE_OPERATION.SET_FILES, payload: res.data });
} catch (error) {
      console.error('Error fetching files:', error);
    }
  };


  const uploadFile = async (file, description, userId, courseId, category) => {
    console.log(file, description, userId, courseId, category)
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('courseId', courseId);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('files[]', file);
    try {
     const res = await axios.post(
        'https://optima-software-solutions.com/apis/uploadfile.php',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } },
       { onUploadProgress: (progressEvent) => {
                  const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                  setProgressContext(progress)
                },}
      );
      dispatch({
        type: FILE_OPERATION.UPLOAD_FILE,
        payload: { file, description },
      });
      alert("Uploaded Successfully")
      console.log(state)
      FetchFilesOFCatagory(userId , courseId, category)
    } catch (error) {
      console.error('Error uploading file:', error.response.data); 
    }
  };


  return (
    <FileContext.Provider value={{ progressContext, uploadFile, FetchFilesOFCatagory, state }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => {
  return useContext(FileContext);
};
