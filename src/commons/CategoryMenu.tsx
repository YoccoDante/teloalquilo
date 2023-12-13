import React from 'react'
import { useState } from 'react'
import { Button, Menu, MenuItem } from '@mui/material'

interface CategoryMenuProps {
  setCategory:React.Dispatch<React.SetStateAction<string|null>>,
  category:string|null
}

function CategoryMenu({setCategory, category}:CategoryMenuProps) {
  const [ anchorElement, setAnchorElement ] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorElement)
  const categoryOptions = ["habitación", "minidepartamento", "departamento", "casa","garaje","duplex","room mate"]
  const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorElement(null)
  }
  const selectOption = (option:string) => {
    setAnchorElement(null)
    setCategory(option)
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
      onClick={handleClick}>{category? category : 'Seleccionar Categoría'}</Button>
    <Menu
    anchorEl={anchorElement}
    open={open}
    MenuListProps={{
      'aria-labelledby': 'category-button'
    }}
    onClose={handleClose}
    id='category-menu'>
      {categoryOptions.map((option) => 
        <MenuItem onClick={() => selectOption(option)} key={option}>{option}</MenuItem>
      )}
    </Menu>
    </>
  )
}

export default CategoryMenu