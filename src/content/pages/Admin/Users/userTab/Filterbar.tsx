import { Box, Rating, Typography, Autocomplete, TextField, Select, MenuItem, Button } from '@mui/material';
import { UserModel } from '../../../../../models/user/userModel';
import React from 'react';

interface UserTabFilterBarProps {
    users: UserModel[],
    nameFilter: string|null,
    setNameFilter: React.Dispatch<React.SetStateAction<string|null>>,
    rangeFilter: string|null,
    setRangeFilter: React.Dispatch<React.SetStateAction<string|null>>,
    starsFilter: number|null,
    setStarsFilter: React.Dispatch<React.SetStateAction<number|null>>,
    fetchUsers:any,
    isLoading:boolean
}

function UserTabFilterBar({users, nameFilter, setNameFilter, rangeFilter, setRangeFilter, starsFilter, setStarsFilter, fetchUsers, isLoading}:UserTabFilterBarProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '15px', mb: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: '5px', alignItems:'center'}}>
      <Box sx={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <Typography>nombre:</Typography>
        <Autocomplete
          freeSolo
          options={users.map((option) => option.name)}
          value={nameFilter}
          onChange={(event, newValue) => {
            setNameFilter(newValue);
          }}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <Typography>Rango:</Typography>
        <Select
            value={rangeFilter || ''}
            onChange={(event) => setRangeFilter(event.target.value || null)}
            >
            <MenuItem value={'user'}>User</MenuItem>
            <MenuItem value={'host'}>Host</MenuItem>
            <MenuItem value={''}>Limpiar</MenuItem>
        </Select>
      </Box>
      <Box sx={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <Typography>puntuación:</Typography>
        <Rating
          name="stars-filter"
          value={starsFilter}
          onChange={(event, newValue) => {
            setStarsFilter(newValue);
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <Button variant='contained' onClick={fetchUsers} disabled={isLoading}>Refrescar</Button>
      </Box>
    </Box>
  )
}

export default UserTabFilterBar