import * as React from 'react';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../../../../components/Typography';
import SignpostIcon from '@mui/icons-material/Signpost';
import PublicIcon from '@mui/icons-material/Public';
import TalkIcon from '../../../../assets/Sgvs/talk.svg';

const item: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function ProductValues() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'secondary.light' }}
    >
      <Container sx={{ mt: 15, mb: 30, display: 'flex', position: 'relative' }}>
        <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <SignpostIcon sx={{fontSize:'36px'}}/>
              <Typography variant="h6" sx={{ my: 5 }}>
                facíl de usar
              </Typography>
              <Typography variant="h5">
                {
                  'Necesitas que te alquile, lo hacemos. Tienes para alquilar, tambien lo hacemos'
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <PublicIcon sx={{fontSize:'36px'}}/>
              <Typography variant="h6" sx={{ my: 5 }}>
                disponible en tu zona
              </Typography>
              <Typography variant="h5">
                {
                  'Por ahora en la region de Cusco'
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src={TalkIcon}
                alt="clock"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                contratos flexibles
              </Typography>
              <Typography variant="h5">
                {'De acuerdo a tus necesidades de estadia'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;
