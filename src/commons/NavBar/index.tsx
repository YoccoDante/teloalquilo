import './index.css'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { Hidden } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function NavBar() {
  return (
    <>
    <Box sx={{flexGrow:1}}>
      <AppBar sx={{bgcolor:"#111", width:"100vw"}} position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" className='link logo'>NombreDeMarca</Link>
          </Typography>
          <Hidden mdDown>
            
            <Link to="/about" className='link'>Quiénes somos?</Link>
            <Link to="/ourjob" className='link'>Nuestro trabajo</Link>
            <Link to="/quickquestions" className='link'>Preguntas frecuentes</Link>
            <Link to="/login" className='link'>Iniciar Sesión</Link>
            <Link to="/register" className='link'>Registrarse</Link>
          </Hidden>
        </Toolbar>
      </AppBar>
    </Box>
    <Outlet/>
    </>
  );
}
