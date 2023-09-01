import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from "react-router-dom"
import './index.css'

function CloseIcon( {route}:{route:string} ) {
    const navigate = useNavigate()
    const handleCloseIcon = () => {
        navigate("/"+route)
      }
  return (
    <div className="CloseIcon" onClick={handleCloseIcon}>
        <CancelIcon sx={{width:"50px", height:"50px"}}/>
    </div>
  )
}

export default CloseIcon