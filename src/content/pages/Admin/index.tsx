import React from 'react';
import { Drawer, List, ListItem, ListItemText, Box, ListItemButton, styled } from '@mui/material';
import Users from './Users';
import useAuth from '../../../hooks/useAuth';
import CreateUser from './CreateUser';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const DrawerStyled = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
}));

const MainContent = styled('main')({
  flexGrow: 1,
  padding: 3,
});

const AdminPage: React.FC = () => {
  const [selectedItem, setSelectedItem] = React.useState('administrar usuarios');
  const Auth = useAuth()
  const navigate = useNavigate()

  const handleListItemClick = (text: string) => {
    setSelectedItem(text);
    if (text === 'cerrar sesión'){
      Auth.LogOut()
    }
    if (text === 'perfil'){
      navigate('/profile')
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <DrawerStyled variant="permanent">
        <List>
          {['administrar usuarios', 'crear nuevo usuario','perfil','cerrar sesión'].map((text) => (
            <ListItem key={text} onClick={() => handleListItemClick(text)}>
              <ListItemButton key={`button${text}`} selected={selectedItem === text}>
                <ListItemText key={`item${text}`} primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DrawerStyled>
      <MainContent>
        <Box sx={{ display: selectedItem === 'administrar usuarios' ? 'block' : 'none' }}>
          <Users/>
        </Box>
        <Box sx={{ display: selectedItem === 'crear nuevo usuario' ? 'block' : 'none' }}>
          <CreateUser/>
        </Box>
      </MainContent>
    </Box>
  );
};

export default AdminPage;