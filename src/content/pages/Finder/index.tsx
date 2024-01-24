import { Container, Typography, Pagination } from "@mui/material";
import './index.css';
import useUser from "../../../hooks/useUser";
import ComunityLoader from "../../../commons/ComunityLoader";
import { UserModel } from "../../../models/user/userModel";
import { useContext, useEffect, useState } from "react";
import { UserSessionContext } from "../../../contexts/authContext";
import ProfileCard from "../../../components/ProfileCard";
import AppBar from '@mui/material/AppBar';
import SearchIcon from '@mui/icons-material/Search';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Rating } from "@mui/material"
import { useLoadingContext } from "../../../contexts/loadingContext";

function Finder() {
  const {isLoading, setIsLoading} = useLoadingContext()
  const {userSession} = useContext(UserSessionContext);
  const { GetUsers } = useUser();
  const [ users, setUsers ] = useState<UserModel[]>([]);
  const [ stars, setStars ] = useState(0)
  const [ nameFilter, setNameFilter ] = useState<string|null>(null);
  const [userPage, setUserPage] = useState(1)
  const [totalUsers,setTotalUsers] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const range = userSession.user === null || userSession.user?.range === 'user'? 'host' : 'user' 
      const {users, totalUsers} = await GetUsers({range:range, page:userPage, page_size:20});
      setUsers(users);
      setTotalUsers(totalUsers)
      setIsLoading(false)
    };
    fetchData();
  },[userSession, userPage]);

  const handleClear = () => {
    setStars(0)
    setNameFilter(null)
  }

  const ChangeStars = (event:any, newvalue:number|null) => {
    if(newvalue){
        setStars(newvalue)
    }
  }

  const filteredUsers = users.filter((user) => {
    return (
      (user.stars >= stars) &&
      (!nameFilter || (
        user.name.toLocaleLowerCase().includes(nameFilter) ||
        user.last_name.toLocaleLowerCase().includes(nameFilter)))
    );
  });
  const handleUserPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setUserPage(value);
  };

  if(isLoading) {
    return <ComunityLoader/>;
  }

  return (
    <Container>
      <Typography variant="h6">Busca entre nuestros antifriones por su calificación!</Typography>
      <AppBar position="static" sx={{mb:"25px"}}>
        <Toolbar sx={{display:'flex', gap:'30px'}}>
            <Rating sx={{fontSize:"34px", borderRadius:"0 1em 0 1em", bgcolor:"#dadce0", padding:" 0 15px"}} value={stars} onChange={ChangeStars}/>
            <Button onClick={handleClear} sx={{position:"absolute", right:0}} variant="contained" endIcon={<SearchIcon/>}>Limpiar</Button>
            <div style={{display:'flex', alignItems:'center'}}>
              <Typography>Nombre:</Typography>
              <input
                  style={{height:'30px', width:'200px'}}
                  className="NameFilter"
                  type="text"
                  value={nameFilter || ''}
                  onChange={e => setNameFilter(e.target.value)}
              />
            </div>
        </Toolbar>
      </AppBar>
      <div style={{display:'flex', flexDirection:'column', gap:'15px'}}>
        {filteredUsers.map((user, index) => 
          <ProfileCard user={user} key={index}/>
        )}
      </div>
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
    </Container>
  )
}

export default Finder;