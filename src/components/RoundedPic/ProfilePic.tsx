import { useContext, useEffect, useState } from "react"
import DefaultPic from "../../assets/Images/profile-user.png"
import './index.css'
import { useNavigate } from "react-router-dom"
import { Box } from '@mui/material'
import { UserSessionContext } from "../../contexts/authContext"

interface ProfilePicProps {
  pic:string | undefined,
  to?:string,
  diameter?:string
}

function ProfilePic({ to, diameter }: ProfilePicProps) {
  const { userSession } = useContext(UserSessionContext);
  const [size, setSize] = useState('50px');
  const navigate = useNavigate();

  useEffect(() => {
    if (diameter) {
      setSize(diameter);
    }
  }, [diameter]);

  const profilePic = userSession.user?.profile_pic || DefaultPic;

  return (
    <Box
      height={size}
      width={size}
      className='ProfilePicContainer'
      onClick={() => to && navigate(to)}
    >
      <img src={profilePic} alt="Photo de perfil" onError={(e) => (e.target as HTMLImageElement).src = DefaultPic} />
    </Box>
  );
}

export default ProfilePic