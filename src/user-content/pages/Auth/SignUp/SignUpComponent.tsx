import {FormControlLabel, Box,Avatar,Typography, TextField, Button, Grid, Checkbox } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { CopyRight } from "../../../../commons/Copyright";
import {  useState } from "react";
import { Link } from "react-router-dom";


export const SignUpComponent= () =>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({
          "name":name,
          "email":email,
          "password":password
        })  
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
          Sign Up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="name or names"
            name="name"
            autoComplete="names"
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e: React.ChangeEvent<HTMLInputElement> )=>setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/login">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
          <CopyRight/>
        </Box>
      </Box>
    )
}