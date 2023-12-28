import { useEffect, useState } from "react"
import DefaultPic from "../../assets/Images/profile-user.png"
import './index.css'
import { useNavigate } from "react-router-dom"
import { Box } from '@mui/material'

interface CardPicProps {
  pic:string | undefined,
  to?:string,
  diameter?:string
}
function CardPic({pic, to, diameter}:CardPicProps) {
  const [ profilePic, setProfilePic] = useState(DefaultPic)
  const [ size, setSize ] = useState('50px')
  const navigate = useNavigate()

  useEffect(() => {
    if (diameter){
      setSize(diameter)
    }
    const img = new Image()
    img.src = pic || ''
    img.onload = () => setProfilePic(pic || '')
  }, [pic, diameter])

  return (
    <Box
    height={size}
    width={size}
    className='CardPicContainer'
    onClick={() => to && navigate(to)}>
      <img src={profilePic} alt="Photo de usuario" />
    </Box>
  )
}

export default CardPic