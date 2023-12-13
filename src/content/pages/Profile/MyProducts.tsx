import { Container, Typography } from '@mui/material'
import ProfileProducts from './ProfileProducts';
import useFilterProducts from '../../../hooks/useFilterProducts';
import FilterBar from '../../../components/FilterBar'
import { ProductModel } from '../../../models/product/productModel'
import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, SpeedDial,  } from '@mui/material'
import { UserSessionContext } from '../../../contexts/authContext';

function MyProducts({products, setProducts}:{products:ProductModel[], setProducts:React.Dispatch<React.SetStateAction<ProductModel[]>>}) {
  const { userSession } = useContext(UserSessionContext)
  const [ selectedProduct, setSelectedProduct ] = useState(false)
  const [ seeResetFilters, setSeeResetFilters ] = useState(false)
  const productsTools = useFilterProducts( {products} )
  useEffect(() => {
    if (productsTools.filteredProducts.length === 0){
      setSeeResetFilters(true)
    }else{
      setSeeResetFilters(false)
    }
  },[productsTools.filteredProducts])
  return (
    <Container sx={{mb:8}}>
      <Box sx={{display:'flex', flexDirection:{xs:'column',md:'row'}, alignItems:'center', mt:6, position:'relative'}}>
        <Typography position='relative' variant="h3" fontSize='26px'>Productos:</Typography>
        <Button
        sx={{
          position:{xs:'block', md:'absolute'},
          right:0
        }}
        variant='contained'
        color={selectedProduct? 'error' : 'primary'}
        onClick={() => setSelectedProduct(!selectedProduct)}
        >
          {selectedProduct? 'Cancelar Gestion' : 'Gestionar Productos'}
        </Button>
      </Box>
      <FilterBar seeResetFilters={seeResetFilters} changeFilters={productsTools.setFilters}/>
      <ProfileProducts editing={selectedProduct} products={productsTools.filteredProducts} setProducts={setProducts}/>
    </Container>
  )
}

export default MyProducts