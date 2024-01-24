import { useNavigate } from "react-router-dom"
import { UserSessionContext } from "../contexts/authContext"
import { useContext } from "react"
import { BACKEND_TOOLS } from "../models/BACKEND_TOOLS"
import { UserModel } from "../models/user/userModel"
import { useWithResponseContext } from "../contexts/snackBarContext"

interface RegisterProps {
    userData:RegisterData,
}

interface LoginProps {
    loginData:LoginData,
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
    const {setIsLogged, setUserSession, userSession} = useContext(UserSessionContext)
    const {setWithResponse} = useWithResponseContext()
    let user:UserModel|null = null
    async function Login ({loginData}:LoginProps) {
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
                user = data.user
                setWithResponse({msg:`¡Bienvenido ${data.user.name}`, color:'success'})
            }
            if (!res.ok){
                setWithResponse({msg:JSON.stringify(data), color:'error'})
            }
        }
        catch (err) {
            setWithResponse({msg:String(err), color:'error'})
        }
        finally{
            setTimeout(()=>{
                if (user && user.range === 'admin'){
                    navigate("/admin")
                }
                if (user && user.range !== 'admin'){
                    navigate("/home")
                }
            },1000)
        }
    }
    function LogOut () {
        navigate('/login')
        setIsLogged(false)
        setUserSession({user:null, token:null})
    }

    async function Register ({userData}:RegisterProps) {
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
              if (!userSession.user){
                navigate('/home')
              }
              setWithResponse({msg:'Usuario registrado exitosamente', color:'success'})
            }
            if (!res.ok){
              setWithResponse({msg:data.error, color:'error'})
            }
        }
        catch (err) {
        setWithResponse({msg:String(err), color:'error'})
        }
    }

    return {Login, LogOut, Register}
}

export default useAuth