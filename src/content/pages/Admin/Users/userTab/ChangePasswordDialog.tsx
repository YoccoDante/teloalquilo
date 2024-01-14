import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useUser from '../../../../../hooks/useUser'
import { WithResponseModel } from '../../../../../models/withResponse'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface ChangePasswordDialogProps {
    selectedUser:string,
    setIsLoading:React.Dispatch<React.SetStateAction<boolean>>,
    isLoading:boolean,
    setWithResponse:React.Dispatch<React.SetStateAction<WithResponseModel | null>>,
    setSelectedUser:React.Dispatch<React.SetStateAction<string | null>>,
    setChangePassword:React.Dispatch<React.SetStateAction<boolean>>,
}

function ChangePasswordDialog({selectedUser,isLoading,setIsLoading, setWithResponse, setSelectedUser,setChangePassword}:ChangePasswordDialogProps) {
    const [newPassword, setNewPassword] = useState<string|null>(null)
    const [passwordValidation, setPasswordValidation] = useState<string|null>(null)
    const [seePassword, setSeePassword] = useState(false)
    const [match, setMatch] = useState<boolean|null>(null)
    const Users = useUser()

    const handleSeePassword = () => {
        setSeePassword(true)
        setTimeout(() => {
            setSeePassword(false)
        },500)
    }

    const validatePassword = () => {
        if (!newPassword || !passwordValidation) return
        if (newPassword !== passwordValidation){
            setMatch(false)
        }
        else {
            setMatch(true)
        }
    }
    const savePassword = async () => {
        setIsLoading(true)
        if (!newPassword) {
            setWithResponse({msg:'Escriba una contraseña', color:'error'})
            return
        }
        await Users.ChangePassword({
            newPassword:newPassword,
            setWithResponse:setWithResponse,
            userId:selectedUser
        })
        setIsLoading(false)
        setSelectedUser(null)
        setChangePassword(false)
    }
    useEffect(() => {
        validatePassword();
    }, [passwordValidation]);
  return (
    <Dialog open>
        <DialogTitle>
            {`Cambiar contraseña de usuario`}
        </DialogTitle>
        <DialogContent sx={{display:'flex', flexDirection:'column'}}>
            Se cambiará la contraseña del usuario, elija una segura
            <Box sx={{display:'flex', alignItems:'center'}}>
                <TextField sx={{width:'50%', my:2}} type={seePassword?'text':'password'} label={'Nueva contraseña'} onChange={(e) => setNewPassword(e.target.value)}/>
                {!seePassword?
                    <IconButton onClick={handleSeePassword}>
                        <VisibilityIcon/>
                    </IconButton>
                    :
                    <IconButton onClick={() => setSeePassword(false)}>
                        <VisibilityOffIcon/>
                    </IconButton>
                }
            </Box>
            <TextField sx={{width:'50%'}} type={seePassword?'text':'password'} label={'Nueva contraseña'} onChange={(e) => {
                setPasswordValidation(e.target.value)
            }}/>
            {match!==null && <Typography color={match? 'green' : 'red'}>{match? 'Contraseñas correctas' : 'Las contraseñas no coinciden'}</Typography>}
        </DialogContent>
        <DialogActions>
            <Button
            disabled={isLoading}
            onClick={() => {
                setSelectedUser(null)
                setChangePassword(false)
                setMatch(null)
            }}
            variant='contained'
            color='error'>
                Cancelar
            </Button>
            <Button
            disabled={isLoading}
            variant='contained'
            onClick={() => savePassword()
            }>
                Guardar
            </Button>
        </DialogActions>
    </Dialog>
  )
}

export default ChangePasswordDialog