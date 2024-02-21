import { createContext, useContext, useState } from "react";

const auth = createContext(null);


export const AuthProvider = ({children})=>{

    const [isAuthenticated , setIsAuthenticated] =  useState(false)
    const Login = ()=>{
        setIsAuthenticated(true)
    }
    const LogOut = ()=>{
        setIsAuthenticated(false)
    }
return (


    <auth.Provider value={{isAuthenticated , Login , LogOut}}>
    {children}
    </auth.Provider>


)

}


const UseAuth = ()=>{

    return useContext(auth);

}


export default UseAuth