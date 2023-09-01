import { useState } from "react";
import useAuth from "./useAuth";


function useSetLoginData() {
    const [email, setEmail] = useState("");
    const [ isLoading, setIsLoading ] = useState(false)
    const [password, setPassword] = useState("");
    const Auth = useAuth({setIsLoading})
    const Submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        Auth.Login({email, password})
      };
    
    const ChangeEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value)
    }
    const ChangePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value)
    }

  return { ChangeEmail, ChangePassword, Submit, isLoading }
}

export default useSetLoginData