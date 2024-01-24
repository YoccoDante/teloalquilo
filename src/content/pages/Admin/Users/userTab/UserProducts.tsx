import React, {useState, useEffect, useRef} from 'react'
import { Box, Button, Pagination, Typography } from '@mui/material'
import { ProductModel } from '../../../../../models/product/productModel'
import ProductsTab from '../productsTab/ProductsTab'
import { useLoadingContext } from '../../../../../contexts/loadingContext'
import { UserModel } from '../../../../../models/user/userModel'
import useProducts from '../../../../../hooks/useGetProducts'

interface UserProductsProps {
  selectedUser:UserModel|null,
  seeProducts:boolean,
  setSeeProducts: React.Dispatch<React.SetStateAction<boolean>>,
  fetchProducts:any,
  lastFetchedUserId:any
}

function UserProducts({lastFetchedUserId, selectedUser, seeProducts, setSeeProducts, fetchProducts}:UserProductsProps) {
  const {isLoading, setIsLoading} = useLoadingContext()
  const [products, setProducts] = useState<ProductModel[]>([])
  const [page, setPage] = useState(1)
  const Products = useProducts()
  const [pages, setPages] = useState(0)
  const pageSize = 10

  const getProducts = async () => {
    if (!seeProducts) return
    setIsLoading(true)
    if (!selectedUser){
      setIsLoading(false)
      return
    }
    const {products, pages} = await Products.getProductsById({
      userId:selectedUser._id,
      page:page,
      pageSize:pageSize
    })
    setProducts(products)
    setPages(pages)
    setIsLoading(false)
    lastFetchedUserId.current = selectedUser._id
  }
  const handleProductPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  useEffect(() => {
    if (selectedUser && selectedUser._id === lastFetchedUserId.current) {
      return;
    }
    setPage(1)
    setPages(0)
    getProducts()
  },[selectedUser])
  return (
    <Box
    sx={{
        position:'relative',
        width: '50vw', 
        height: '80vh', 
        bgcolor: '#fff',
        p:4,
        boxSizing:'border-box',
        overflowX:'scroll'
    }}>
    <Button
        onClick={() =>{
          setSeeProducts(false)
        }}
        variant='contained'
        color='error'
        style={{
            position:'absolute',
            top:'-50px',
            left:0
    }}>Cerrar vista</Button>
    {isLoading?
      <p style={{fontSize:'24px', textAlign: 'center'}}>Cargando producos, un momento</p>
      :
      <>
        <ProductsTab
            products={products}
            setProducts={setProducts}
            fetchProducts={fetchProducts}
        />
        <Pagination
          count={pages} 
          page={page} 
          onChange={handleProductPageChange} 
          sx={{ 
            position: 'absolute',
            bottom: 0,
            zIndex: 1,
          }}
        />
      </>
    }
    </Box>
  )
}

export default UserProducts