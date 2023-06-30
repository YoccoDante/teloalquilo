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

export const Operations:OperationType[] = [
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