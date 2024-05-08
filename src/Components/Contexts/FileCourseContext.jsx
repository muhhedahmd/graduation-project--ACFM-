import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";

export const FILE_OPERATION = {
  UPLOAD_FILE: "UPLOAD_FILE",
  DELETE_FILE: "DELETE_FILE",
  FETCH_FILES: "FETCH_FILES",
};

const DEFAULT_STATE = {
  uploadedFiles: [],
};

const FileContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case FILE_OPERATION.UPLOAD_FILE:
      const { file, id, description, userId, courseId, category } = action.payload;
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('courseId', courseId);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('file', file);

      (async () => {
        try {
          const response = await axios.post(
            'https://optima-software-solutions.com/apis/uploadfile.php',
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
          );
          console.log(response.data); 
        } catch (error) {
          console.error('Error:', error.response.data); 
        }
      })();

      const blob = new Blob([file], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      return {
        ...state,
        uploadedFiles: [
          ...state.uploadedFiles,
          { file, id, url, description }
        ],
      };

    case FILE_OPERATION.DELETE_FILE:
      return {
        ...state,
        uploadedFiles: state.uploadedFiles.filter(item => item.id !== action.payload.id),
      };

    case FILE_OPERATION.FETCH_FILES:
      return {
        ...state,
        uploadedFiles: action.payload.files,
      };

    default:
      return state;
  }
};

export const FileContexsstProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  const uploadFile = (file, id, description, userId, courseId, category) => {
    dispatch({
      type: FILE_OPERATION.UPLOAD_FILE,
      payload: { file, id, description, userId, courseId, category },
    });
  };

  const deleteFile = (id) => {
    dispatch({
      type: FILE_OPERATION.DELETE_FILE,
      payload: { id },
    });
  };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const { userId, courseId, category } = DEFAULT_STATE;
        const response = await axios.post(
          'https://optima-software-solutions.com/apis/filesshow.php',
          { userId, courseId, category }
        );
        dispatch({
          type: FILE_OPERATION.FETCH_FILES,
          payload: { files: response.data },
        });
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };
    fetchFiles();
  }, []);

  return (
    <FileContext.Provider value={{ uploadFile, deleteFile, state }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFileContexts = () => {
  return useContext(FileContext);
};
