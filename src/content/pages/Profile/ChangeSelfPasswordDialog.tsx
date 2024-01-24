import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useUser from '../../../hooks/useUser';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useWithResponseContext } from '../../../contexts/snackBarContext';
import { useLoadingContext } from '../../../contexts/loadingContext';

interface ChangeSelfPasswordDialogProps {
    setChangePassword:React.Dispatch<React.SetStateAction<boolean>>,
}

function ChangeSelfPasswordDialog({setChangePassword}:ChangeSelfPasswordDialogProps) {
    const {isLoading, setIsLoading} = useLoadingContext()
    const {setWithResponse} = useWithResponseContext()
    const [newPassword, setNewPassword] = useState<string|null>(null)
    const [passwordValidation, setPasswordValidation] = useState<string|null>(null)
    const [seePassword, setSeePassword] = useState(false)
    const [seeCurrentPassword, setSeeCurrentPassword] = useState(false)
    const [match, setMatch] = useState<boolean|null>(null)
    const Users = useUser()
    const [currentPassword, setCurrentPassword] = useState<string|null>(null)

    const handleSeeCurrentPassword = () => {
        setSeePassword(true)
        setTimeout(() => {
            setSeePassword(false)
        },500)
    }

    const handleSeePassword = () => {
        setSeePassword(true)
        setTimeout(() => {
            setSeePassword(false)
        },500)
    }

    const validatePassword = () => {
        if (!newPassword || !passwordValidation || !currentPassword) return
        if (newPassword === passwordValidation){
            setMatch(true)
        }
        else {
            setMatch(false)
        }
    }
    const savePassword = async () => {
        setIsLoading(true)
        if (!newPassword) {
            setWithResponse({msg:'Escriba una contraseña', color:'error'})
            return
        }
        await Users.ChangeSelfPassword({
            newPassword:newPassword,
            currentPassword:currentPassword!
        })
        setIsLoading(false)
        setChangePassword(false)
    }
    useEffect(() => {
        validatePassword();
    }, [newPassword, passwordValidation, currentPassword]);
    return (
    <Dialog open>
        <DialogTitle>
            {`Cambiar contraseña de usuario`}
        </DialogTitle>
        <DialogContent sx={{display:'flex', flexDirection:'column'}}>
            Se cambiará la contraseña del usuario, elija una segura
            <Box sx={{display:'flex', alignItems:'center'}}>
                <TextField sx={{width:'50%', my:2}} type={seeCurrentPassword?'text':'password'} label={'Contraseña actual'} onChange={(e) => setCurrentPassword(e.target.value)}/>
                {!seePassword?
                    <IconButton onClick={handleSeeCurrentPassword}>
                        <VisibilityIcon/>
                    </IconButton>
                    :
                    <IconButton onClick={() => setSeeCurrentPassword(false)}>
                        <VisibilityOffIcon/>
                    </IconButton>
                }
            </Box>
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

export default ChangeSelfPasswordDialog