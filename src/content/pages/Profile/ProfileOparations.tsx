import LogoutIcon from '@mui/icons-material/Logout';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import useAuth from '../../../hooks/useAuth';
import { useContext, useState } from 'react';
import { UserSessionContext } from '../../../contexts/authContext';
import ProductOperations from './ProductOptions';
import { Alert, Snackbar } from '@mui/material'
import { WithResponseModel } from '../../../models/withResponse';
import ResponseSnackBar from '../../../commons/ResponseSnackBar';

function ProfileOperations() {
    const {LogOut} = useAuth()
    const { userSession } = useContext(UserSessionContext)
    const [ open, setOpen ] = useState(true)
    const [ manageProducts, setManageProducts ] = useState(false)
    const [ withResponse, setWithResponse ] = useState<WithResponseModel | null>(null)

  return (
    <>
    <SpeedDial
      open={open}
      onClick={() => setOpen(!open)}
      ariaLabel="Profile options"
      sx={{ position: 'fixed', bottom:16, right: {xs:8, md:16} }}
      icon={<SpeedDialIcon/>}
      >
        <SpeedDialAction
          key={'Cerrar sesión'}
          icon={<LogoutIcon/>}
          tooltipTitle={'Cerrar sesión'}
          onClick={() => LogOut()}
        />
      {userSession.user!.range === 'host' &&
        <SpeedDialAction
          key={'Añadir Producto'}
          icon={<AddBusinessIcon/>}
          tooltipTitle={'Añadir Producto'}
          onClick={() => setManageProducts(true)}
        />
      }
      </SpeedDial>
      {manageProducts && 
        <ProductOperations setWithResponse={setWithResponse} setManaging={setManageProducts}/>
      }
      {withResponse &&
        <ResponseSnackBar setWithResponse={setWithResponse} withResponse={withResponse}/>
      }
    </>
  )
}

export default ProfileOperations