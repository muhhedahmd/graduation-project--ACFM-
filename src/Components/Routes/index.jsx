import { Navigate, useRoutes } from "react-router-dom"
import { PATHS } from "./Path";

import ProtectedRoute from "../ProtectedRoute";
import Home from "../../Pages/Home";
import Login from "../../Pages/Login";
import UseAuth from "../Contexts/Authantication";

export default function AppRouter(){
    const {isAuthenticated}= UseAuth()


    return useRoutes([
        {  path: PATHS.Login, element: isAuthenticated ? <Navigate to={PATHS.Home} /> : <Login /> },
        {
      path: PATHS.Home,
      element: isAuthenticated ? <ProtectedRoute /> : <Navigate  to={PATHS.Login} />,
      children: [
        { index: true, element: <Home /> },
            
        ]
    },
    { path: "*", element: <h2>Page not found</h2> }
]);


}
