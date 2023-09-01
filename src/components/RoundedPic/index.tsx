import { useEffect, useState } from "react"
import DefaultPic from "../../assets/Images/profile-user.png"
import './index.css'

interface RoundedPicProps {
  pic:string
}
function RoundedPic({pic}:RoundedPicProps) {
  const [ profilePic, setProfilePic] = useState(pic)
  return (
    <div className='RoundedPicContainer'>
      <img className='RoundedPicPic' src={profilePic} alt="Photo de perfil" onError={() => setProfilePic(DefaultPic)}/>
    </div>
  )
}

export default RoundedPic