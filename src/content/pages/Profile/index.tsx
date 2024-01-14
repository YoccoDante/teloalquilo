import { Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { useContext, useEffect, useState } from 'react'
import { UserSessionContext } from '../../../contexts/authContext'
import ProfilePage from './ProfilePage'
import MyProducts from './MyProducts'
import useGetProductsById from '../../../hooks/useGetProductsById'
import ProfileOperations from './ProfileOparations'
import { ProductModel } from '../../../models/product/productModel'

function Profiletabs() {
  const {userSession} = useContext(UserSessionContext)
  const userId = userSession.user!._id
  const [products, setProducts] = useState<ProductModel[]>([])
  const Products = useGetProductsById()
  useEffect(() => {
      async function getProducts () {
          if (!userId) return
          const {products} = await Products.getProducts({userId:userId})
          setProducts(products)
      }
      getProducts()
  },[])
  const [ currentTab, setCurrenTab ] = useState('1')
  const handleChange = (e:React.SyntheticEvent, value:string) => {
    setCurrenTab(value)
  }
  return (
    <Box>
      <TabContext value={currentTab}>
        <Box borderBottom={1} borderColor='divider' bgcolor='#6ab7ff'>
          <TabList centered onChange={handleChange} aria-label='Admin tabs' textColor='secondary'>
            <Tab color='#fff' value='1' label='Perfíl'/>
            {userSession.user?.range === 'host' && 
              <Tab color='#fff' value='2' label='Mis productos'/>
            }
          </TabList>
        </Box>
        <TabPanel value='1'>
          <ProfilePage/>
        </TabPanel>
        <TabPanel value='2'>
        {products && userSession.user?.range === 'host' &&
          <MyProducts products={products} setProducts={setProducts}/>
        }
        </TabPanel>
        <ProfileOperations/>
      </TabContext>
    </Box>
  )
}

export default Profiletabs