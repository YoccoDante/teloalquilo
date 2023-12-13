import './index.css'
import { Box, Typography } from '@mui/material'

function LampLoader({text}:{text?:string}) {
  return (
    <Box
    sx={{
      width:'100%',
      height:'300px',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      position:'relative',
      mt:8
    }}>
      <Typography
      sx={{
        position:'absolute',
        top:0,
        fontSize:'36px',
        fontFamily:'revert',
        textAlign:'center'
      }}>
        {text? text : 'No se encontraron resultados para esta búsqueda'}
      </Typography>
      <span className="lamploader"></span>
    </Box>
  )
}

export default LampLoader