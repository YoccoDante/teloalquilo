import React from 'react'
import { useState } from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface GenderMenuProps {
  setGender:React.Dispatch<React.SetStateAction<string>>
}

function GenderMenu({setGender}:GenderMenuProps) {
  const [ anchorElement, setAnchorElement ] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorElement)
  const categoryOptions = ["Masculino", "Femenino", "Prefiero no decirlo"]
  const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorElement(null)
  }
  const selectOption = (option:string) => {
    setAnchorElement(null)
    setGender(option)
  }
  return (
    <>
    <Button
      sx={{position:'relative'}}
      id='category-button'
      aria-controls={open? 'category-menu' : undefined}
      aria-haspopup='true'
      aria-expanded={open? 'true':undefined}
      variant='contained'
      endIcon={<ExpandMoreIcon/>}
      onClick={handleClick}>Seleccionar género</Button>
    <Menu
    anchorEl={anchorElement}
    open={open}
    MenuListProps={{
      'aria-labelledby': 'category-button'
    }}
    onClose={handleClose}
    id='category-menu'>
      {categoryOptions.map((option) => 
        <MenuItem onClick={() => {
          switch (option){
            case categoryOptions[0]:
              selectOption('male')
              break
            case categoryOptions[1]:
              selectOption('female')
              break
            case categoryOptions[2]:
              selectOption('other')
              break
          }
        }} key={option}>{option}</MenuItem>
      )}
    </Menu>
    </>
  )
}

export default GenderMenu