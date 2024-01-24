import EditIcon from '@mui/icons-material/Edit';
import { ProductModel } from '../../../../models/product/productModel';
import ProductCard from '../../../../components/ProductCard';
import './index.css'
import { IconButton, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react';
import SetMinProductDataForm from '../../../../components/SetMinProductData';
import LampLoader from '../../../../commons/LampLoader';
import Snackbar from '@mui/material/Snackbar';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, Box } from '@mui/material'
import { UserSessionContext } from '../../../../contexts/authContext';
import OverScreen from '../../../../commons/OverScreen';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import useProducts from '../../../../hooks/useGetProducts';
import { useLoadingContext } from '../../../../contexts/loadingContext';

interface ProfileProductsProps {
  products:ProductModel[],
  editing?:boolean,
  setSeeResetFilters?:React.Dispatch<React.SetStateAction<boolean>>,
  setProducts: React.Dispatch<React.SetStateAction<ProductModel[]>>
}

function ProfileProducts( {products, editing, setSeeResetFilters, setProducts}:ProfileProductsProps){
  const {userSession} = useContext(UserSessionContext)
  const {isLoading, setIsLoading} = useLoadingContext()
  const [ managingProduct, setManagingProduct ] = useState(false)
  const [ deletingProduct, setDeletingProduct ] = useState(false)
  const [ selectedProduct, setSelectedProduct ] = useState<ProductModel|null>(null)
  const Products = useProducts()

  const handleDeleteAttemp = (product:ProductModel) => {
    setManagingProduct(false)
    setDeletingProduct(true)
    setSelectedProduct(product)
  }
  const handleEditProduct = (product:ProductModel) => {
    setSelectedProduct(product)
    setDeletingProduct(false)
    setManagingProduct(true)
  }
  const handleDeleteProduct = async () => {
    setIsLoading(true)
    Products.deleteProduct({
      token:userSession.token!,
      selectedProduct:selectedProduct,
      setProducts:setProducts,
      products:products,
      setSelectedProduct:setSelectedProduct
    })
    setDeletingProduct(false)
    setIsLoading(false)
  }
  const handleClose = () => {
    setSelectedProduct(null)
    setDeletingProduct(false)
  }

  const handleChangeAvailability = () => {
    if (!selectedProduct) return
    setIsLoading(true)
    Products.changeAvailability({
      token:userSession.token!,
      selectedProduct:selectedProduct,
      setSelectedProduct:setSelectedProduct})
    setDeletingProduct(false)
    setIsLoading(false)
  }
  
  useEffect(() => {
    if (!products) return
    if (setSeeResetFilters) {
      if (products.length === 0){
        setSeeResetFilters(true)
      } else {
        setSeeResetFilters(false)
      }
    }
  },[products])
  return (
    <>
    {products?
      <>
        <div className='MappedProducts NoScrollBar'>
          {products.map((product) => (
            <div className='ProductContainer' key={product._id}>
              <ProductCard key={product.description} product={product}/>
              {editing && 
              <Box sx={{display:'flex', flexDirection:'column-reverse', position:'absolute', bottom:0, right:0, gap:2
              }}>
                <IconButton
                size="large"
                onClick={() => handleEditProduct(product)}
                sx={{bgcolor:'#346beb'}}
                >
                  <EditIcon/>
                </IconButton>
                <IconButton
                size="large"
                onClick={() => handleDeleteAttemp(product)}
                sx={{bgcolor:product.able?'#FF3333' : 'green'}}
                >
                  {product.able?
                    <DeleteIcon color='action'/>
                  :
                    <AutorenewIcon color='action'/>
                  }
                </IconButton>
              </Box>}
            </div>
        ))}
      </div>
      {products.length === 0 && 
        <LampLoader/>
      }
    </>
        :
    <LampLoader/>
    }
    {managingProduct && selectedProduct &&
      <OverScreen onClick={() => {setSelectedProduct(null)}}>
        <Box sx={{bgcolor:'#fff', p:8, maxHeight:'80vh', overflowY:'scroll', position:'relative', maxWidth:'50vw'}}>
          <Box sx={{fontSize:'35px', position:'absolute', top:8, left:8}}>Editar Producto:</Box>
          <SetMinProductDataForm
          setSelectedProduct={setSelectedProduct}
          setManagingProduct={setManagingProduct}
          product={selectedProduct!}/>
        </Box>
      </OverScreen>
    }
    {deletingProduct && selectedProduct && 
      <Dialog
      open
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" fontSize={'26px'}>
        ¿Seguro que quieres eliminar o deshabilitar el producto '{selectedProduct.title}'?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Puedes eliminar el producto permanentemente o marcarlo como no disponible para volver a usarlo más adelante.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button disabled={isLoading} variant='contained' onClick={handleClose}>Cancelar</Button>
        <Button disabled={isLoading} color={selectedProduct.able? 'info' : 'success'} variant='contained' onClick={handleChangeAvailability}>{selectedProduct.able? 'Marcar como No Disponile' : 'Marcar como disponible'}</Button>
        <Button disabled={isLoading} color='error' variant='contained' onClick={handleDeleteProduct}>
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
    }
    </>
  )
}

export default ProfileProducts