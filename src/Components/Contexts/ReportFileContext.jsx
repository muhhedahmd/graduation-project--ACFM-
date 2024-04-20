import React, { createContext, useReducer } from "react";
import { useContext } from "react";

const ReportFileContext = createContext(null);

export const FILE_OPERATION = {
  UPLOAD_FILE: "UPLOAD_FILE",
  DELETE_FILE: " DELETE_FILE",
};

const DEFAULT_STATE = {
  StaticalFiles: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case FILE_OPERATION.UPLOAD_FILE:
      console.log(state);
      const blob = new Blob([action.payload.file], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      return {
        ...state,
        StaticalFiles: [
          ...state.StaticalFiles,
          {
            file: action.payload.file,
            type: action.payload.Type,
            id: action.payload.id,
            url: url,
            Description: action.payload.Description,
          },
        ],
      };

    case FILE_OPERATION.DELETE_FILE:
      return {
        ...state,
        StaticalFiles: state.StaticalFiles.filter(
          (item) => item.id !== action.payload.id
        ),
      };

    default:
      return state;
  }
};

const ReportFileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  const uploadFile = (file, id, Type) => {
    dispatch({
      type: FILE_OPERATION.UPLOAD_FILE,
      payload: { file: file, Type: Type, id: id },
    });
  };
  const DeleteFile = (id) => {
    dispatch({
      type: FILE_OPERATION.DELETE_FILE,
      payload: { id: id },
    });
  };

  return (
    <ReportFileContext.Provider
      value={{
        state,
        uploadFile,
        DeleteFile,
      }}
    >
      {children}
    </ReportFileContext.Provider>
  );
};

export default ReportFileProvider;

export const useReportFiles = () => useContext(ReportFileContext);
