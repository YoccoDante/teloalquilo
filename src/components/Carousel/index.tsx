import { useState } from "react"
import "./index.css"
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AdjustIcon from '@mui/icons-material/Adjust';
import CircleIcon from '@mui/icons-material/Circle';

interface CarouselProps {
    imgs:string[]
}

function Carousel( {imgs}:CarouselProps ) {
    const lenght = imgs.length
    const [ currentIndex, setCurrentIndex ] = useState(0)
    const handleNext = () => {
        if (currentIndex + 1 !== lenght){
        setCurrentIndex(currentIndex+1)
        }else{
        setCurrentIndex(0)
        }
    }
    const handlePrev = () => {
        if (currentIndex - 1 >= 0){
        setCurrentIndex(currentIndex-1)
        }else{
        setCurrentIndex(lenght-1)
        }
    }
    const handleDotClick = (index:number) => {
        setCurrentIndex(index)
        console.log(index)
    }
  return (
    <div className="CarouselContainer">
      <div className="ImageContainer">
        <img className="Image" src={imgs[currentIndex]}/>
      </div>
      <div className="Button Left" onClick={handlePrev}><NavigateBeforeIcon sx={{ fontSize:46, color:"#fff" }}/></div>
      <div className="Button Right"onClick={handleNext}><NavigateNextIcon sx={{ fontSize:46, color:"#fff" }}/></div>
        <ul className="Dots">
            {imgs.map((img, index) => (
                <li className="Dot" key={index} onClick={() => handleDotClick(index)}>
                    {index === currentIndex? <CircleIcon sx={{ fontSize:26,color:"#fff" }}/> : <AdjustIcon sx={{ fontSize:26, color:"#fff"}}/>}
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Carousel