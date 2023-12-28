import * as React from 'react';
import Button from '../../../../components/Button';
import Typography from '../../../../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import { useContext } from 'react';
import { UserSessionContext } from '../../../../contexts/authContext';
import { useNavigate } from 'react-router-dom';

const backgroundImage =
  '/assets/Imgs/landing-key.jpg';

export default function ProductHero() {
  const {userSession} = useContext(UserSessionContext)
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(userSession.user? "/products" : "/register")
  }
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        ¿Buscas dónde vivir?
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
      >
        ¡Encuentra tu hogar ideal entre nuestro productos! 😉
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        onClick={handleClick}
        sx={{ minWidth: 200 }}
      >
        {userSession.user? "Ver Productos" : "Registarse"}
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Discover the experience
      </Typography>
    </ProductHeroLayout>
  );
}
