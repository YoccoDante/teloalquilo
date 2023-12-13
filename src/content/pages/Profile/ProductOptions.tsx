import { Box, Snackbar, Tab, Alert } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { useState } from 'react'
import { Button } from '@mui/material'
import './index.css'
import AddProduct from './AddProduct'
import OverScreen from '../../../commons/OverScreen'
import { WithResponseModel } from '../../../models/withResponse'

interface ProductOperationsProps {
  setManaging:React.Dispatch<React.SetStateAction<boolean>>,
  setWithResponse: React.Dispatch<React.SetStateAction<WithResponseModel | null>>
}

function ProductOperations({setManaging, setWithResponse}:ProductOperationsProps) {
  const [ currentTab, setCurrenTab ] = useState('1')
  const [ isLoading, setIsLoading ] = useState(false)
  const handleChange = (e:React.SyntheticEvent, value:string) => {
    setCurrenTab(value)
  }
  return (
    <OverScreen>
      <>
      <Box 
      sx={{
        bgcolor:'#fff',
        width:{xs:'370px', md:'600px'},
        height:'90vh',
        mt:8,
        overflowY:'scroll',
        overflowX:'hidden',
        display:'flex',
        flexDirection:'column',
        }}>        <TabContext value={currentTab}>
          <Box
          borderBottom={1}
          borderColor='divider'
          bgcolor='#6ab7ff'
          sx={{position:'sticky', top:0}}>
            <TabList centered onChange={handleChange} aria-label='Admin tabs' textColor='secondary'>
              <Tab color='#fff' value='1' label='Añadir Producto'/>
            </TabList>
          </Box>
          <TabPanel value='1'><AddProduct isLoading={isLoading} setIsLoading={setIsLoading} setManaging={setManaging} setWithResponse={setWithResponse}/></TabPanel>
        </TabContext>
      </Box>
      <Box
        sx={{position:'fixed', top:0, display:'flex', justifyContent:'center', alignItems:'center', pt:2}}> 
        <Button
        disabled={isLoading}
        sx={{width:{xs:'100%', md:'fit-content'}, px:'5px'}}
        variant='contained'
        color='error'
        onClick={() => setManaging(false)}
        >
            Cancelar Gestión
        </Button>
      </Box>
      </>
    </OverScreen>
  )
}

export default ProductOperations