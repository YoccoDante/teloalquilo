import { useEffect, useState } from "react";
import { ApiLogin } from "../../assets/keys";

export const UserLogin = () => {

    const [validated, setValidated] = useState(false)

    useEffect(()=>{
        try {
            fetch(ApiLogin)
            .then(res => res.json())
            .then(data => setValidated(data["validated"]))
        } catch (e) {
            setValidated(false)
        }
    },[])

    return (
        validated
    )
}