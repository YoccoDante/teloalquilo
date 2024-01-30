import { Box, Pagination, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { useContext, useEffect, useState } from 'react'
import { UserSessionContext } from '../../../contexts/authContext'
import ProfilePage from './ProfilePage'
import MyProducts from './MyProducts'
import ProfileOperations from './ProfileOparations'
import { useProfileContext } from '../../../contexts/profileContext'
import useProducts from '../../../hooks/useGetProducts'

function Profiletabs() {
  const {userSession} = useContext(UserSessionContext)
  const userId = userSession.user!._id
  const {products, setProducts} = useProfileContext()
  const Products = useProducts()
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(0)
  const pageSize = 10
  const handleProductPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  useEffect(() => {
      async function getProducts () {
          if (!userId) return
          const {products, pages} = await Products.getProductsById({
            userId:userId,
            page:page,
            pageSize:pageSize
          })
          setProducts(products)
          setPages(pages)
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
          <>
            <MyProducts/>
            <Pagination
              count={pages} 
              page={page} 
              onChange={handleProductPageChange} 
              sx={{ 
                position: 'fixed',
                bottom: 0,
                zIndex: 1,
              }}
            />
          </>
        }
        </TabPanel>
        <ProfileOperations/>
      </TabContext>
    </Box>
  )
}

export default Profiletabs