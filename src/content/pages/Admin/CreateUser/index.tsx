import {FormControlLabel, Box,Avatar,Typography, TextField, Button, Checkbox } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState, useRef } from "react";
import GenderMenu from "../../../../commons/GenderMenu";
import useAuth from "../../../../hooks/useAuth";
import { useLoadingContext } from "../../../../contexts/loadingContext";

function CreateUser () {
    const Auth = useAuth()
    const formRef = useRef<HTMLFormElement>(null);
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone_number, setPhone_Number] = useState("");
    const [gender, setGender] = useState('Seleccionar');
    const {isLoading, setIsLoading} = useLoadingContext()
    const [asHost, setAsHost] = useState(false);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        e.preventDefault();
        const userData = {
          "name":name.toLocaleLowerCase(),
          "last_name":lastName.toLocaleLowerCase(),
          "email":email.toLocaleLowerCase(),
          "password":password,
          "gender":gender.toLocaleLowerCase(),
          "phone_number":phone_number,
          "range":asHost? 'host' : 'user'
        }
        await Auth.Register({userData})
        setIsLoading(false)
        setName('')
        setLastName("")
        setEmail("")
        setPassword("")
        setPhone_Number("")
        setGender("Seleccionar")
        setAsHost(false)
        if (formRef.current) {
            formRef.current.reset();
        }
      };
    return (
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrar nuevo usuario
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, position: 'relative'}} ref={formRef}>
          <TextField
            disabled={isLoading}
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nombre o nombres"
            name="name"
            autoComplete="names"
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setName(e.target.value)}
          />
          <TextField
            disabled={isLoading}
            margin="normal"
            required
            fullWidth
            id="last_name"
            label="Apellido"
            name="last_name"
            autoComplete="Apellidos"
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setLastName(e.target.value)}
          />
          <TextField
            disabled={isLoading}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e: React.ChangeEvent<HTMLInputElement> )=>setEmail(e.target.value)}
          />
          <TextField
            disabled={isLoading}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)}
          />
          <TextField
            disabled={isLoading}
            margin="normal"
            required
            fullWidth
            name="contact"
            label="Número de teléfono"
            type="text"
            id="contact"
            autoComplete="current-contact"
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setPhone_Number(e.target.value)}
          />
          <Typography>Género:</Typography>
          <GenderMenu setGender={setGender}/>
          <FormControlLabel
            control={<Checkbox onChange={(e) => setAsHost(e.target.checked)} value="asHost" color="primary" />}
            label="Unirse como host"
          />
          <Button
            disabled={isLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrar
          </Button>
        </Box>
      </Box>
    )
}

export default CreateUser