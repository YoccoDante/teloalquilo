import React, { useState } from 'react'
import { Box, Button } from '@mui/material'
import CustomerImage from './UserImage'
import CustomerInfo from './UserInfo'
import CommentBox from '../../../components/CommentBox'
import { CustomerRootModel } from '../../../models/rootModel/UserRootModel'
import { useNavBarHeight } from '../../../contexts/navBarContext'
import MappedProducts from '../Products/MappedProducts';
import OverScreen from '../../../commons/OverScreen';

interface UserPageProps {
  root:CustomerRootModel
}

function UserPage({root}:UserPageProps) {
  const { navBarHeight } = useNavBarHeight();
  const [ isOpen, setIsOpen ] = useState(false)

  return (
    <Box
      className="CustomerPage NoScrollBar"
      component='div'
      sx={{
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: {xs:'column', md:'row'},
        height: {xs:'100%', md:`calc(100vh - ${navBarHeight}px)`},
        overflow: {xs:'auto', md:'hidden'},
      }}
    >
      {/* Left side info and profile pic */}
      <Box sx={{ display: 'flex', flexDirection: 'column', width:{xs:'100vs', md:'50%'}, overflow: 'auto' }}>
        <CustomerImage user={root.user} />
        <CustomerInfo user={root.user} />
        {root.user.range === 'host' &&
          <Button 
          onClick={() => setIsOpen(true)}
          variant='contained'
          sx={{
            width:'fit-content',
            ml:4
          }}>
            Ver Productos
        </Button>
        }
      </Box>
      {/* Right side comments */}
      <Box sx={{ display: 'flex', flexDirection: 'column', width:{xs:'100vw', md:'50%'}, height: '100%', p:1, boxSizing:'border-box', maxHeight:{xs:'50vh', md:'100vh'} }}>
        <p style={{fontSize:'26px'}}>Comentarios del perfíl:</p>
        <CommentBox comments={root.comments}/>
      </Box>
      {isOpen &&
      <OverScreen onClick={() => setIsOpen(false)}>
        <Box sx={{width:'50vw', height:'80vh', bgcolor:'#fff', overflow:'scroll'}}>
          <div
            style={{
              fontSize:'26px',
              fontWeight:'500',
              position:'sticky',
              top:0,
              zIndex:2,
              backgroundColor:'#fff',
              height:'50px'
            }}>
            <p style={{marginLeft:'16px'}}>Productos:</p>
          </div>
          <MappedProducts products={root.products}/>
        </Box>
      </OverScreen>
      }
    </Box>
  )
}

export default UserPage