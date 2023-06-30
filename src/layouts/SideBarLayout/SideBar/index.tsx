import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { Operations } from './Operations';
import { Link} from 'react-router-dom';
import './index.css'
const SideBar = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {Operations.map((operation) => (
          <ListItem key={operation.name} disablePadding sx={{mb:"15px"}}>
            <Link to={operation.route}>
              <ListItemButton>
                <ListItemIcon>
                  {operation.icon}
                </ListItemIcon>
                <ListItemText primary={operation.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );


export default SideBar