import { SignUpComponent } from './SignUpComponent';
import { Box} from '@mui/material';
import  CssBaseline from '@mui/material/CssBaseline';



const ImagenDeFondo = 'url(https://www.businessempresarial.com.pe/wp-content/uploads/2023/03/departamentos-de-lujo-2.jpeg)';

export default function SignUpPage() {
  return (
    <>
    <CssBaseline/>
      <Box 
      sx={{
        height:"100vh",
        width:"100vw",
        backgroundImage: ImagenDeFondo,
        backgroundRepeat: 'no-repeat',
        backgroundColor: (t) =>
          t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
        }}>
        <SignUpComponent/>
      </Box>
    </>
    );
}