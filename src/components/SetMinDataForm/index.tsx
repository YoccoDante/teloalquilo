import { Box,Typography, TextField, Button, Autocomplete } from "@mui/material";
import './index.css'
import useSetUserData from "../../hooks/useSetUserData";
import { UserModel } from "../../models/user/userModel";
import React, { useContext, useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import { UserSessionContext } from "../../contexts/authContext";
import { WithResponseModel } from "../../models/withResponse";
import { useLoadingContext } from "../../contexts/loadingContext";

interface SetMinDataProps {
  user:UserModel|null,
  setEditData:React.Dispatch<React.SetStateAction<boolean>>,
  setEditing:React.Dispatch<React.SetStateAction<boolean>>,
}

export const SetMinDataForm= ({user, setEditData, setEditing}:SetMinDataProps) =>{
    const SetData = useSetUserData()
    const {isLoading, setIsLoading} = useLoadingContext()
    const genders = ["male","femail", 'other']
    const { EditUser } = useUser()
    const { userSession } = useContext(UserSessionContext)
    const minData = [
      {title:'Nuevo nombre:', content:user?.name, action:SetData.ChangeName},
      {title:'Nuevo apellido:', content:user?.last_name, action:SetData.ChangeLastName},
      {title:'Nuevo email:', content:user?.email, action:SetData.ChangeEmail},
      {title:'Nuevo número de teléfono:', content:user?.phone_number, action:SetData.ChangePhoneNumber},
    ]
    const handleCancel = () => {
      setEditData(false)
    }
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setIsLoading(true)
      const editedUser = SetData.getUserDataToEdit()
      await EditUser({EditData:{token: userSession.token, atributes:editedUser}})
      setEditData(false)
      setEditing(false)
      setIsLoading(false)
    }
    useEffect(() => {
      if (user) {
        SetData.ChangeName(user?.name)
        SetData.ChangeLastName(user?.last_name)
        SetData.ChangeEmail(user?.email)
        SetData.ChangePhoneNumber(user?.phone_number)
        SetData.ChangeGender(user.gender)
      }
    },[])
    return (
    <Box
    className='SetDataForm'
    sx={{
        position:'fixed',
        top:0,
        left:0,
        width:'100vw',
        height:'100vh',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        zIndex:2
    }}>
      <Box
        sx={{
          width:{
            xs:"100%",
            md:"40vw"
          },
          minWidth:"250px",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor:"#fff",
          borderRadius:"2em",
          mx:"10px",
          p:"25px",
          backgroundColor:"#eee"
        }}>
        <Typography component="h1" variant="h5">
          Editar
        </Typography>
        <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{
          mt: 1,
          position: 'relative'
        }}>
          {minData.map((data) => 
            <TextField
              margin="normal"
              disabled={isLoading}
              fullWidth
              id={data.title}
              label={data.title}
              key={data.title}
              name={data.title}
              defaultValue={data.content}
              onChange={(e: React.ChangeEvent<HTMLInputElement>)=>data.action(e.target.value)}
            />
          )}
          <Autocomplete
            disablePortal
            disabled={isLoading}
            id="genders"
            options={genders}
            size='small'
            //todo default value
            defaultValue={user?.gender === 'male'? 'Masculino' : user?.gender === 'female'? 'Femenino' : 'Otro'}
            onChange={(event:any) => SetData.ChangeGender(event.target.value)}
            sx={{ width: "300px", right:0, position:'relative'}}
            renderInput={(params) => <TextField {...params} label="Género" variant='filled'/>}
            />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            Guardar
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={handleCancel}
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </Box>
    )
}