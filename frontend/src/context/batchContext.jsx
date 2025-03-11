import { createContext } from "react";

const batchContext=createContext();

export const batchProvider=({children})=>{
    return(
        <batchContext.Provider>
            {children}
        </batchContext.Provider>
    )
}
export default batchContext;