import "./index.css"
import { useNavigate } from "react-router-dom"
import Rating from "@mui/material/Rating"
import RoundedPic from "../RoundedPic"

export interface ProfileCardProps {
  _id:string,
  full_name:string,
  profile_pic:string,
  rate:number
}

function ProfileCard( {_id, full_name, profile_pic, rate}:ProfileCardProps ) {
  const navigate = useNavigate()
  const handleClick = () => {
      navigate("/finder/"+_id)
  }
  return (
    <div className="ProfileCard" onClick={handleClick}>
      <p className="Anfitrion">Anfitrion:</p>
      <p className="ProfileCardFullName">{full_name}</p>
      <Rating className="ProfileCardRate" readOnly defaultValue={rate}/>
      <RoundedPic pic={profile_pic}/>
    </div>
  )
}

export default ProfileCard