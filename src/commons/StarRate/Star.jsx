import React, { useState, useEffect } from 'react'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarRateIcon from '@mui/icons-material/StarRate';

/*const handleClick = (e) => {
  e.preventDefault();
  console.log("Clicked")
  
}*/
const handleClick = (e) => {
  e.preventDefault()
}
function Star(props) {
  const [selected, setSelected] = useState(false)
  const [currentPosition, setCurrentPosition] = useState(props.position)
  useEffect (()=>{
    if(currentPosition < props.rate){
    setSelected(true)
    }else{
      setSelected(false)
    }
  },[selected])
  return (
    <>
      {selected? <StarRateIcon/> : <StarBorderIcon/>} 
    </>
  )
}

export default Star