import React, { useContext, useState, useEffect, useRef } from 'react';
import { Box, AppBar, Toolbar, IconButton, Hidden, Drawer, Divider, List, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { UserSessionContext } from '../../contexts/authContext';
import RoundedPic from '../../components/RoundedPic/ProfilePic';
import useAuth from '../../hooks/useAuth';
import './index.css';
import { useNavBarHeight } from '../../contexts/navBarContext';

function NavBar() {
  const navigate = useNavigate();
  const { setNavBarHeight } = useNavBarHeight();
  const { userSession } = useContext(UserSessionContext);
  const [ isOpen, setIsOpen ] = useState(false);
  const navBarRef = useRef<HTMLDivElement>(null);
  const [ localHeight, setLocalHeight ] = useState(0)
  const { LogOut } = useAuth();

  useEffect(() => {
    if (navBarRef.current) {
      setNavBarHeight(navBarRef.current.offsetHeight);
      setLocalHeight(navBarRef.current.offsetHeight)
    }
  }, []);

  const navBarLinks = [
    {to:'/finder', label:'Usuarios'},
    {to:'/about', label:'Acerca de nosotros'},
    {to:'/products/listby/all', label:'Nuestros productos'},
    {to:'/quickquestions', label:'Preguntas Frecuentes'}
  ];

  const handleClick = (to:string) => {
    navigate(to);
    setIsOpen(false);
  };

  return (
    <>
      <AppBar ref={navBarRef} sx={{bgcolor:"#111", zIndex:2}} position="fixed">
        <Toolbar sx={{maxWidth:"100vw"}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display:{md:"none"}}}
            onClick={() => setIsOpen(true)}
          >
            <MenuIcon/>
          </IconButton>
            <Link to="/" className='link logo'>Teloalquilo</Link>
          <Hidden mdDown>
            {navBarLinks.map((link) => 
              <Link to={link.to} className='link' key={link.label}>{link.label}</Link>
            )}
            {userSession.user?.range === 'admin'&&<Link to="/admin" className='link'>administrador</Link>}
            {userSession.user ? 
              <RoundedPic pic={userSession.user.profile_pic} to={'/profile'}/>
            :
            <>
              <Link to="/login" className='link'>Iniciar Sesión</Link>
              <Link to="/register" className='link'>Registrarse</Link>
            </>
            }
          </Hidden>
          <Drawer
            open={isOpen}
            onClose={() => setIsOpen(false)}
          >
            <Box display='flex' justifyContent='center'>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{display:{md:"none"}, width:'fit-content'}}
                onClick={() => setIsOpen(false)}
              >
                <ArrowBack/>
              </IconButton>
              {userSession.user && <RoundedPic pic={userSession.user.profile_pic} to={"/profile"}/>}
            </Box>
            <Divider/>
            <List sx={{width:'200px'}}>
              <ListItem onClick={() => handleClick("/")}>Home</ListItem>
              {navBarLinks.map((link) => 
                <ListItem onClick={() => handleClick(link.to)} key={link.label}>{link.label}</ListItem>
              )}
              {userSession.user ?
                <ListItem onClick={() => { LogOut(); setIsOpen(false); }}>Cerrar sesión</ListItem>
                :
                <><ListItem onClick={() => handleClick("/login")}>Iniciar sesión</ListItem>
                <ListItem onClick={() => handleClick("/register")}>Registrarse</ListItem></>
              }
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>
      <Box sx={(theme) => ({ mt: theme.spacing(localHeight / 8) })}>
        <Outlet/>
      </Box>
    </>
  );
}

export default NavBar;