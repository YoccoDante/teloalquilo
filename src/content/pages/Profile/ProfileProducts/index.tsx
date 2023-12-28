import EditIcon from '@mui/icons-material/Edit';
import { ProductModel } from '../../../../models/product/productModel';
import ProductCard from '../../../../components/ProductCard';
import './index.css'
import { IconButton, Button } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react';
import SetMinProductDataForm from '../../../../components/SetMinProductData';
import LampLoader from '../../../../commons/LampLoader';
import Snackbar from '@mui/material/Snackbar';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, Box } from '@mui/material'
import { WithResponseModel } from '../../../../models/withResponse';
import { UserSessionContext } from '../../../../contexts/authContext';
import OverScreen from '../../../../commons/OverScreen';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { BACKEND_TOOLS } from '../../../../models/BACKEND_TOOLS';

interface ProfileProductsProps {
  products:ProductModel[],
  editing?:boolean,
  setSeeResetFilters?:React.Dispatch<React.SetStateAction<boolean>>,
  setProducts: React.Dispatch<React.SetStateAction<ProductModel[]>>
}

const API = BACKEND_TOOLS.API_URI+'/product/'

function ProfileProducts( {products, editing, setSeeResetFilters, setProducts}:ProfileProductsProps){
  const {userSession} = useContext(UserSessionContext)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ withResponse, setWithResponse ] = useState<WithResponseModel | null>(null)
  const [ managingProduct, setManagingProduct ] = useState(false)
  const [ deletingProduct, setDeletingProduct ] = useState(false)
  const [ selectedProduct, setSelectedProduct ] = useState<ProductModel|null>(null)

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
    const token = userSession.token? userSession.token : ''
    const product_id = selectedProduct?._id? selectedProduct._id : ''
    const deleteData = {token:token, product_id:product_id}
    try {
      const res = await fetch(API,{
        headers:{
          'Content-Type':'application/json',
          'Enterprise-Id':BACKEND_TOOLS.ENTERPRISE_ID,
          'Authorization':userSession.token!
        },
        method:'DELETE',
        body:JSON.stringify(deleteData)
      })
      const data = await res.json()
      if (res.ok) {
        setWithResponse({msg:'¡Eliminado correctamente!', color:'success'})
        const newProducts = products.filter((product) => product._id !== selectedProduct?._id)
        setProducts(newProducts)
      }
      if (!res.ok) {
        setWithResponse({msg:JSON.stringify(data), color:'error'})
      }
    }catch (error) {
      setWithResponse({msg:'Ha ocurrido un error, intentalo más tarde!', color:'error'})
    }
    finally {
      setSelectedProduct(null)
      setDeletingProduct(false)
      setIsLoading(false)
    }
  }
  const handleClose = () => {
    setSelectedProduct(null)
    setDeletingProduct(false)
  }
  const handleChangeAvailability = async () => {
    setIsLoading(true)
    const product_id = selectedProduct? selectedProduct._id : ''
    const able = !selectedProduct?.able

    const formData = new FormData();
    formData.append('product_id', product_id)
    formData.append('atributes', JSON.stringify({able:able}))
    
    try {
      const res = await fetch(API,{
        headers:{
          'Enterprise-Id':BACKEND_TOOLS.ENTERPRISE_ID,
          'Authorization':userSession.token!
        },
        method:'PUT',
        body: formData
      })
      const data = await res.json()
      if (res.ok) {
        setWithResponse({msg:!able?'Producto suspendido correctamente!':'Producto recuperado correctamente', color:'success'})
        selectedProduct!.able = !selectedProduct?.able
      }
      if (!res.ok) {
        setWithResponse({msg:JSON.stringify(data), color:'error'})
      }
    }catch (error) {
      setWithResponse({msg:'Ha ocurrido un error, intentalo más tarde!', color:'error'})
    }
    finally {
      setSelectedProduct(null)
      setDeletingProduct(false)
      setIsLoading(false)
    }
  }
  useEffect(() => {
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
    {managingProduct && selectedProduct &&
      <OverScreen onClick={() => {setSelectedProduct(null)}}>
        <Box sx={{bgcolor:'#fff', p:8, maxHeight:'80vh', overflowY:'scroll', position:'relative', maxWidth:'50vw'}}>
          <Box sx={{fontSize:'35px', position:'absolute', top:8, left:8}}>Editar Producto:</Box>
          <SetMinProductDataForm
          setSelectedProduct={setSelectedProduct}
          isLoading={isLoading}
          setManagingProduct={setManagingProduct}
          setWithResponse={setWithResponse}
          setIsLoading={setIsLoading}
          product={selectedProduct!}/>
        </Box>
      </OverScreen>
    }
    {withResponse &&
      <Snackbar/>
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
    <Snackbar open={withResponse !== null} onClose={() => setWithResponse(null)} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert  severity={withResponse?.color} sx={{ width: '100%' }}>
        {withResponse?.msg}
      </Alert>
    </Snackbar>
    </>
  )
}

export default ProfileProducts