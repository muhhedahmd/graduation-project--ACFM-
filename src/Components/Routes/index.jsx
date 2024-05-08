import { Navigate, useRoutes } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import UseAuth from "../Contexts/Authantication";
import MaterailPage from "../../Pages/MaterailPage/MaterailPage";
import ProfilePage from "../../Pages/ProfilePage";
import GenerateReport from "../../Pages/GenerateReport";
import CreateUser from "../../Pages/CreateUser";
import Mangeusers from "../../Pages/Mangeusers";
import OpenSemester from "../../Pages/OpenSemester/indes";
import Login from "../../Pages/Login/index";
import { ROUTE_PATHS } from "./Path";
import StaticalAndalalysis from "../../Pages/StaticalAndalalysis";
import ReportFileProvider from "../Contexts/ReportFileContext";
import AdminDashbord from "../../Pages/AdminDashbord";
import AssignCourses from "../../Pages/AssignCourses";
import { AcademicYearProvider } from "../Contexts/AcadmicYearContext";
import { UserProvider } from '../Contexts/UserContexts';
import { CourseProvider } from "../Contexts/CourseContexts";

export default function AppRouter() {
    const {Access} = UseAuth()
  const { isAuthenticated } = UseAuth();

  return useRoutes([
    {
      path: ROUTE_PATHS.Login,
      element: isAuthenticated  && Access === "admin"? (
          <Navigate to={ROUTE_PATHS.AdminDashboard} />
      ) : isAuthenticated  && Access !== "admin" ?
        <Navigate to={ROUTE_PATHS.LectureNotes} /> : 
        
        <Login />
      
    },
    {
      path: ROUTE_PATHS.Home,
      element: isAuthenticated ? (
        <ProtectedRoute />
      ) : (
        <Navigate to={ROUTE_PATHS.Login} />
      ),
      children: [
        { index: true, element: <MaterailPage /> },
        {
          path: ROUTE_PATHS.LectureNotes,
          element: <MaterailPage page={"lecture notes"} />,
        },
        { path: ROUTE_PATHS.Books, element: <MaterailPage page={"books"} /> },
        {
          path: ROUTE_PATHS.Attendance,
          element: <MaterailPage page="Attendance" />,
        },
        {
          path: ROUTE_PATHS.ExamsAndSolutions,
          element: <MaterailPage page="Exams and Solutions" />,
        },
        {
          path: ROUTE_PATHS.Assignments,
          element: <MaterailPage page="Assignments" />,
        },
        {
          path: ROUTE_PATHS.GenerateReport,
          element: (
            <>
              <ReportFileProvider>
                <GenerateReport page="GenerateReport" />
              </ReportFileProvider>
            </>
          ),
        },
        {
          path: ROUTE_PATHS.AdminFiles,
          element: <MaterailPage page="Admin files" />,
        },
        {
          path: ROUTE_PATHS.CreateUser,
          element:
          <UserProvider>

          <CreateUser page="Create User" />,
          </UserProvider>
        },
        {
          path: ROUTE_PATHS.ManageUsers,
          element: <Mangeusers page="Mange users" />,
        },
        {
          path: ROUTE_PATHS.OpenSemester,

          element: 
          <CourseProvider>

          <AcademicYearProvider>

          <OpenSemester page="OpenSemester" />,
          </AcademicYearProvider>
          </CourseProvider>
        },
        {
          path: ROUTE_PATHS.FinalExams,
          element: (
            <ReportFileProvider>
              <StaticalAndalalysis page="Final Exams" />
            </ReportFileProvider>
          ),
        },
        {
          path: ROUTE_PATHS.StudentSurvey,
          element: (
            <ReportFileProvider>
              <StaticalAndalalysis page="Student Survey" />
            </ReportFileProvider>
          ),
        },
        { path: ROUTE_PATHS.Profile, element: <ProfilePage page="profile" /> },
        { path: ROUTE_PATHS.AdminDashboard, element: <AdminDashbord page="Admin Dashboard" /> },
      
        { path: ROUTE_PATHS.AssignCourses, element: 
        <CourseProvider>

        <UserProvider>
        <AssignCourses page="Assign Courses" /> 
        </UserProvider>
        </CourseProvider>
        },
      ],
    },
    {
      path: "*",
      element: <h1>Page not found</h1>,
    },
  ]);
}
