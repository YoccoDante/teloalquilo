import * as React from 'react';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '../../../../components/Button';
import Typography from '../../../../components/Typography';
import SearchIcon from '../../../../assets/Sgvs/search.svg';
import TalkIcon from '../../../../assets/Sgvs/talk.svg';
import ContractIcon from '../../../../assets/Sgvs/contract.svg';
import { useNavigate } from 'react-router-dom';

const item: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: 'default',
  color: 'secondary.main',
  fontWeight: 'medium',
};

const image = {
  height: 55,
  my: 4,
};

function ProductHowItWorks() {
  const navigate = useNavigate()
  return (
    <Box
      component="section"
      sx={{ display: 'flex', bgcolor: 'secondary.light', overflow: 'hidden' }}
    >
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            top: -180,
            opacity: 0.7,
          }}
        />
        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }}>
          ¿Cómo funciona?
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>1.</Box>
                <Box
                  component="img"
                  src={SearchIcon}
                  alt="suitcase"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  Busca tu nuevo hogar en nuestra pestaña de productos.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>2.</Box>
                <Box
                  component="img"
                  src={TalkIcon}
                  alt="graph"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  Revisa los detalles y contacta con el arrendatario.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3.</Box>
                <Box
                  component="img"
                  src={ContractIcon}
                  alt="clock"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  ¡Acuerda las condiciones de tu vivienda y firma el contrato!
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          component="a"
          sx={{ mt: 8 }}
          onClick={() => navigate("/products")}
        >
          ¿Empezamos?
        </Button>
      </Container>
    </Box>
  );
}

export default ProductHowItWorks;
