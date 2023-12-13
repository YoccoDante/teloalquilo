import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from "react-router-dom"
import './index.css'
import { useLastUrl } from '../../contexts/pathContext';

function CloseIcon(  ) {
    const navigate = useNavigate()
    const {urlHistory} = useLastUrl()
    const handleCloseIcon = () => {
      if(urlHistory){
        navigate(urlHistory[urlHistory.length-2 ])
      }
    }
  return (
    <div className="CloseIcon" onClick={handleCloseIcon}>
        <CancelIcon sx={{width:"50px", height:"50px"}}/>
    </div>
  )
}

export default CloseIcon