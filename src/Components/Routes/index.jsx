import { Navigate, useRoutes } from "react-router-dom"
import { PATHS } from "./Path";

import ProtectedRoute from "../ProtectedRoute";
import Home from "../../Pages/Home";
import Login from "../../Pages/Login";
import UseAuth from "../Contexts/Authantication";
import MaterailPage from "../../Pages/MaterailPage/MaterailPage";
import StudentPage from "../../Pages/StudentPage";
import ProfilePage from "../../Pages/ProfilePage";
import GenerateReport from "../../Pages/GenerateReport";
import Adminfiles from "../../Pages/Adminfiles";
import CreateUser from "../../Pages/CreateUser";
import Mangeusers from "../../Pages/Mangeusers";
import OpenSemester from "../../Pages/OpenSemester/indes";

export default function AppRouter(){
    const {isAuthenticated}= UseAuth()


    return useRoutes([
        {  path: PATHS.Login, element: isAuthenticated ? <Navigate to={"/LectureNotes"} /> : <Login /> },
        {
      path:  "/",
      element: isAuthenticated ? <ProtectedRoute /> : <Navigate  to={PATHS.Login} />,
      children: [
        { index: true, element: <MaterailPage /> },

        { path:"LectureNotes" , element:<MaterailPage/>},
        { path:"Books" , element:<MaterailPage/>},

        { path: 'Attendnce', element: <StudentPage page="Attendance" /> },
        { path: 'ExamsandSolution', element: <StudentPage page="Exams and Solutions" /> },
        { path: 'Assignments', element: <StudentPage page="Assignments" /> },


        { path:'GenerateReport', element:<GenerateReport page="GenerateReport" /> },
        { path: 'Adminfiles',    element: <Adminfiles page="Adminfiles" /> },
        { path: 'CreateUser',   element: <CreateUser page="CreateUser" /> },
        { path: 'Mangeusers', element: <Mangeusers page="Mangeusers" /> },
        { path: 'OpenSemester', element: <OpenSemester page="OpenSemester" /> },
        
        { path: 'profile', element: <ProfilePage page="profile" /> },


        ]
    },
]);


}
