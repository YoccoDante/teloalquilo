import LampLoader from '../../commons/LampLoader'
import './index.css'
import { Box } from '@mui/material'

function PhotoPreview({photos}:{photos:string[]}) {
  return (
    <Box className='PhotoPreviewsContainer'>
      {photos.length === 0 &&
        <LampLoader text='Aún no tienes imágenes'/>
      }
        {photos.map((photo, index) => 
            <Box
            key={index}
            sx={{
                width:'100px',
                height:'100px',
            }}>
                <img className='PhotoPreview' src={photo}/>
            </Box>
        )}
    </Box>
  )
}

export default PhotoPreview