import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import EditingPic from './EditingPic';
import { UserSessionContext } from '../../../contexts/authContext';
import './index.css'
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BACKEND_TOOLS } from '../../../models/BACKEND_TOOLS';
import { useWithResponseContext } from '../../../contexts/snackBarContext';
import { useLoadingContext } from '../../../contexts/loadingContext';

interface MediaDialogProps {
  title:string,
  content:string,
  setSelectingPic:React.Dispatch<React.SetStateAction<boolean>>,
}

export default function MediaDialog({title, content, setSelectingPic}:MediaDialogProps) {
  const {setWithResponse} = useWithResponseContext()
  const { userSession, setUserSession } = useContext(UserSessionContext)
  const [ selectedPic, setSelectedPic ] = useState<string|null>(null);
  const [ file, setFile ] = useState<File|null>(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate()
  const {isLoading, setIsLoading} = useLoadingContext()

  const handleCancel = () => {
    setSelectingPic(false);
  };
  const handleSelectPic = (e: React.ChangeEvent<HTMLInputElement>) => {
    const img = e.target.files![0]
    if (img) {
      setSelectedPic(URL.createObjectURL(img))
      setFile(img)
      return
    }
  }

  const handleSave = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (file === null) {
      return
    }
    setIsLoading(true)
    const token = userSession.token!
    const formData = new FormData();
    formData.append('token', token); // Add the token field
    formData.append('img', file); // Add the file field
    if (userSession.user === null){
        navigate('/login')
        setIsLoading(false)
        return {error:'no user logged'}
    }
    const API = BACKEND_TOOLS.API_URI + '/user/profile_pic'
    try {
        const res = await fetch(API, {
          headers:{
            'Authorization':userSession.token!,
            'Enterprise-Id':BACKEND_TOOLS.ENTERPRISE_ID
          },
          method: 'POST',
          body: formData,
        })
        const data = res.json()
        if (res.ok) {
          setUserSession({
            ...userSession,
            user: {
              ...userSession.user,
              profile_pic: selectedPic!
            }
          });
          setWithResponse({msg:'¡Edición correcta!', color:'success'});
        }
        if (res.status === 405){
          setWithResponse({msg:'¡Error, formato no permitido!', color:'error'})
        }
        if (!res.ok){
          setWithResponse({msg:JSON.stringify(data), color:'error'})
        }
    }
    catch (error) {
      setWithResponse({msg:'¡Ha ocurrido un error, inténtalo más tarde!', color:'error'})
    }
    finally{
      setIsLoading(false)
      setSelectingPic(false)
    }
  }
  useEffect(() => {
  },[selectedPic])

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open
        onClose={handleCancel}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'300px', overflow:'hidden'}}>
          {selectedPic === null && <EditingPic diameter='300px' pic={userSession.user?.profile_pic}/>}
          {selectedPic &&  <EditingPic diameter='300px' pic={selectedPic}/>}
        </DialogContent>
        <DialogContent sx={{overflow:'hidden'}}>
          <DialogContentText>
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{display:'flex', justifyContent:'center'}}>
          <form
          onSubmit={handleSave}
          className='PicForm'
          >
            <input className='PicInput' accept='jpg, png, jpeg, jfif' id='img'  onChange={handleSelectPic} type='file' hidden/>
            <Button className='PicButton' sx={{fontSize:'26px', mb:2}} onClick={() => document.querySelector<HTMLInputElement>('.PicInput')!.click()}>
              Seleccionar imagen
            </Button>
            <Box sx={{display:'flex',flexDirection:'column',width:'100%' , position:'relative', bottom:'0', justifyContent:'space-evenly'}}>
              <Box sx={{display:'flex', justifyContent:'space-between', mb:2}}>
                <Button disabled={isLoading} color='error' variant='contained' autoFocus onClick={handleCancel}>
                  Cancelar
                </Button>
                <Button type='submit' disabled={isLoading || selectedPic === null} variant='contained'>Guardar</Button>
                </Box>
            </Box>
          </form>
        </DialogActions>
      </Dialog>
    </div>
  );
}
