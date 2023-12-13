import { useState } from "react";
import useAuth from "./useAuth";
import { WithResponseModel } from "../models/withResponse";

interface SetLoginDataProps {
  setIsLoading:React.Dispatch<React.SetStateAction<boolean>>,
  setWithResponse:React.Dispatch<React.SetStateAction<WithResponseModel | null>>,
}

function useSetLoginData({setIsLoading, setWithResponse}:SetLoginDataProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Auth = useAuth()
    const Submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        const loginData = {email, password}
        await Auth.Login({loginData, setWithResponse})
        setIsLoading(false)
      };
    
    const ChangeEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value)
    }
    const ChangePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value)
    }

  return { ChangeEmail, ChangePassword, Submit}
}

export default useSetLoginData