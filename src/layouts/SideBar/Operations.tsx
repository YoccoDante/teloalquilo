import { Link, Navigate, useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { ReactElement } from 'react';

type OperationType = {
    name:string
    icon:ReactElement
    route:string
}

const operations:OperationType[] = [
    {
        'name':'Users',
        'icon':<AccountCircleIcon/>,
        "route":"users"
    },
    {
        'name':'Products',
        'icon':<AllInboxIcon/>,
        "route":"products"
    },
    {
        'name':'Financial Status',
        'icon':<AttachMoneyIcon/>,
        "route":"finance"
    },
    {
        'name':'Starts rate',
        'icon':<AutoAwesomeIcon/>,
        "route":"rate"
    }
]

function Operations() {
    const navigate = useNavigate()
  return (
    <List>
        {operations.map((operation) => (
          <ListItem key={operation.name} disablePadding sx={{mb:"15px"}}>
              <ListItemButton onClick={() => navigate(operation.route)}>
                <ListItemIcon>
                  {operation.icon}
                </ListItemIcon>
                <ListItemText primary={operation.name} />
              </ListItemButton>
          </ListItem>
        ))}
      </List>
  )
}

export default Operations