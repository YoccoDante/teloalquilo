import { useNavigate } from "react-router-dom"
import { UserSessionContext, UserType } from "../contexts/authContext"
import { useContext, useState } from "react"
import { WithResponseModel } from "../models/withResponse"
import { BACKEND_TOOLS } from "../models/BACKEND_TOOLS"

interface RegisterProps {
    userData:RegisterData,
    setWithResponse:React.Dispatch<React.SetStateAction<WithResponseModel | null>>,
}

interface LoginProps {
    loginData:LoginData,
    setWithResponse:React.Dispatch<React.SetStateAction<WithResponseModel | null>>,
}

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

function useAuth() {
    const navigate = useNavigate()
    const {setIsLogged, setUserSession} = useContext(UserSessionContext)
    async function Login ({loginData, setWithResponse}:LoginProps) {
        const API = BACKEND_TOOLS.API_URI+'/auth/user'
        try {
            const res = await fetch(API, {
                method:"POST",
                headers:{
                "Content-Type":"application/json",
                'Enterprise-Id':BACKEND_TOOLS.ENTERPRISE_ID
                },
                body:JSON.stringify(loginData)
            })
            const data = await res.json()
            if(res.ok){
                setUserSession(data)
                setIsLogged(true)
                navigate("/home")
            }
            if (!res.ok){
                setWithResponse({msg:JSON.stringify(data), color:'error'})
            }
        }
        catch (err) {
            setWithResponse({msg:String(err), color:'error'})
        }
    }
    function LogOut () {
        navigate('/login')
        setIsLogged(false)
        setUserSession({user:null, token:null})
    }

    async function Register ({userData, setWithResponse}:RegisterProps) {
        const API = BACKEND_TOOLS.API_URI+'/user/new'
        try {
            const res = await fetch(API, {
              method:'POST',
              headers:{
                'Content-Type':'application/json',
                'Enterprise-Id':BACKEND_TOOLS.ENTERPRISE_ID
              },
              body:JSON.stringify(userData)
            })
            const data = await res.json()
            if (res.ok){
              setUserSession(data)
              setIsLogged(true)
              navigate('/home')
            }
            if (!res.ok){
              setWithResponse({msg:'algo salió mal, inténtalo después. '+data.error, color:'error'})
            }
        }
        catch (err) {
        setWithResponse({msg:String(err), color:'error'})
        }
    }

    return {Login, LogOut, Register}
}

export default useAuth