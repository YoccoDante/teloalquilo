import { useEffect, useState } from "react";
import {FormControlLabel, Box,Avatar,Typography, TextField, Button, Grid, Checkbox, IconButton } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { CopyRight } from "../../../../commons/Copyright";
import useSetLoginData from "../../../../hooks/useSetLoginData";
import { Link } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { WithResponseModel } from "../../../../models/withResponse";
import ResponseSnackBar from "../../../../commons/ResponseSnackBar";

export const SignInComponent= () => {
    const [ withResponse, setWithResponse ] = useState<WithResponseModel | null>(null)
    const [ isLoading, setIsLoading ] = useState(false)
    const Login = useSetLoginData({setIsLoading, setWithResponse})
    const [ seePassword, setSeePassword ] = useState(false)
    const handleSeePassword = () => {
      setSeePassword(true)
      setTimeout(() => {
        setSeePassword(false)
      }, 500)
    }
    return (
      <Box
        sx={{
          my: 4,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate onSubmit={Login.Submit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={Login.ChangeEmail}
            disabled={isLoading}
          />
          <Box sx={{
            position:'relative',
            display:'flex',
            alignItems:'center'
          }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={seePassword? "text" : "password"}
              id="password"
              autoComplete="current-password"
              onChange={Login.ChangePassword}
              disabled={isLoading}
            />
            <IconButton
            sx={{
              position:'absolute',
              right:0
            }}
            onClick={handleSeePassword}>
              {seePassword?
              <VisibilityOffIcon/>
              :
              <VisibilityIcon/>}
            </IconButton>
          </Box>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            Iniciar sesión
          </Button>
          <Grid container gap={6}>
            <Grid item xs>
              <Link to="#">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register">
                {"¿No tienes una cuenta? ¡Regístrate!"}
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