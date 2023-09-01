import { ReactNode, createContext, useEffect, useState } from "react";
import { UserModel } from "../models/user/userModel";
import React from "react";

//define Context Type
export type UserType = {
    user:UserModel | null,
    token:string | null
}
export interface UserContextInterface {
    isLogged:boolean,
    setIsLogged:React.Dispatch<React.SetStateAction<boolean>>
    userSession:UserType
    setUserSession:React.Dispatch<React.SetStateAction<UserType>>
}
const defaultUserContext = {
    isLogged:false,
    setIsLogged:(value:boolean) => {},
    userSession:{
        user:null,
        token:null
    },
    setUserSession: (user:UserType) => {}
} as UserContextInterface

//create context
export const UserSessionContext = createContext(defaultUserContext)

//provide 
export function UserContextProvider ({children}:{children:ReactNode}) {
    const [ userSession, setUserSession ] = useState<UserType>(
        {user:null,token:null}
    )
    const [ isLogged, setIsLogged ] = useState(false)
    useEffect(() => {
        console.log("userSession:",userSession)
    },[userSession])
    return (
    <UserSessionContext.Provider value={{userSession, setUserSession, isLogged, setIsLogged}}>
        {children}
    </UserSessionContext.Provider>
    )
}