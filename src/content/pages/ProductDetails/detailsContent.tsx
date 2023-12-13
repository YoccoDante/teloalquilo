import { ProductRootModel } from "../../../models/rootModel/productRootModel"
import Carousel from "../../../components/Carousel"
import ProfileCard from "../../../components/ProfileCard"
import CommentBox from "../../../components/CommentBox"
import React, { useContext, useState } from "react"
import CloseIcon from "../../../components/CloseIcon"
import { Box, Rating } from '@mui/material'
import Typography from "../../../components/Typography"
import { WithResponseModel } from "../../../models/withResponse"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import { UserSessionContext } from '../../../contexts/authContext'
import ResponseSnackBar from '../../../commons/ResponseSnackBar'
import { BACKEND_TOOLS } from "../../../models/BACKEND_TOOLS"

interface DetailsContentProps {
    root :ProductRootModel
}

const API = BACKEND_TOOLS.API_URI+'/rate/'

function DetailsContent( {root}:DetailsContentProps ) {
  const {userSession} = useContext(UserSessionContext)
  const navigate = useNavigate()
  const comments = root.comments
  const [withResponse, setWithResponse] = useState<WithResponseModel | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [ratingValue, setRatingValue] = useState<number>(0);

  const handleRatingChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
    if (newValue !== null) {
      setRatingValue(newValue);
    }
  };
  const handleQualify = () => {
    if (userSession.user === null) {
      navigate('/login')
    }
    setOpen(true)
  }
  const handleRate = async () => {
    setIsLoading(true)
    const rateData = {rate:ratingValue, target_id:root.product._id}
    try{
      const res = await fetch(API,{
        headers:{
          'Content-Type':'application/json',
          'Enterprise-Id':BACKEND_TOOLS.ENTERPRISE_ID,
          'Authorization':userSession.token!
        },
        method:'POST',
        body:JSON.stringify(rateData)
      })
      const data = await res.json()
      if (res.ok){
        setWithResponse({msg:'¡Calificación enviada satisfactoriamente!', color:'success'})
      }
      else {
        setWithResponse({msg:JSON.stringify(data), color:'error'})
      }
    }
    catch (error){
      setWithResponse({msg:'Ha ocurrido un error, inténtalo más tarde!', color:'error'})
    }
    finally {
      setRatingValue(0)
      setIsLoading(false)
      setOpen(false)
    }
  }

  return (
    <Box
      component='div'
      sx={{
        display:'flex',
        flexDirection:{
          xs:'column',
          md:'row',
        },
        maxWidth:'100vw',
        maxHeight:{md:'100vh'},
        position:'relative',
      }}>
      {/*left side images*/}
      <Box sx={{
        width:{xs:'100vw', md:'70vw'},
        height:{xs:'300px', md:'100vh'},
        minHeight:'300px',
        position:'relative'
        }}>
        <Carousel imgs={root.product.imgs}/>
        <CloseIcon/>
      </Box>
      {/*right side details*/}
      <Box
        sx={{mx:4}}
        width={{md:'40%'}}
        display='flex'
        flexDirection='column'
        maxHeight='100vh'
        maxWidth={{xs:'100%', md:'40vw'}}
      >
        <Box sx={{height:'55%', overflowY: 'auto'}}>
          <Typography variant="h1" textAlign='center' textTransform='capitalize' fontSize='36px'>{root.product.title}</Typography>
          <Box sx={{display:'flex', alignItems:'center'}}>
            <Rating sx={{fontSize:'26px'}} readOnly defaultValue={root.product.stars}/>
            <button
            style={{
              background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              border: 0,
              borderRadius: 3,
              boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
              color: 'white',
              height: 48,
              padding: '0 30px',
              cursor:'pointer'
            }}
            onClick={() => handleQualify()}>
              Calificar
            </button>
          </Box>
          <Typography variant="h4" fontSize='24px'>Descripción:</Typography>
          <Typography sx={{ml:4}}>{root.product.description}</Typography>
          <Typography variant="h4" fontSize='24px'>Categoría:</Typography>
          <Typography sx={{ml:4}}>{root.product.category}</Typography>
          <Typography variant="h4" fontSize='24px'>Ubicación:</Typography>
          <Typography sx={{ml:4}}>{root.product.region} - {root.product.province}</Typography>
          <Typography variant="h4" fontSize='24px'>Precio:</Typography>
          <Typography sx={{ml:4}}>S/.{root.product.price}</Typography>
          <ProfileCard user={root.user}/>
        </Box>
        {/*commentary box*/}
        <Box sx={{height:'45%', display: 'flex', flexDirection: 'column'}}>
          <CommentBox comments={comments}/>
        </Box>
      </Box>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¡Califica este producto!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Califica el lugar en base a tu experiencia y espectativa
            <Rating
              sx={{fontSize:'56px'}}
              name="rating"
              value={ratingValue}
              onChange={handleRatingChange}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' disabled={isLoading} color='error' onClick={() => {setOpen(false); setRatingValue(0)}}>Cancelar</Button>
          <Button variant='contained' disabled={isLoading || ratingValue === 0} onClick={handleRate} autoFocus>
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
      {withResponse &&
        <ResponseSnackBar setWithResponse={setWithResponse} withResponse={withResponse}/>
      }
    </Box>
  )
}

export default DetailsContent