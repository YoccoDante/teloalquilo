import { Box, Container, Grid, Typography } from '@mui/material'
import WhoProfile from '../../../assets/Images/WhoWeAreProfile.jpg'
import { CopyRight } from '../../../commons/Copyright'
import './index.css'
 
function About() {
  const text = "Somos una familia de emprendedores, atrevidos y con iniciativa, decididos a trabajar para mejorar en el servicio y calidad de alquileres de habitaciones, departamento, viviendas enteras y lo que necesites rentar con nosotros.Mejorar en el servicio y la calidad de alquiler a través de organizar, juntar y mejorar la atención, la seguridad y confianza cuando tu decidas tomar una vivienda en alquiler a través de www.teloalquilo.com. Porque sabemos lo importante que es para ti la calidad en el servicio que tomaras y el precio que pagues sea completamente justificado; por lo que cada día trabajamos más en evolucionar en la forma de atenderte. Sepas que aquí, a través de nosotros encontraras lo que buscas: Lo mejor, lo económico y seguro, en pocas palabras, te ofrezco calidad, la calidad que lo mereces."
  return (
    <Container>
      <Grid container>
        <Grid item sm={12}>
        <Typography mt={4} fontSize={42}>Quiénes somos?</Typography>
        </Grid>
        <Grid item md={6}>
            <Box 
            sx={{
            width:"100%",
            height:"100%",
            bgcolor:"#eee",
            maxHeight:"100vh"
            }}>
              <div className='photocontainer'>
                <img className='photo' src={WhoProfile}/>
              </div>
            </Box>
        </Grid>
          <Grid item md={6}>
            <Box
            sx={{
                width:"100%",
                maxWidth:"90vw",
                height:"100%",
                display:"block",
                bgcolor:"#eee",
                maxHeight:"100vh",
                overflow:"auto"
            }}
            >
              <Typography 
              gutterBottom={true}
              mt={4}
              px={8}
              fontSize={24}
              textAlign={"justify"}>
                {text}
              </Typography>
            </Box>
          </Grid>
        <Grid item md={12}>
          <CopyRight/>
        </Grid>
      </Grid>

    </Container>
  )
}

export default About