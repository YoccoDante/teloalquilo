import React, { MouseEventHandler } from 'react'
import { Box, Dialog } from '@mui/material'

interface OverScreenProps {
  children:JSX.Element,
  onClick?:MouseEventHandler
}

function OverScreen({children, onClick}:OverScreenProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflowY: 'hidden',
        zIndex: 4,
        bgcolor: 'rgba(0, 0, 0, 0.5)'
      }}
    >
      <div onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </Box>
  )
}

export default OverScreen