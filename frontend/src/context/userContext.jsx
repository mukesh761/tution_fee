import { Children, createContext, useState } from "react";

const UserContext=createContext();
export const UserProvider=({children})=>{
    const [islogin, setislogin] = useState(false);
    const [user, setuser] = useState();
   
    return(
        <UserContext.Provider value={{islogin,setislogin,user,setuser}}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContext;