import { useState } from 'react'
import { SetUserDataModel, EditableUserDataModel } from '../models/user/userModel'


function useSetUserData() {
    const [ name, setName] = useState<string>('')
    const [ lastName, setLastName] = useState<string>('')
    const [ email, setEmail] = useState<string>('')
    const [ gender, setGender] = useState<string>('')
    const [ phoneNumber, setPhoneNumber] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    const [ profilePic, setProfilePic ] = useState<File | null>(null)

    const ChangeName = (value:string) => {
        setName(value)
    }
    const ChangeLastName = (value:string) => {
        setLastName(value)
    }
    const ChangeEmail = (value:string) => {
        setEmail(value)
    }
    const ChangeGender = (value:string) => {
        setGender(value)
    }
    const ChangePhoneNumber = (value:string) => {
        setPhoneNumber(value)
    }
    const ChangePassword = (value:string) => {
        setPassword(value)
    }
    const ChangeProfilePic = (value:File | null) => {
        setProfilePic(value)
    }

    const getUserData = () => {
        const userData:SetUserDataModel = {
            name:name,
            last_name:lastName,
            email:email,
            gender:gender,
            phone_number:phoneNumber,
            password:password
        }
        return userData
    }
    const getUserDataToEdit = () => {
        const userData:EditableUserDataModel = {
            name:name,
            last_name:lastName,
            email:email,
            gender:gender,
            phone_number:phoneNumber
        }
        return userData
    }

    return {
        ChangeName,
        ChangeLastName,
        ChangeEmail,
        ChangeGender,
        ChangePhoneNumber,
        ChangePassword,
        ChangeProfilePic,
        getUserData,
        getUserDataToEdit
    }
}

export default useSetUserData