import { Box, Container, Grid, Typography } from '@mui/material'
import WhoProfile from '../../../assets/Images/about.jpeg'
import { CopyRight } from '../../../commons/Copyright'
import "./index.css"
 
function About() {
  const text = "Somos una familia de emprendedores, atrevidos y con iniciativa, decididos a trabajar para mejorar en el servicio y calidad de alquileres de habitaciones, departamento, viviendas enteras y lo que necesites rentar con nosotros.Mejorar en el servicio y la calidad de alquiler a través de organizar, juntar y mejorar la atención, la seguridad y confianza cuando tu decidas tomar una vivienda en alquiler a través de www.teloalquilo.com. Porque sabemos lo importante que es para ti la calidad en el servicio que tomaras y el precio que pagues sea completamente justificado; por lo que cada día trabajamos más en evolucionar en la forma de atenderte. Sepas que aquí, a través de nosotros encontraras lo que buscas: Lo mejor, lo económico y seguro, en pocas palabras, te ofrezco calidad, la calidad que lo mereces."
  return (
    <Container>
      <Typography sx={{mt:{ xs: 2, md:4}}} fontSize={42}>Quiénes somos?</Typography>
      <Grid container mt={4}>
        <Grid item xs={12} mb={4} md={6} sx={{display:"flex",justifyContent:"center"}}>
          <div className='photocontainer'>
            <img className='photo' src={WhoProfile}/>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography 
            sx={{fontSize:{sx:"18px",md:"24px"},px:{xs:2,md:8}}}
            textAlign={"justify"}>
              {text}
          </Typography>
        </Grid>
        <Grid item display={"flex"} justifyContent={"center"} xs={12} mt={4}>
          <CopyRight/>
        </Grid>
      </Grid>

    </Container>
  )
}

export default About