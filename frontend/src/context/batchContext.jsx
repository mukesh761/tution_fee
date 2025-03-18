import { createContext, useState } from "react";

const BatchContext=createContext();

export const BatchProvider=({children})=>{
    const [batch, setbatch] = useState("mukesh")
    return(
        <BatchContext.Provider value={{batch,setbatch}}>
            {children}
        </BatchContext.Provider>
    )
}
export default BatchContext;