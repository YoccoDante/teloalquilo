import React, { useContext} from 'react'
import { UserModel } from '../models/user/userModel'
import { UserSessionContext } from '../contexts/authContext'
import { useNavigate } from 'react-router-dom'
import { BACKEND_TOOLS } from '../models/BACKEND_TOOLS'
import { useWithResponseContext } from '../contexts/snackBarContext'
import { useLoadingContext } from '../contexts/loadingContext'


type GetUserProps = {
    range:string|null,
    page:number,
    page_size:number
}
type DataUserProps = {
    token:string | null,
    atributes:{
        name:string,
        last_name:string,
        gender:string,
        email:string,
        phone_number:string
    }
}
interface DeleteUserProps {
    userId:string,
    setUsers:React.Dispatch<React.SetStateAction<UserModel[]|null>>,
    users:UserModel[]
}

interface EditUserProps {
    EditData:DataUserProps,
}

interface ChangeSelfPasswordProps {
    newPassword:string,
    currentPassword:string
}

interface ChangePasswordProps {
    newPassword:string,
    userId:string
}

function useUser() {
    const { userSession } = useContext(UserSessionContext)
    const navigate = useNavigate()
    const {setWithResponse} = useWithResponseContext()
    const {setIsLoading} = useLoadingContext()
    
    async function GetUsers({ range, page, page_size }: GetUserProps) {
        const API = `${BACKEND_TOOLS.API_URI}/user/result?range=${range}&page=${page}&page_size=${page_size}`;
        try {
          const res = await fetch(API, {
            headers: {
              'Enterprise-Id': BACKEND_TOOLS.ENTERPRISE_ID,
            },
          });
      
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
      
          const data = await res.json();
          const users: UserModel[] = data.users;
          const totalUsers = data.total
          return {users, totalUsers};
        } catch (error) {
          return {users:[],totalUsers:0};
        }
      }
    async function EditUser({EditData}:EditUserProps) {
        setIsLoading(true)
        const API = BACKEND_TOOLS.API_URI+'/user/'
        if (userSession.user === null){
            navigate('/login')
            return {error:'no user logged'}
        }
        try {
            const res = await fetch(API,{
                headers:{
                    'Content-Type':'application/json',
                    'Enterprise-Id':BACKEND_TOOLS.ENTERPRISE_ID,
                    'Authorization':userSession.token!
                },
                method:'PUT',
                body:JSON.stringify(EditData)
                })
            const data = await res.json()
            if (res.ok){
                setWithResponse({msg:'¡Edición satisfactoria!', color:'success'})
                userSession.user.name=EditData.atributes.name
                userSession.user.last_name=EditData.atributes.last_name
                userSession.user.gender=EditData.atributes.gender
                userSession.user.email=EditData.atributes.email
                userSession.user.phone_number=EditData.atributes.phone_number
            }else{
                setWithResponse({msg:JSON.stringify(data), color:'error'})
            }
        }
        catch{
            setWithResponse({msg:'¡Ha ocurrido un error, intentalo más tarde!', color:'error'})
        }
        finally{
            setIsLoading(false)
        }
    }
    async function DeleteUser({userId, setUsers, users}:DeleteUserProps) {
        const API = BACKEND_TOOLS.API_URI + `/admin/user/${userId}`
        try{
            const res = await fetch(API,{
                method:'DELETE',
                headers:{
                    'Enterprise-Id':BACKEND_TOOLS.ENTERPRISE_ID,
                    'Authorization':userSession.token!
                }
            })
            const data = await res.json()
            if (res.ok){
                setWithResponse({msg:'¡Usuario eliminado correctamente!', color:'success'})
                const newUsers = users.filter((user) => {
                    return user._id !== userId
                })
                setUsers(newUsers)
            }
            if (!res.ok){
                setWithResponse({msg:JSON.stringify(data), color:'error'})
            }
        }
        catch{
            setWithResponse({msg:'Ha habido un error, inténtelo más tarde', color:'error'})
        }
    }
    async function ChangeSelfPassword({newPassword, currentPassword}:ChangeSelfPasswordProps) {
        const API = BACKEND_TOOLS.API_URI + `/user/selfpassword`
        try{
            const res = await fetch(API,{
                method:'PUT',
                headers:{
                    'Enterprise-Id':BACKEND_TOOLS.ENTERPRISE_ID,
                    'Authorization':userSession.token!,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    new_password:newPassword,
                    current_password:currentPassword
                })
            })
            const data = await res.json()
            if (res.ok){
                setWithResponse({msg:'¡Contraseña cambiada correctamente!', color:'success'})
            }
            if (!res.ok){
                setWithResponse({msg:JSON.stringify(data), color:'error'})
            }
        }
        catch{
            setWithResponse({msg:'Ha habido un error, inténtelo más tarde', color:'error'})
        }
    }
    async function ChangePassword({newPassword, userId}:ChangePasswordProps) {
        const API = BACKEND_TOOLS.API_URI + `/admin/user/${userId}`
        try{
            const res = await fetch(API,{
                method:'PUT',
                headers:{
                    'Enterprise-Id':BACKEND_TOOLS.ENTERPRISE_ID,
                    'Authorization':userSession.token!,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    new_password:newPassword
                })
            })
            const data = await res.json()
            if (res.ok){
                setWithResponse({msg:'¡Contraseña cambiada correctamente!', color:'success'})
            }
            if (!res.ok){
                setWithResponse({msg:JSON.stringify(data), color:'error'})
            }
        }
        catch{
            setWithResponse({msg:'Ha habido un error, inténtelo más tarde', color:'error'})
        }
    }
    return {
        GetUsers,
        EditUser,
        DeleteUser,
        ChangeSelfPassword,
        ChangePassword
    }
}

export default useUser