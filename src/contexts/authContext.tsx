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
    changeProfilePic:any
}
const defaultUserContext = {
    isLogged:false,
    setIsLogged:(value:boolean) => {},
    userSession:{
        user:null,
        token:null
    },
    setUserSession: (user:UserType) => {},
    changeProfilePic:(value:string) => {}
} as UserContextInterface

//create context
export const UserSessionContext = createContext(defaultUserContext)

//provide 
export function UserContextProvider ({children}:{children:ReactNode}) {
    const [ userSession, setUserSession ] = useState<UserType>(
        {user:null,token:null}
    )
    const [ isLogged, setIsLogged ] = useState(false)
    const changeProfilePic = (url:string) => {
        if ( userSession.user?.profile_pic){
            userSession.user.profile_pic = url
        }
    }
    return (
    <UserSessionContext.Provider value={{userSession, setUserSession, isLogged, setIsLogged, changeProfilePic}}>
        {children}
    </UserSessionContext.Provider>
    )
}