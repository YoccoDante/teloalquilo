import "./index.css"
import { useNavigate } from "react-router-dom"
import Rating from "@mui/material/Rating"
import CardPic from "../RoundedPic/CardPic"
import { UserModel } from "../../models/user/userModel"
import { useEffect, useState } from "react"

export interface ProfileCardProps {
  user:UserModel
}

function ProfileCard( {user}:ProfileCardProps ) {
  const navigate = useNavigate()
  const handleClick = () => {
      navigate("/finder/"+user._id)
  }
  const [title, setTitle] = useState('');
  useEffect(() => {
      switch (user.range){
        case 'admin':
          setTitle('Administrador:');
          break;
        case 'host':
          setTitle('Anfitrion:');
          break;
        case 'user':
          setTitle('Usuario:');
          break;
        default:
          break;
      }
    },[])
  return (
    <div className="ProfileCard" onClick={handleClick}>
      <p className="Anfitrion">{title}</p>
      <p className="ProfileCardFullName">{user.name + ' ' + user.last_name}</p>
      <Rating className="ProfileCardRate" readOnly defaultValue={user.stars}/>
      <CardPic pic={user.profile_pic}/>
    </div>
  )
}

export default ProfileCard