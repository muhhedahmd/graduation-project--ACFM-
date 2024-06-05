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
import AdminDashbord from "../../Pages/AdminDashbord";
import AssignCourses from "../../Pages/AssignCourses";
import { AcademicYearProvider } from "../Contexts/AcadmicYearContext";
import { UserProvider } from "../Contexts/UserContexts";
import { CourseProvider } from "../Contexts/CourseContexts";
import { FileContextProvider } from "../Contexts/FileCourseContext";
import { DoctorReportProvider } from "../Contexts/DoctorReportContext";

export default function AppRouter() {
  const { Access } = UseAuth();
  const { isAuthenticated } = UseAuth();

  return useRoutes([
    {
      path: ROUTE_PATHS.Login,
      element:
        isAuthenticated && Access === "Admin" ? (
          <Navigate to={ROUTE_PATHS.AdminDashboard} />
        ) : isAuthenticated && Access !== "Admin" ? (
          <Navigate to={ROUTE_PATHS.LectureNotes} />
        ) : (
          <Login />
        ),
    },
    {
      path: ROUTE_PATHS.Home,
      element: isAuthenticated ? (
        <ProtectedRoute />
      ) : (
        <Navigate to={ROUTE_PATHS.Login} />
      ),
      children: [
        {
          index: true,
          element: (
            <FileContextProvider>
              <MaterailPage />
            </FileContextProvider>
          ),
        },
        {
          path: ROUTE_PATHS.LectureNotes,
          element: <MaterailPage page={"lecture notes"} />,
        },
        {
          path: ROUTE_PATHS.Books,
          element: (
            <FileContextProvider>
              <MaterailPage page={"books"} />
            </FileContextProvider>
          ),
        },
        {
          path: ROUTE_PATHS.Attendance,

          element: (
            <FileContextProvider>
              <MaterailPage page="Attendance" />,
            </FileContextProvider>
          ),
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
              {/* <ReportFileProvider> */}
              <UserProvider>
              <CourseProvider>
                <AcademicYearProvider>
                <FileContextProvider>
<DoctorReportProvider>

                <GenerateReport page="GenerateReport" />
</DoctorReportProvider>
                </FileContextProvider>
                </AcademicYearProvider>
              </CourseProvider>
            </UserProvider>
              {/* </ReportFileProvider> */}
            </>
          ),
        },
        {
          path: ROUTE_PATHS.AdminFiles,
          element: (
            <FileContextProvider>
              <MaterailPage page="Admin files" />,
            </FileContextProvider>
          ),
        },
        {
          path: ROUTE_PATHS.CreateUser,
          element: (
            <UserProvider>
              <CreateUser page="Create User" />,
            </UserProvider>
          ),
        },
        {
          path: ROUTE_PATHS.ManageUsers,
          element: (
            <UserProvider>
              <CourseProvider>
                <AcademicYearProvider>
                  <Mangeusers page="Mange users" />
                </AcademicYearProvider>
              </CourseProvider>
            </UserProvider>
          ),
        },
        {
          path: ROUTE_PATHS.OpenSemester,

          element: (
            <CourseProvider>
              <AcademicYearProvider>
                <OpenSemester page="OpenSemester" />,
              </AcademicYearProvider>
            </CourseProvider>
          ),
        },
        {
          path: ROUTE_PATHS.ManageAcdamicyear,
          element: (
            <CourseProvider>
              <AcademicYearProvider>
                <UserProvider>
                  <StaticalAndalalysis page="Manage Acdamic year" />
                </UserProvider>
              </AcademicYearProvider>
            </CourseProvider>
          ),
        },
        {
          path: ROUTE_PATHS.StudentSurvey,
          element: (
            <CourseProvider>
              <AcademicYearProvider>
                <UserProvider>
                  <StaticalAndalalysis page="Student Survey" />
                </UserProvider>
              </AcademicYearProvider>
            </CourseProvider>
          ),
        },
        {
          path: ROUTE_PATHS.Profile,
          element: (
            <UserProvider>
              <ProfilePage page="profile" />
            </UserProvider>
          ),
        },
        {
          path: ROUTE_PATHS.AdminDashboard,
          element: (
            <AcademicYearProvider>
              <UserProvider>
                <AdminDashbord page="Admin Dashboard" />
              </UserProvider>
            </AcademicYearProvider>
          ),
        },

        {
          path: ROUTE_PATHS.AssignCourses,
          element: (
            <CourseProvider>
              <AcademicYearProvider>
                <UserProvider>
                  <AssignCourses page="Assign Courses" />
                </UserProvider>
              </AcademicYearProvider>
            </CourseProvider>
          ),
        },
      ],
    },
    {
      path: "*",
      element: <h1>Page not found</h1>,
    },
  ]);
}
