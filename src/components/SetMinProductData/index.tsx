import { Box, Typography, TextField,Button,Grid} from '@mui/material'
import './index.css'

import React, {useContext, useState } from 'react'
import CategoryMenu from '../../commons/CategoryMenu'
import PhotoPreview from '../PhotoPreview'
import { UserSessionContext } from '../../contexts/authContext'
import { WithResponseModel } from '../../models/withResponse'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { PRODUCT_CATEGORIES, ProductModel } from '../../models/product/productModel'
import { useEffect } from 'react'
import { BACKEND_TOOLS } from '../../models/BACKEND_TOOLS'

interface SetMinProductDataProps {
  product:ProductModel,
  setSelectedProduct:React.Dispatch<React.SetStateAction<ProductModel | null>>,
  setWithResponse:React.Dispatch<React.SetStateAction<WithResponseModel | null>>,
  setManagingProduct:React.Dispatch<React.SetStateAction<boolean>>,
  isLoading:boolean,
  setIsLoading:React.Dispatch<React.SetStateAction<boolean>>
}

function SetMinProductDataForm ({product, setSelectedProduct, setWithResponse, setManagingProduct, isLoading, setIsLoading}:SetMinProductDataProps) {
  const {userSession} = useContext(UserSessionContext)
  const [ title, setTitle ] = useState(product.title)
  const [ region, setRegion ] = useState(product.region)
  const [ province, setProvince ] = useState(product.province)
  const [ description, setDescription ] = useState(product.description)
  const [ category, setCategory ] = useState<string|null>(product.category)
  const [ price, setPrice ] = useState<number>(product.price)
  const [ files, setFiles ] = useState<null | FileList>(null)
  const [ imgs, setImgs ] = useState<string[]>(product.imgs)

  const handleSelectImgs = (e:React.ChangeEvent<HTMLInputElement>) => {
    const urls = []
    if (!e.target.files) {
      return
    }
    for (let i = 0; i<e.target.files.length; i++){
      urls.push(URL.createObjectURL(e.target.files[i]))
    }
    setImgs(urls)
    setFiles(e.target.files)
  }

  const handleChangePrice = (e:React.ChangeEvent<HTMLInputElement>) => {
    const stringValue = e.target.value
    const numericValue = parseInt(stringValue.replace(/\D/g, ''),10)
    setPrice(isNaN(numericValue)? 0 : numericValue)
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const API = BACKEND_TOOLS.API_URI+'/product/'
    const formData = new FormData()
    formData.append('product_id', product._id)
    formData.append('title',title)
    formData.append('region',region)
    formData.append('province',province)
    formData.append('description',description)
    formData.append('category',category? category : 'casa')
    formData.append('price',price.toString())
    formData.append('stock', '1')
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('imgs', files[i]); // Append each File individually
      }
    }
    try{
      const res = await fetch(API,{
        headers:{
          'Content-Type':'application/json',
          'Authorization':userSession.token!,
          'Enterprise-Id':BACKEND_TOOLS.ENTERPRISE_ID
        },
        method:'PUT',
        body:formData
      })
      const data = res.json()
      if (res.ok) {
        setWithResponse({msg:'¡Producto cargado Exsitosamente!', color:'success'})
        product.title = title
        product.category = category?category:'casa'
        product.description = description
        product.region = region
        product.province = province
        product.price = price
      }
      if (!res.ok) {
        setWithResponse({msg:JSON.stringify(data), color:'error'})
      }
    }
    catch (error) {
      setWithResponse({msg:'¡Ha ocurrido un error, inténtalo más tarde!', color:'error'})
    }
    finally{
      setIsLoading(false)
      setManagingProduct(false)
      setSelectedProduct(null)
    }
  }

  useEffect(() => {
    setTitle(product.title)
    setCategory(product.category)
    setDescription(product.description)
    setRegion(product.region)
    setProvince(product.province)
    setPrice(product.price)
  },[])
  
  return (
    <Box
      sx={{width:'50vw', padding: 2}}
      component='form'
      onSubmit={handleSubmit}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Título del producto:</Typography>
          <TextField
            required
            fullWidth
            onChange={(e) => setTitle(e.target.value)}
            label='Título'
            defaultValue={product.title}
            placeholder='sas'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Región:</Typography>
          <TextField
            required
            fullWidth
            onChange={(e) => setRegion(e.target.value)}
            label='Región'
            defaultValue={product.region}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Provincia:</Typography>
          <TextField
            required
            fullWidth
            onChange={(e) => setProvince(e.target.value)}
            label='Provincia'
            defaultValue={product.province}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Descripción:</Typography>
          <TextField
            required
            fullWidth
            multiline rows={4} onChange={(e) =>
            setDescription(e.target.value)}
            label='Descripción'
            defaultValue={product.description}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Categoría:</Typography>
          <CategoryMenu setCategory={setCategory} category={category}/>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Precio (solo números):</Typography>
          <TextField
            required
            fullWidth
            onChange={handleChangePrice} label='Precio' defaultValue={
            product.price}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Selecciona las imágenes:</Typography>
          <PhotoPreview photos={imgs}/>
        </Grid>
      </Grid>
      <Box sx={{height:'100px', display:'flex', flexDirection:'column', gap:'10px', mt:6}}>
        <input className='MultiplePicInput' type='file' onChange={handleSelectImgs} placeholder='Buscar imgágenes' multiple hidden/>
        <Button disabled={isLoading} onClick={() => document.querySelector<HTMLInputElement>('.MultiplePicInput')!.click()} fullWidth variant='contained'>Buscar Imágenes</Button>
        <Button disabled={isLoading}  type='submit' variant='contained' fullWidth>Guardar Cambios</Button>
      </Box>
      <Dialog
        open={isLoading}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¡Esto puede tardar unos segundos!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Espere por favor...
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default SetMinProductDataForm