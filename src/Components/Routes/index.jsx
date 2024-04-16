import { Navigate, useRoutes } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import UseAuth from "../Contexts/Authantication";
import MaterailPage from "../../Pages/MaterailPage/MaterailPage";
import StudentPage from "../../Pages/StudentPage";
import ProfilePage from "../../Pages/ProfilePage";
import GenerateReport from "../../Pages/GenerateReport";
import Adminfiles from "../../Pages/Adminfiles";
import CreateUser from "../../Pages/CreateUser";
import Mangeusers from "../../Pages/Mangeusers";
import OpenSemester from "../../Pages/OpenSemester/indes";
import Login from '../../Pages/Login/index'
import { ROUTE_PATHS } from "./Path";


export default function AppRouter() {
    const { isAuthenticated } = UseAuth();

    return useRoutes([
        {  
            path: ROUTE_PATHS.Login, 
            element: isAuthenticated ? <Navigate to={ROUTE_PATHS.Home} /> : <Login /> 
        },
        {
            path:  ROUTE_PATHS.Home,
            element: isAuthenticated ? <ProtectedRoute /> : <Navigate to={ROUTE_PATHS.Login} />,
            children: [
                { index: true, element: <MaterailPage /> },
                { path: ROUTE_PATHS.LectureNotes, element: <MaterailPage /> },
                { path: ROUTE_PATHS.Books, element: <MaterailPage /> },
                { path: ROUTE_PATHS.Attendance, element: <StudentPage page="Attendance" /> },
                { path: ROUTE_PATHS.Attendance, element: <StudentPage page="Attendance" /> },
                { path: ROUTE_PATHS.ExamsAndSolutions, element: <StudentPage page="Exams and Solutions" /> },
                { path: ROUTE_PATHS.Assignments, element: <StudentPage page="Assignments" /> },
                { path: ROUTE_PATHS.GenerateReport, element: <GenerateReport page="GenerateReport" /> },
                { path: ROUTE_PATHS.AdminFiles, element: <Adminfiles page="Adminfiles" /> },
                { path: ROUTE_PATHS.CreateUser, element: <CreateUser page="CreateUser" /> },
                { path: ROUTE_PATHS.ManageUsers, element: <Mangeusers page="Mangeusers" /> },
                { path: ROUTE_PATHS.OpenSemester, element: <OpenSemester page="OpenSemester" /> },
                { path: ROUTE_PATHS.Profile, element: <ProfilePage page="profile" /> },
            ]
        },
        {  
            path:   "*", 
            element:<h1>
                Page not found
            </h1>
        },
    ]);
}
