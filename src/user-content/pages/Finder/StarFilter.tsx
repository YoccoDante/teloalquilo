import AppBar from '@mui/material/AppBar';
import SearchIcon from '@mui/icons-material/Search';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Rating,} from "@mui/material"

function StarFilter( {HostFilter}:{HostFilter:any} ) {
    return (
    <AppBar position="static" sx={{mb:"25px"}}>
        <Toolbar>
            <Rating sx={{fontSize:"34px", borderRadius:"0 1em 0 1em", bgcolor:"#dadce0", padding:" 0 15px"}} value={HostFilter.stars} onChange={HostFilter.ChangeStars}/>
            <Button onClick={HostFilter.ClearStars} sx={{position:"absolute", right:0}} variant="contained" endIcon={<SearchIcon/>}>Limpiar</Button>
        </Toolbar>
    </AppBar>
    )
}

export default StarFilter