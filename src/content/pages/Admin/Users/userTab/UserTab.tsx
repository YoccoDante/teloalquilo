import React, { useEffect, useState, useMemo } from 'react'
import { UserModel } from '../../../../../models/user/userModel'
import ProfileCard from '../../../../../components/ProfileCard'
import { Button, Typography } from '@mui/material'
import useUser from '../../../../../hooks/useUser'
import { WithResponseModel } from '../../../../../models/withResponse'
import OverScreen from '../../../../../commons/OverScreen'
import useGetProductsById from '../../../../../hooks/useGetProductsById'
import { ProductModel } from '../../../../../models/product/productModel'
import UserTabFilterBar from './Filterbar'
import UserProducts from './UserProducts'
import ChangePasswordDialog from './ChangePasswordDialog'
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface UserTabProps {
    users:UserModel[],
    setIsLoading:React.Dispatch<React.SetStateAction<boolean>>,
    setWithResponse:React.Dispatch<React.SetStateAction<WithResponseModel | null>>,
    isLoading:boolean,
    fetchUsers:any,
    setUsers:React.Dispatch<React.SetStateAction<UserModel[]|null>>
}

function UserTab({users, setIsLoading, setWithResponse, isLoading, fetchUsers, setUsers}:UserTabProps) {
    const User = useUser()
    const [selectedUser, setSelectedUser] = useState<string|null>(null)
    const [nameFilter, setNameFilter] = useState<string | null>(null);
    const [rangeFilter, setRangeFilter] = useState<string | null>(null);
    const [starsFilter, setStarsFilter] = useState<number | null>(null);
    const [products, setProducts] = useState<ProductModel[]>([])
    const [seeProducts, setSeeProducts] = useState(false)
    const [changePassword, setChangePassword] = useState(false)
    const handleDeleteUser = async (userId:string) => {
        setIsLoading(true)
        await User.DeleteUser({userId,setWithResponse,setUsers, users})
        setIsLoading(false)
    }
    const Products = useGetProductsById()
    const filteredUsers = useMemo(() => {
      return users.filter((user) => {
        return (
          (!nameFilter || user.name.toLowerCase() === nameFilter.toLowerCase()) &&
          (!rangeFilter || user.range === rangeFilter) &&
          (!starsFilter || user.stars === starsFilter)
        );
      });
    }, [users, nameFilter, rangeFilter, starsFilter]);
    useEffect(() => {
        async function getProducts () {
            if (!selectedUser) return
            const {products} = await Products.getProducts({userId:selectedUser})
            setProducts(products)
        }
        getProducts()
    },[selectedUser])
  return (
    <div style={{display:'flex', flexDirection:'column', gap:'15px'}}>
        <UserTabFilterBar
          isLoading={isLoading}
          fetchUsers={fetchUsers}
          users={users}
          nameFilter={nameFilter}
          setNameFilter={setNameFilter}
          rangeFilter={rangeFilter}
          setRangeFilter={setRangeFilter}
          starsFilter={starsFilter}
          setStarsFilter={setStarsFilter}
        />
        {users.length === 0 && <p style={{fontSize:'24px', textAlign: 'center'}}>No hay usuarios aún</p>}
        {filteredUsers.map((user) => {
            const lastActivityDate = new Date(user.last_activity);
            const formattedDate = format(lastActivityDate, 'EEEE, d MMMM yyyy HH:mm:ss', { locale: es });
            return <div key={user._id}>
                <Typography>Ultima conección: {formattedDate}</Typography>
                <ProfileCard  user={user}/>
                <Button disabled={isLoading} variant='contained' color='error' onClick={() => handleDeleteUser(user._id)}>Eliminar</Button>
                {user.range == 'host' &&
                <Button
                  disabled={isLoading}
                  variant='contained'
                  sx={{ml:2}}
                  onClick={() => {
                      setSelectedUser(user._id)
                  }}
                >
                    Ver productos
                </Button>}
                <Button
                  sx={{ml:2}}
                  variant='contained'
                  onClick={() => {
                    setSelectedUser(user._id)
                    setChangePassword(true)
                  }}
                >
                  Cambiar contraseña
                </Button>
            </div>
        })}
        {seeProducts && selectedUser && products &&
            <OverScreen onClick={() => {
              setSelectedUser(null)
              setSeeProducts(false)
            }}>
              <UserProducts
                products={products} setSelectedUser={setSelectedUser}
                setIsLoading={setIsLoading}
                setProducts={setProducts}
                setWithResponse={setWithResponse}
              />
            </OverScreen>
        }
        {changePassword && selectedUser &&
          <OverScreen onClick={() => {
            setSelectedUser(null)
            setChangePassword(false)
          }}>
            <ChangePasswordDialog
              isLoading={isLoading}
              setChangePassword={setChangePassword}
              setIsLoading={setIsLoading}
              setSelectedUser={setSelectedUser}
              setWithResponse={setWithResponse}
              selectedUser={selectedUser}
            />
          </OverScreen>
        }
    </div>
  )
}

export default UserTab