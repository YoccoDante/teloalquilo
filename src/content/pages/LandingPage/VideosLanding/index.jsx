import videoBg from '../../../../assets/videoBg.mp4'
import './index.css'
import { Link } from 'react-router-dom'

const VideoLanding = () => {
  return (
      <div className='container'>
        <video src={videoBg} autoPlay loop muted preload/>
        <div className='leyenda'>
          <h2>NombreDeMarca.com</h2>
          <h3>Buscas dnd vivir?</h3>
          <div>
            <Link to="/">{"Quiés somos >"}</Link>
            <Link to="/">{"Contacto >"}</Link>
          </div>
        </div>
      </div>
  )
}

export default VideoLanding