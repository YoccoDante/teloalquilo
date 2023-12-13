import {FormControlLabel, Box,Avatar,Typography, TextField, Button, Grid, Checkbox, Autocomplete } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { CopyRight } from "../../../../commons/Copyright";
import {  useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GenderMenu from "../../../../commons/GenderMenu";
import { WithResponseModel } from "../../../../models/withResponse";
import ResponseSnackBar from "../../../../commons/ResponseSnackBar";
import { UserSessionContext } from "../../../../contexts/authContext";
import useAuth from "../../../../hooks/useAuth";

export const SignUpComponent= () =>{
    const navigate = useNavigate()
    const Auth = useAuth()
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone_number, setPhone_Number] = useState("");
    const [gender, setGender] = useState("other");
    const [isLoading, setIsLoading] = useState(false);
    const [withResponse, setWithResponse] = useState<WithResponseModel|null>(null);
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
      Auth.Register({userData, setWithResponse})
      setIsLoading(false)
    };
    // const genders = ["Masculino","Femenino"]
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
          Sign Up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, position: 'relative'}}>
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
          <TextField disabled label={gender}/>
          <GenderMenu setGender={setGender}/>
          <FormControlLabel
            control={<Checkbox onChange={(e) => setAsHost(e.target.checked)} value="asHost" color="primary" />}
            label="Join as a host"
          />
          <Button
            disabled={isLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container sx={{display:'flex', justifyContent:'center'}}>
            <Grid item>
              <Link to="/login">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
          <CopyRight/>
        </Box>
        {withResponse &&
          <ResponseSnackBar withResponse={withResponse} setWithResponse={setWithResponse}/>
        }
      </Box>
    )
}