import { createContext, useContext, useReducer } from "react";

export const FILE_OPERATION = {
    UPLOAD_FILE: "UPLOAD_FILE"
}

const DEFAULT_STATE = {
    uploadedFiles: []
};

const FileContext = createContext(null);

const reducer = (state, action) => {
    
 
    switch (action.type) {
        case FILE_OPERATION.UPLOAD_FILE:

        const blob = new Blob([action.payload.file ], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);


            return {
                ...state,
                uploadedFiles: [...state.uploadedFiles, {file:action.payload.file  , id:action.payload.id , url:url}]
            };
        default:
            return state;
    }
}

export const FileContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

    const uploadFile = (file ,id) => {
        dispatch({
            type: FILE_OPERATION.UPLOAD_FILE,
            payload: { file:file  , id:id}
        });
    };

    return (
        <FileContext.Provider value={{ uploadFile, state }}>
            {children}
        </FileContext.Provider>
    );
}

export const useFile = () => {
    return useContext(FileContext);
}
