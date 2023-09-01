import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '../../../../components/Typography';
import HeartIcon from '../../../../assets/Sgvs/heart.svg'
import { useNavigate } from 'react-router-dom';

function ProductSmokingHero() {
  const navigate = useNavigate()
  return (
    <Container
      component="section"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 9 }}
    >
      <Button
        sx={{
          border: '4px solid currentColor',
          borderRadius: 0,
          height: 'auto',
          py: 2,
          px: 5,
        }}
        onClick={() => navigate("/quickquestions")}
      >
        <Typography variant="h4" component="span">
          ¿Tienes preguntas? ¿Necesitas ayuda?
        </Typography>
      </Button>
      <Typography variant="subtitle1" sx={{ my: 3 }}>
        Estamos para ayudarde. Estamos en contacto!
      </Typography>
      <Box
        component="img"
        src={HeartIcon}
        alt="buoy"
        sx={{ width: 60 }}
      />
    </Container>
  );
}

export default ProductSmokingHero;
