import React, { useEffect, useState, useMemo, useRef } from 'react'
import { UserModel } from '../../../../../models/user/userModel'
import ProfileCard from '../../../../../components/ProfileCard'
import { Box, Button, Pagination, Typography } from '@mui/material'
import useUser from '../../../../../hooks/useUser'
import OverScreen from '../../../../../commons/OverScreen'
import { ProductModel } from '../../../../../models/product/productModel'
import UserTabFilterBar from './Filterbar'
import UserProducts from './UserProducts'
import ChangePasswordDialog from './ChangePasswordDialog'
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useLoadingContext } from '../../../../../contexts/loadingContext'
import useProducts from '../../../../../hooks/useGetProducts'

interface UserTabProps {
    users:UserModel[],
    fetchUsers:any,
    setUsers:React.Dispatch<React.SetStateAction<UserModel[]|null>>,
    fetchProducts:any
}

function UserTab({users, fetchUsers, setUsers, fetchProducts}:UserTabProps) {
    const User = useUser()
    const {isLoading, setIsLoading} = useLoadingContext()
    const [selectedUser, setSelectedUser] = useState<UserModel|null>(null)
    const [nameFilter, setNameFilter] = useState<string | null>(null);
    const [rangeFilter, setRangeFilter] = useState<string | null>(null);
    const [starsFilter, setStarsFilter] = useState<number | null>(null);
    const [seeProducts, setSeeProducts] = useState(false)
    const [changePassword, setChangePassword] = useState(false)
    const [seeDetails, setSeeDetails] = useState(false)
    const lastFetchedUserId = useRef<string | null>(null);
    const handleDeleteUser = async (userId:string) => {
        setIsLoading(true)
        await User.DeleteUser({userId,setUsers, users})
        setIsLoading(false)
    }
    const filteredUsers = useMemo(() => {
      return users.filter((user) => {
        return (
          (!nameFilter || user.name.toLowerCase() === nameFilter.toLowerCase()) &&
          (!rangeFilter || user.range === rangeFilter) &&
          (!starsFilter || user.stars === starsFilter)
        );
      });
    }, [users, nameFilter, rangeFilter, starsFilter]);
    
  return (
    <div style={{display:'flex', flexDirection:'column', gap:'15px'}}>
        <UserTabFilterBar
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
                      setSelectedUser(user)
                      setSeeProducts(true)
                  }}
                >
                    Ver productos
                </Button>}
                <Button
                  sx={{ml:2}}
                  variant='contained'
                  onClick={() => {
                    setSelectedUser(user)
                    setChangePassword(true)
                  }}
                >
                  Cambiar contraseña
                </Button>
                <Button
                  sx={{ml:2}}
                  variant='contained'
                  onClick={() => {
                    setSelectedUser(user)
                    setSeeDetails(true)
                  }}
                >
                  Ver detalles
                </Button>
            </div>
        })}
        {seeProducts && selectedUser &&
          <OverScreen onClick={() => {
            setSeeProducts(false)
          }}>
            <>
              <UserProducts
                lastFetchedUserId={lastFetchedUserId}
                setSeeProducts={setSeeProducts}
                fetchProducts={fetchProducts}
                seeProducts={seeProducts}
                selectedUser={selectedUser}
              />
            </>
          </OverScreen>
        }
        {changePassword && selectedUser &&
          <OverScreen onClick={() => {
            setSelectedUser(null)
            setChangePassword(false)
          }}>
            <ChangePasswordDialog
              setChangePassword={setChangePassword}
              setSelectedUser={setSelectedUser}
              selectedUser={selectedUser}
            />
          </OverScreen>
        }
        {seeDetails && selectedUser &&
          <OverScreen onClick={() => {
            setSelectedUser(null)
            setSeeDetails(false)
          }}>
            <Box sx={{
              display:'flex',
              flexDirection:'column',
              position:'relative',
              bgcolor:'#fff',
              width:'100%',
              height:'100%',
              p:2,
              boxSizing:'border-box'}}>
              <Button
                variant='contained'
                color='error'
                sx={{position:'absolute', top:'-50px', left:0}}
                onClick={() => {
                  setSelectedUser(null)
                  setSeeDetails(false)
                }}>
                Cerrar detalles
              </Button>
              <Typography>Nombre: {selectedUser.name}</Typography>
              <Typography>Apellido: {selectedUser.last_name}</Typography>
              <Typography>Correo: {selectedUser.email}</Typography>
              <Typography>Contácto: {selectedUser.phone_number}</Typography>
              <Typography>Género: {selectedUser.gender}</Typography>
            </Box>
          </OverScreen>
        }
    </div>
  )
}

export default UserTab