import React from 'react'
import {useState, useEffect} from 'react'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarRateIcon from '@mui/icons-material/StarRate';

function StarRate() {
    const [board, setBoard] = useState(Array(5).fill(<StarBorderIcon/>))
    const updateStar = (index) => {
      const newBoard = [... board]
      
      for (let i = 0; i < 5; i++) {
        if (i < index+1){
          newBoard[i] = <StarRateIcon/>;
        }
        else{
          newBoard[i] = <StarBorderIcon/>
        }
      }

      setBoard(newBoard)
    }

    const Star = ({children, index, updateStar}) => {
      const handleClick = (e) => {
        e.preventDefault();
        updateStar(index)
      } 
      return (
        <a href='#' onClick={handleClick}>{children}</a>
      )
    }
    /**/
  return (
    <>
    <h1>estrellas:</h1>
    <div>{board.map((_, index)=>
      <Star key={index}
      index={index}
      updateStar = {updateStar}>
        {board[index]}
      </Star>
      )}</div>
    </>
  )
}

export default StarRate