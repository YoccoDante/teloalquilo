import * as React from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material'
import Typography from '../Typography';
import TextField from '../TextField';
import './index.css'

export default function EditProfile( {setOpenEditProfile}:{setOpenEditProfile:React.Dispatch<React.SetStateAction<boolean>>} ) {

  const Requirements = [
    {title:'Cambiar nombre:', content:'Escriba su nombre o nombres', label:'Nombre'},
    {title:'Cambiar apellido:', content:'Escriba su apellido o apellidos', label:'Apellido'},
    {title:'Cambiar email:', content:'Escriba su email', label:'Email'},
    {title:'Cambiar teléfono:', content:'Escriba su número de teléfono', label:'Teléfono'},
  ]

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert('done xd');
    setOpenEditProfile(false);
  };

  const handleClose = () => {
    setOpenEditProfile(false);
  };

  return (
    <Box 
    className='EditPageBG'
    component='form'
    onSubmit={(e) => handleSubmit(e)}
    sx={{
        width:'100vw',
        height:'100vh',
        position:'fixed',
        top:0, left:0,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        zIndex:3}}>

        <Box sx={{
            bgcolor:'#fff',
            p:4,
            borderRadius:'.5em',
            width:'400px',
            display:'grid',
            gap:'15px'}}>
            {Requirements.map((required) =>
                <>
                    <Typography sx={{
                        position:'relative',
                        left:'-10px',
                        fontSize:'18px',
                        m:0,
                        fontWeight:'700'}}>
                        {required.title}
                    </Typography>
                    <Typography sx={{m:0}}>{required.content}</Typography>
                    <TextField fullWidth label={required.label}/>
                </>
            )}
            <Box display='flex' justifyContent='space-around'>
                <Button variant="outlined" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="outlined" type='submit'>
                    Guardar
                </Button>
            </Box>
        </Box>
    </Box>
  );
}