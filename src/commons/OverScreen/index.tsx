import React, { MouseEventHandler } from 'react'
import { Box } from '@mui/material'
import { JsxElement } from 'typescript'

interface OverScreenProps {
  children:JSX.Element,
  onClick?:MouseEventHandler
}

function OverScreen({children, onClick}:OverScreenProps) {
  return (
    <Box
    className='BlackBG'
    onClick={onClick}
    sx={{
      position:'fixed',
      top:0,
      left:0,
      width:'100vw',
      zIndex:4,
      height:'100vh',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      overflowY:'hidden'
    }}>
      <div onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </Box>
  )
}

export default OverScreen