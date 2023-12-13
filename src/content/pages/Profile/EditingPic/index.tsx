import { useContext, useEffect, useState } from "react"
import DefaultPic from '../../../../assets/Images/profile-user.png'
import './index.css'
import { useNavigate } from "react-router-dom"
import { Box } from '@mui/material'

interface RoundedPicProps {
  pic:string | undefined,
  to?:string,
  diameter?:string
}
function EditingPic({pic, to, diameter}:RoundedPicProps) {
  const [ profilePic, setProfilePic] = useState(pic)
  const [ size, setSize ] = useState('50px')
  const navigate = useNavigate()
  useEffect(() => {
    if (diameter){
      setSize(diameter)
    }
    setProfilePic(pic)
  },[pic])
  
  return (
    <Box
    height={size}
    width={size}
    className='RoundedPicContainer'
    onClick={() => to && navigate(to)}>
      <img className='RoundedPicPic' src={profilePic} alt="Photo de perfil" onError={() => setProfilePic(DefaultPic)}/>
    </Box>
  )
}

export default EditingPic