import { useNavigate } from "react-router-dom"
import { UserSessionContext, UserType } from "../contexts/authContext"
import { useContext, useEffect, useState } from "react"
import { UserModel } from "../models/user/userModel"
import { join } from "path"
import { Api } from "../assets/keys"

const API = "http://localhost:5000"

type LoginData = {
    email:string,
    password:string
}

type RegisterData = {
    name:string,
    last_name:string,
    email:string,
    range?:string
}

function useAuth({setIsLoading}:{setIsLoading:React.Dispatch<React.SetStateAction<boolean>>}) {
    const navigate = useNavigate()
    const {setIsLogged, setUserSession} = useContext(UserSessionContext)
    async function Login (loginData:LoginData) {
        setIsLoading(true)
        const res = await fetch(API+'/'+'/auth/user', {
            method:"POST",
            headers:{
            "Content-Type":"application/json"
            },
            body:JSON.stringify(loginData)
        })
        const data = await res.json()
        if (data?.error){
            alert("Worng Email or Password")
            setIsLoading(false)
        }
        if(data.user){
            setUserSession(data)
            setIsLogged(true)
            console.log("in hook", data.user)
            navigate("/home")
            setIsLoading(false)
        }
    }
    function LogOut () {
        setIsLoading(true)
        setIsLogged(false)
        setUserSession({user:null, token:null})
        setIsLoading(false)
    }

    async function Register ({userData}:{userData:RegisterData}) {
        setIsLoading(true)
        // const res = await fetch([API,'user','new'].join('/'),{
        //     headers:{
        //         "Content-Type":"application/json"
        //     },
        //     body:JSON.stringify(userData)
        // })
        // const data = await res.json()
        // if (data.error){
        //     alert("error a registar")
        // }
        // if (data.user){
        //     alert('user registered')
        // }
        alert("user registered")
        setIsLoading(false)
    }

    return {Login, LogOut, Register}
}

export default useAuth