import React, { createContext, useContext, useReducer } from "react";

// Define action types
export const SEMESTER_OPERATION = {
    IN_SEMESTER: "IN_SEMESTER",
    ADD_USER: "ADD_USER",
    ADD_USER_COURSE: "ADD_USER_COURSE",
}

// Define initial state
const initialState = {
    semesterName: "",
    users: [],
};

// Create context
const SemesterContext = createContext(initialState);

// Reducer function to handle state changes
const reducer = (state, action) => {
    switch (action.type) {
        case SEMESTER_OPERATION.IN_SEMESTER:
            return {
                ...state,
                semesterName: action.payload.semesterName
            };
        case SEMESTER_OPERATION.ADD_USER:
            const newUser = action.payload.user;
            if (!state.users.some(user => user.id === newUser.id)) {
                return {
                    ...state,
                    users: [...state.users, newUser]
                };
            }
            return state; // If user already exists, return current state
        case SEMESTER_OPERATION.ADD_USER_COURSE:
            const { userId, courses } = action.payload;
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === userId ? { ...user, courses } : user
                )
            };
        default:
            return state;
    }
};

// Semester context provider component
export const SemesterContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Action creators
    const inSemester = semesterName => {
        dispatch({
            type: SEMESTER_OPERATION.IN_SEMESTER,
            payload: { semesterName }
        });
    };

    const addUser = user => {
        dispatch({
            type: SEMESTER_OPERATION.ADD_USER,
            payload: { user }
        });
    };

    const addUserCourse = (userId, courses) => {
        dispatch({
            type: SEMESTER_OPERATION.ADD_USER_COURSE,
            payload: { userId, courses }
        });
    };

    // Provide state and actions through context
    return (
        <SemesterContext.Provider value={{ state, inSemester, addUser, addUserCourse }}>
            {children}
        </SemesterContext.Provider>
    );
};

// Custom hook to consume semester context
export const useSemester = () => {
    return useContext(SemesterContext);
};
