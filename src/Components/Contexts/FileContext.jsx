import axios from "axios";
import { createContext, useContext, useReducer } from "react";

export const FILE_OPERATION = {
  UPLOAD_FILE: "UPLOAD_FILE",
  DELETE_FILE: " DELETE_FILE",
};

const DEFAULT_STATE = {
  uploadedFiles: [],
};

const FileContext = createContext(null);

// let currentDate = new Date();

// // Extract individual components
// let year = currentDate.getFullYear();
// let month = currentDate.getMonth() + 1; // Month is 0-indexed, so we add 1
// let day = currentDate.getDate();
// let hours = currentDate.getHours();
// let minutes = currentDate.getMinutes();
// let seconds = currentDate.getSeconds();

// Format the date and time string
// let formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

const reducer = (state, action) => {
  switch (action.type) {
    case FILE_OPERATION.UPLOAD_FILE:
        const { file, description, userId, courseId, category } = action.payload;
        (async () => {
            try {
              const formData = new FormData();

              formData.append('userId', userId);
              formData.append('courseId', courseId);
              formData.append('category', category);
              formData.append('description', description);
              formData.append('file', file);
    
              const response = await axios.post(
                'https://optima-software-solutions.com/apis/uploadfile.php',
                    formData,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                }
              );
              console.log(response.data); 
    
            } catch (error) {
              console.error('Error:', error.response.data); 
            }
          })();

      const blob = new Blob([action.payload.file], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      return {
        ...state,
        uploadedFiles: [
          ...state.uploadedFiles,
          {
            file: action.payload.file,
            id: action.payload.id,
            url: url,
            Description: action.payload.Description,
          },
        ],
      };

    case FILE_OPERATION.DELETE_FILE:
      return {
        ...state,
        uploadedFiles: state.uploadedFiles.filter(
          (item) => item.id !== action.payload.id
        ),
      };

    default:
      return state;
  }
};

export const FileContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  const uploadFile = (file, id, description, userId, courseId, category) => {
    dispatch({
      type: FILE_OPERATION.UPLOAD_FILE,
      payload: { file, id, description, userId, courseId, category },
    });
  };
  const DeleteFile = (id) => {
    dispatch({
      type: FILE_OPERATION.DELETE_FILE,
      payload: { id: id },
    });
  };

  return (
    <FileContext.Provider value={{ uploadFile, state, DeleteFile }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFile = () => {
  return useContext(FileContext);
};
