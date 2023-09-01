import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SignInComponent } from './SignInComponent';
import {Typography } from "@mui/material";

const theme = createTheme();
const ImagenDeFondo = 'url(https://www.businessempresarial.com.pe/wp-content/uploads/2023/03/departamentos-de-lujo-2.jpeg)';


export default function SignInPage() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh', display:"flex", flexDirection:"row"}}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={4}
          md={8}
          sx={{
            maxHeight:"100vh",
            minHeight:250,
            backgroundImage: ImagenDeFondo,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Typography variant='h2'
          sx={{
            color:"#9c27b0",
            fontSize:{
              xs:"24px",
              md:"36px"
            }
          }}>
            alimbabasxd.com.pe
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={4} sx={{height:"100vh", display:"flex", flexDirection:"column"}} component={Paper} elevation={6} square>
          <SignInComponent/>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}