import { createContext, useContext, useState } from "react";

const auth = createContext(null);


export const AuthProvider = ({children})=>{
    const [Access, SetAcsess] = useState()
    const [Data , setData] = useState([])
    const [isAuthenticated , setIsAuthenticated] =  useState(false)
    const Login = (UserData)=>{
        setIsAuthenticated(true)
        // SetAcsess("instructor")
        setData(UserData)
        SetAcsess("admin")
            }
    const LogOut = ()=>{
        setIsAuthenticated(false)
    }
return (


    <auth.Provider value={{isAuthenticated  , Data, Access , Login , LogOut }}>
    {children}
    </auth.Provider>


)

}


const UseAuth = ()=>{

    return useContext(auth);

}


export default UseAuth