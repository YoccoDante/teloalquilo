import React, { useContext} from 'react'
import { UserModel } from '../models/user/userModel'
import { UserSessionContext } from '../contexts/authContext'
import { useNavigate } from 'react-router-dom'
import { WithResponseModel } from '../models/withResponse'
import { BACKEND_TOOLS } from '../models/BACKEND_TOOLS'


type GetUserProps = {
    range:string,
    page:number,
    page_size:number
}
type EditUserProps = {
    token:string | null,
    atributes:{
        name:string,
        last_name:string,
        gender:string,
        email:string,
        phone_number:string
    }
}
interface UseUserProps {
    setIsLoading:React.Dispatch<React.SetStateAction<boolean>>,
}

function useUser({setIsLoading}:UseUserProps) {
    const { userSession } = useContext(UserSessionContext)
    const navigate = useNavigate()
    
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
          return users;
        } catch (error) {
          console.error('Error fetching users:', error);
          return [];
        }
      }
    async function EditUser( EditData:EditUserProps, setWithResponse:React.Dispatch<React.SetStateAction<WithResponseModel | null>>) {
        setIsLoading(true)
        const API = BACKEND_TOOLS.API_URI+'/user/'
        if (userSession.user === null){
            navigate('/login')
            setIsLoading(false)
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

    return {
        GetUsers,
        EditUser,
    }
}

export default useUser