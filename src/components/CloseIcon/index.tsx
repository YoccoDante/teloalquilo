import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from "react-router-dom"
import './index.css'
import { useLastUrl } from '../../contexts/pathContext';

function CloseIcon({fallBack}:{fallBack?:string}) {
    const navigate = useNavigate()
    const {urlHistory} = useLastUrl()
    const handleCloseIcon = () => {
      if(urlHistory && urlHistory.length > 1){
        navigate(urlHistory[urlHistory.length-2])
      } else {
        if (fallBack) {
          navigate(fallBack)
        } else {
          navigate('/home')
        }
      }
    }
  return (
    <div className="CloseIcon" onClick={handleCloseIcon}>
        <CancelIcon sx={{width:"50px", height:"50px"}}/>
    </div>
  )
}

export default CloseIcon