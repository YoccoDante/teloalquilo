import { Box, Typography, TextField, Button, Grid } from '@mui/material'
import './index.css'
import React, { useContext, useState } from 'react'
import CategoryMenu from '../../../commons/CategoryMenu'
import PhotoPreview from '../../../components/PhotoPreview'
import { UserSessionContext } from '../../../contexts/authContext'
import { WithResponseModel } from '../../../models/withResponse'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { BACKEND_TOOLS } from '../../../models/BACKEND_TOOLS'

interface AddProductProps {
  setWithResponse:React.Dispatch<React.SetStateAction<WithResponseModel | null>>,
  setManaging:React.Dispatch<React.SetStateAction<boolean>>,
  isLoading:boolean,
  setIsLoading:React.Dispatch<React.SetStateAction<boolean>>
}

function AddProduct({setWithResponse, setManaging, isLoading, setIsLoading}:AddProductProps) {
  const {userSession} = useContext(UserSessionContext)
  const [ openDialog, setOpenDialog ] = useState(isLoading)
  const [ title, setTitle ] = useState('')
  const [ region, setRegion ] = useState('')
  const [ province, setProvince ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ category, setCategory ] = useState<string|null>(null)
  const [ price, setPrice ] = useState<number>(0)
  const [ files, setFiles ] = useState<null | FileList>(null)
  const [ imgs, setImgs ] = useState<string[]>([])

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
    const formData = new FormData()
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
    setIsLoading(true)
    const API = BACKEND_TOOLS.API_URI+'/product/new'
    try{
      const res = await fetch(API,{
        headers:{
          'Authorization':userSession.token!,
          'Enterprise-Id':BACKEND_TOOLS.ENTERPRISE_ID
        },
        method:'POST',
        body:formData
      })
      const data = await res.json()
      if (res.ok) {
        setWithResponse({msg:'¡Producto cargado Exsitosamente!', color:'success'})
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
      setManaging(false)
    }
  }
  
  return (
    <Box
      sx={{width:'100%', padding: 2}}
      component='form'
      onSubmit={handleSubmit}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Título del producto:</Typography>
          <TextField required fullWidth onChange={(e) => setTitle(e.target.value)} label='Título' placeholder='Mi nuevo producto'/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Región:</Typography>
          <TextField required fullWidth onChange={(e) => setRegion(e.target.value)} label='Región' placeholder='Región'/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Provincia:</Typography>
          <TextField required fullWidth onChange={(e) => setProvince(e.target.value)} label='Provincia' placeholder='Provincia'/>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Descripción:</Typography>
          <TextField required fullWidth multiline rows={4} onChange={(e) => setDescription(e.target.value)} label='Descripción' placeholder='Descripción'/>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Categoría:</Typography>
          <CategoryMenu setCategory={setCategory} category={category}/>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Precio (solo números):</Typography>
          <TextField required fullWidth onChange={handleChangePrice} label='Precio' placeholder='Precio'/>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Selecciona las imágenes:</Typography>
          <PhotoPreview photos={imgs}/>
        </Grid>
      </Grid>
      <Box sx={{height:'100px', display:'flex', flexDirection:'column', gap:'10px', mt:6}}>
        <input className='MultiplePicInput' type='file' onChange={handleSelectImgs} placeholder='Buscar imgágenes' multiple hidden/>
        <Button disabled={isLoading} onClick={() => document.querySelector<HTMLInputElement>('.MultiplePicInput')!.click()} fullWidth variant='contained'>Buscar Imágenes</Button>
        <Button disabled={isLoading}  type='submit' variant='contained' fullWidth>Añadir Producto</Button>
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

export default AddProduct