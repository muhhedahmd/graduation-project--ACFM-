import { createContext, useContext, useState } from "react";

const auth = createContext(null);


export const AuthProvider = ({children})=>{
    const [Access, SetAcsess] = useState()

    const [isAuthenticated , setIsAuthenticated] =  useState(false)
    const Login = ()=>{
        setIsAuthenticated(true)
        // SetAcsess("instructor")
        SetAcsess("admin")

    }
    const LogOut = ()=>{
        setIsAuthenticated(false)
    }
return (


    <auth.Provider value={{isAuthenticated , Access , Login , LogOut }}>
    {children}
    </auth.Provider>


)

}


const UseAuth = ()=>{

    return useContext(auth);

}


export default UseAuth