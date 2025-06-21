import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider=({children})=>{

    const [user,setUser]=useState(null)
    const auth = getAuth();
     useEffect (()=>{
        const unsubscribe =onAuthStateChanged(auth,(loggedUser)=>{
                  setUser(loggedUser);
        });
        return ()=>unsubscribe();
    },[]);                 
    return (
        <AuthContext.Provider value ={{user,setUser}}>
        {children}
    </AuthContext.Provider>
    )
}
    