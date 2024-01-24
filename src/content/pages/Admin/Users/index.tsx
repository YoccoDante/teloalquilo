import React, { useEffect, useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Tab from '@mui/material/Tab';
import { Typography, Pagination } from '@mui/material';
import useUser from '../../../../hooks/useUser';
import { UserModel } from '../../../../models/user/userModel';
import UserTab from './userTab/UserTab';
import ProductsTab from './productsTab/ProductsTab';
import useGetProducts from '../../../../hooks/useGetProducts';
import { ProductModel } from '../../../../models/product/productModel';
import { useWithResponseContext } from '../../../../contexts/snackBarContext';
import { useLoadingContext } from '../../../../contexts/loadingContext';

function Users() {
  const {setIsLoading} = useLoadingContext()
  const {setWithResponse} = useWithResponseContext()
  const [value, setValue] = useState<string>('1');
  const [userPage, setUserPage] = useState(1)
  const [productPage, setProductPage] = useState(1)
  const [users, setUsers] = useState<UserModel[] | null>(null)
  const [products, setProducts] = useState<ProductModel[]>([])
  const [totalUsers, setTotalUsers] = useState(1)
  const [totalProducts, setTotalProducts] = useState(1)
  const Products = useGetProducts()
  const Users = useUser()
  
  const handleTabChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const { users, totalUsers } = await Users.GetUsers({ range: 'all', page:userPage, page_size: 20 });
      setUsers(users);
      setTotalUsers(totalUsers);
    } catch {
      setWithResponse({msg:'error al recuperar usuarios', color:'error'})
    }
    setIsLoading(false)
  };

  const fetchProducts = async () => {
    setIsLoading(true)
    try{
      const {products, total} = await Products.getProducts({page:productPage,page_size:20})
      setProducts(products);
      setTotalProducts(total)
    } catch {
      setWithResponse({msg:'error al recuperar productos', color:'error'})
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchUsers();
  }, [userPage]);
  useEffect(() => {
    fetchProducts();
  }, [productPage]);

  
  const handleUserPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setUserPage(value);
  };
  const handleProductPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setProductPage(value);
  };
  return (
    <TabContext value={value}>
      <TabList
        onChange={handleTabChange}
        aria-label="lab API tabs example"
        sx={{bgcolor: '#89CFF0'}}  // Add a blue background color
      >
        <Tab label="Usuarios" value="1" />
        <Tab label="Productos" value="2" />
      </TabList>
      <TabPanel value="1">
        <Typography component='h1'>Total de usuarios:</Typography>
        {users?
          <UserTab
            users={users}
            fetchUsers={fetchUsers}
            setUsers={setUsers}
            fetchProducts={fetchProducts}
          />
          :
          <p style={{fontSize:'24px', textAlign: 'center'}}>Cargando usuaios</p>
        }
        <Pagination 
          count={totalUsers} 
          page={userPage} 
          onChange={handleUserPageChange} 
          sx={{ 
            position: 'fixed',
            bottom: 0,
            zIndex: 1,
          }}
        />
      </TabPanel>
      <TabPanel value="2">
      <Typography component='h1'>Total de productos:</Typography>
        {products?
          <>
            <ProductsTab
            products={products}
            setProducts={setProducts}
            fetchProducts={fetchProducts}
            />
          </>
          :
          <p style={{fontSize:'24px', textAlign: 'center'}}>Cargando producos, un momento</p>
        }
        <Pagination 
          count={totalProducts} 
          page={productPage} 
          onChange={handleProductPageChange} 
          sx={{ 
            position: 'fixed',
            bottom: 0,
            zIndex: 1,
          }}
        />
      </TabPanel>
    </TabContext>
  );
}

export default Users;