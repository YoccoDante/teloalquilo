import React, { useContext, useState } from 'react'
import { UserModel } from '../../../models/user/userModel'
import './index.css'
import Rating from '@mui/material/Rating'
import { UserSessionContext } from '../../../contexts/authContext'
import { useNavigate } from 'react-router-dom'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { BACKEND_TOOLS } from '../../../models/BACKEND_TOOLS'
import { useWithResponseContext } from '../../../contexts/snackBarContext'
import { useLoadingContext } from '../../../contexts/loadingContext'

const API = BACKEND_TOOLS.API_URI+'/rate/'

function CustomerInfo( {user}:{user:UserModel} ) {
  const {setWithResponse} = useWithResponseContext()
  const {userSession} = useContext(UserSessionContext)
  const [ open, setOpen ] = useState(false)
  const navigate = useNavigate()
  const {isLoading, setIsLoading} = useLoadingContext()
  const [ratingValue, setRatingValue] = useState<number>(0);

  const handleRatingChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
    if (newValue !== null) {
      setRatingValue(newValue);
    }
  };
  const handleQualify = () => {
    //alert('hola')
    if (userSession.user === null) {
      navigate('/login')
    }
    setOpen(true)
  }
  const handleRate = async () => {
    setIsLoading(true)
    const token = userSession.token? userSession.token : ''
    const rateData = {token:token, rate:ratingValue, target_id:user._id}
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
      setWithResponse({msg:'¡Ha ocurrido un error, inténtalo más tarde!', color:'error'})
    }
    finally {
      setIsLoading(false)
      setOpen(false)
    }
  }
  return (
    <div className="CustomerPageInfo NoScrollBar">
      <dl>
        <dt>Calificación:</dt>
        <dd className='QualifyArea'>
          <Rating sx={{fontSize:"26px"}} readOnly defaultValue={user.stars}/>
          <button className='QualifyButton' onClick={handleQualify}>{user.range === 'host' ? 'Calificar Anfitrión ❤️' : 'Calificar huésped ❤️'}</button>
        </dd>
        <dt>Contacto:</dt>
        <dd>{user.phone_number !== ""? "51-"+user.phone_number : "sin contacto 😣"}</dd>
      </dl>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¡Califica a nuestro anfitrión!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Calificalo por su calidad como arrendatario y la calidad de su inmueble
            <Rating
              sx={{fontSize:'56px'}}
              name="rating"
              value={ratingValue}
              onChange={handleRatingChange}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' disabled={isLoading} color='error' onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant='contained' disabled={isLoading || ratingValue === 0} onClick={handleRate} autoFocus>
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CustomerInfo