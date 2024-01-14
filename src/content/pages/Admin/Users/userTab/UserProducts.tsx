import React from 'react'
import { Box, Button } from '@mui/material'
import { ProductModel } from '../../../../../models/product/productModel'
import ProductsTab from '../productsTab/ProductsTab'
import { WithResponseModel } from '../../../../../models/withResponse'

interface UserProductsProps {
    products:ProductModel[],
    setSelectedUser: React.Dispatch<React.SetStateAction<string|null>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setProducts: React.Dispatch<React.SetStateAction<ProductModel[]>>,
    setWithResponse:React.Dispatch<React.SetStateAction<WithResponseModel|null>>,
}

function UserProducts({products, setSelectedUser, setIsLoading, setProducts, setWithResponse}:UserProductsProps) {
  return (
    <Box
    sx={{
        position:'relative',
        width: '50vw', 
        height: '80vh', 
        bgcolor: '#fff',
        p:4,
        boxSizing:'border-box'
    }}>
    <Button
        onClick={() => setSelectedUser(null)}
        variant='contained'
        color='error'
        style={{
            position:'absolute',
            top:'-50px',
            left:0
    }}>Cerrar vista</Button>
    <ProductsTab
        products={products}
        setIsLoading={setIsLoading}
        setProducts={setProducts}
        setWithResponse={setWithResponse}
    />
    </Box>
  )
}

export default UserProducts