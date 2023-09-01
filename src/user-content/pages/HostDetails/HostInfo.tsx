import { UserModel } from '../../../models/user/userModel'
import './index.css'
import Rating from '@mui/material/Rating'

function CustomerInfo( {user}:{user:UserModel} ) {
  const handleQualify = () => {
    alert("no user logged!")
  }
  return (
    <div className="CustomerPageInfo">
      <dl>
        <dt>Calificación:</dt>
        <dd className='QualifyArea'>
          <Rating sx={{fontSize:"26px"}} readOnly defaultValue={user.stars}/>
          <button className='QualifyButton' onClick={handleQualify}>Calificar Anfitrión ❤️</button>
        </dd>
        <dt>Contacto:</dt>
        <dd>{user.contact !== ""? "51-"+user.contact : "sin contacto 😣"}</dd>
      </dl>
    </div>
  )
}

export default CustomerInfo