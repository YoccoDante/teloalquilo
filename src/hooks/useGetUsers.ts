import { useEffect, useState } from "react"
import { UserModel } from "../models/user/userModel"

const API = "http://localhost:5000/user"

type UserRange = {
  range:string
}

function useGetUsers( {range}:UserRange) {
    const [ users, setUsers ] = useState<UserModel[]>()
    console.log(API+"/"+range)
    useEffect(() => {
        fetch(API+"/"+range)
        .then(res => res.json())
        .then(data => setUsers(data.users))
    },[])
  return {users}
}

export default useGetUsers