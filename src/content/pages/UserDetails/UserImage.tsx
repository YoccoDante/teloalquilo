import { UserModel } from '../../../models/user/userModel'
import './index.css'
import DefaultPic from '../../../assets/Images/profile-user.png'
import { useState } from 'react'
import { Box } from '@mui/material'

function CustomerImage( {user, height}:{user:UserModel, height?:string} ) {
  const [ pic, setPic ] = useState(user.profile_pic)
  return (
    <Box className='CustomerPageImage NoScrollBar'>
      <p>{user.name + ' ' + user.last_name}</p>
      <img loading='lazy' src={pic} onError={() => setPic(DefaultPic)}/>
    </Box>
  )
}

export default CustomerImage