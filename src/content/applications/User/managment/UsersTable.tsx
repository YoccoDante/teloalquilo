import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typografy from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { UserModel } from '../../../../models/user/userModel';
import { useState } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface UserListProps {
  user_list:UserModel[]
}

export default function UsersTable( props:UserListProps) {
  const [starView, setStarView] = useState(false)
  const users = props.user_list
  const handleStars = () => {
    setStarView(!starView)
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">name</TableCell>
            <TableCell align="right">email</TableCell>
            <TableCell align="right">stars</TableCell>
            <TableCell align="right">status</TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.stars}</TableCell>
              <TableCell align="right">{user.status=="deptor"?
               <Typografy color={"red"}>{user.status}</Typografy>
               :
               <Typografy color={"green"}>{user.status}</Typografy>
               }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}