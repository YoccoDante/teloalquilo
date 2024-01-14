import { Container, Box, Rating, Button } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import IconButton from "@mui/material/IconButton"
import { useContext, useEffect, useState } from "react"
import { UserSessionContext } from "../../../contexts/authContext"
import DefaultPic from '../../../assets/Images/profile-user.png'
import './index.css'
import Typography from "../../../components/Typography"
import ProfileOperations from "./ProfileOparations"
import { SetMinDataForm } from "../../../components/SetMinDataForm"
import SelectPic from "./SelectPic"
import { Snackbar, Alert } from "@mui/material"
import { WithResponseModel } from "../../../models/withResponse"

function ProfilePage() {
  const { userSession} = useContext(UserSessionContext)
  const [profilePic, setProfilePic] = useState(userSession.user?.profile_pic || DefaultPic);
  const [ editing, setEditing ] = useState(false)
  const [ withResponse, setWithResponse ] = useState<WithResponseModel | null>(null)
  const [ selectingPic, setSelectingPic ] = useState(false)
  const [ editData, setEditData ] = useState(false)
  const gender = userSession.user?.gender === 'male'? 'masculino' : userSession.user?.gender === 'female'? 'femenino' : 'otro'
  const profileInfo = [
    {title:'Nombre:', content:userSession.user!.name + ' ' + userSession.user!.last_name},
    {title:'Email:', content:userSession.user?.email},
    {title:'Género', content:gender},
    {title:'Número de contacto', content:userSession.user?.phone_number? userSession.user.phone_number : 'Sin contacto 😣'},
  ]
  const handleEditData = () => {
    setEditData(true)
  }
  const handleSetPic = () => {
    setSelectingPic(true)
  }

  useEffect(() => {
    setProfilePic(userSession.user?.profile_pic || DefaultPic);
  },[userSession.user?.profile_pic])

  return (
    <>
    <Container
    className='ProfilePage'
    sx={{
      mt:4,
      display:'flex',
      flexDirection:{xs:'column', md:'row'},
      position:'relative'
      }}>
      <Box
      component='div'
      sx={{
          width:{xs:'100%', md:'400px'},
          height:{xs:'300px', md:'400px'},
          bgcolor:'#444',
          boxShadow:'0px 0px 3px 3px #e4e9f2',
          position:'relative',
          mb:8
      }}>
          <img className="ProfilePic" src={profilePic} onError={() => setProfilePic(DefaultPic)}/>
          <Typography component='dt'>
            Calificación:
          </Typography>
          <Rating readOnly defaultValue={userSession.user?.stars}/>
          {editing &&
          <IconButton
          onClick={handleSetPic}
          size="large"
          sx={{position:'absolute', right:'-15px', bottom:'-15px',bgcolor:'#346beb'}}
          >
            <EditIcon/>
          </IconButton> }         
      </Box>
      <Box
      component='dl'
      ml={{md:4}}
      sx={{
        display:'grid',
        gap:'5px',
        textTransform:'capitalize',
        position:'relative'
      }}>
        {editing && 
        <Button
        variant="contained"
        onClick={handleEditData}
        sx={{
          position:'absolute',
          top:0,
          right:{xs:0, md:'-20px'},
          zIndex:1
        }}>
          Editar datos
        </Button>}
        {profileInfo.map((data) =>
          <div key={data.title}>
            <Typography component='dt'>{data.title}</Typography>
            <Typography component='dd'>{data.content}</Typography>
          </div>
        )}
      </Box>
      <Box sx={{
        position:'fixed',
        bottom:{md:'5%'},
        top:{xs:'120px'},
        display:'flex',
        zIndex:1,
        height:'fit-content',
      }}>
        <Button
        variant='contained'
        color={editing? 'error' : 'primary'}
        onClick={() => setEditing(!editing)}
        >
          {editing? 'Cancelar Edición' : 'Editar Perfíl'}
        </Button>
      </Box>
      <ProfileOperations/>
      {editData &&
      <SetMinDataForm
        setWithResponse={setWithResponse}
        setEditing={setEditing}
        user={userSession.user}
        setEditData={setEditData}
      />}
      {selectingPic &&
      <SelectPic
        title="¡Actualiza tu foto de perfil!"
        content="Navega por tus archivos y selecciona la foto que más te guste. Solo se permiten png, jpg, jpeg, jfif"
        setWithResponse={setWithResponse}
        setSelectingPic={setSelectingPic}
      />}
      <Snackbar open={withResponse !== null} onClose={() => setWithResponse(null)} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert  severity={withResponse?.color} sx={{ width: '100%' }}>
          {withResponse?.msg}
        </Alert>
      </Snackbar>
    </Container>
    </>
  )
}

export default ProfilePage