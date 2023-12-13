import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Typography from '../../../../components/Typography';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_CATEGORIES } from '../../../../models/product/productModel';

const ImageBackdrop = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: '#000',
  opacity: 0.3,
  transition: theme.transitions.create('opacity'),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  display: 'block',
  padding: 0,
  borderRadius: 0,
  height: '30vh',
  [theme.breakpoints.down('md')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover': {
    zIndex: 1,
  },
  '&:hover .imageBackdrop': {
    opacity: 0.15,
  },
  '&:hover .imageMarked': {
    opacity: 0,
  },
  '&:hover .imageTitle': {
    border: '4px solid currentColor',
  },
  '& .imageTitle': {
    position: 'relative',
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  '& .imageMarked': {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

const images = [
  {
    url: 'https://i.pinimg.com/736x/b3/bb/0a/b3bb0a8aa1d429dbf4dbefeef541f165.jpg',
    title: 'Casa',
    width: '40%',
    to:PRODUCT_CATEGORIES.HOUSE
  },
  {
    url: 'https://i.pinimg.com/564x/66/b3/58/66b358dd2ca906a168906814ee7dfbb7.jpg',
    title: 'Garaje',
    width: '20%',
    to:PRODUCT_CATEGORIES.GARAGE
  },
  {
    url: 'https://i.pinimg.com/564x/47/c2/c1/47c2c1ed51d11b205ceb97c58ecd71c1.jpg',
    title: 'Minis',
    width: '40%',
    to:PRODUCT_CATEGORIES.MINI
  },
  {
    url: 'https://i.pinimg.com/564x/e9/de/18/e9de18b636eab49330b7f7c6bc9c0ce6.jpg',
    title: 'Duplex',
    width: '25%',
    to:PRODUCT_CATEGORIES.DUPLEX
  },
  {
    url: 'https://i.pinimg.com/564x/90/4f/fb/904ffb2407667012ee2c87ae97c782fd.jpg',
    title: 'Habitaciones',
    width: '20%',
    to:PRODUCT_CATEGORIES.ROOM
  },
  {
    url: 'https://i.pinimg.com/564x/40/6c/0d/406c0d5af93a781273eab1a9d0d0f1bf.jpg',
    title: 'Departamentos',
    width: '30%',
    to:PRODUCT_CATEGORIES.APARTMENT
  },
  {
    url: 'https://i.pinimg.com/564x/40/6c/0d/406c0d5af93a781273eab1a9d0d0f1bf.jpg',
    title: 'Room Mate',
    width: '25%',
    to:PRODUCT_CATEGORIES.ROOMIE
  },
];

export default function ProductCategories() {
  const navigate = useNavigate()
  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h4" marked="center" align="center" component="h2">
        ¿Buscas dónde vivir?
      </Typography>
      <Typography variant="h4" marked="center" align="center" component="h2">
        ¡Te lo alquilo!
      </Typography>
      <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image) => (
          <ImageIconButton
            onClick={() => navigate('/products/listby/'+image.to)}
            key={image.title}
            style={{
              width: image.width,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
                backgroundImage: `url(${image.url})`,
                border:"5px solid white"
              }}
            />
            <ImageBackdrop className="imageBackdrop" />
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'common.white',
              }}
            >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className="imageTitle"
              >
                {image.title}
                <div className="imageMarked" />
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
      </Box>
    </Container>
  );
}
