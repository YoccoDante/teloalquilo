import './index.css'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { Hidden } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function NavBar() {
  return (
    <>
    <AppBar sx={{bgcolor:"#111"}} position="static">
        <Toolbar sx={{maxWidth:"100vw"}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display:{md:"none"}}}
          >
            <MenuIcon/>
          </IconButton>
            <Link to="/" className='link logo'>NombreDeMarca</Link>
          <Hidden mdDown>
            <Link to="/finder" className='link'>Usuarios</Link>
            <Link to="/about" className='link'>Acerca de nosotros?</Link>
            <Link to="/products" className='link'>Nuestros productos</Link>
            <Link to="/quickquestions" className='link'>Preguntas Frecuentes</Link>
            <Link to="/login" className='link'>Iniciar Sesión</Link>
            <Link to="/register" className='link'>Registrarse</Link>
          </Hidden>
        </Toolbar>
      </AppBar>
    <Outlet/>
    </>
  );
}
