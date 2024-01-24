import { Box, Rating, Typography,Autocomplete, TextField, Select, MenuItem, Button } from '@mui/material';
import React from 'react';
import { CATEGORIES, ProductModel } from '../../../../../models/product/productModel';
import { useLoadingContext } from '../../../../../contexts/loadingContext';

interface ProductTabFilterBarProps {
    products: ProductModel[],
    titleFilter: string|null,
    setTitleFilter: React.Dispatch<React.SetStateAction<string|null>>,
    categoryFilter: string|null,
    setCategoryFilter: React.Dispatch<React.SetStateAction<string|null>>,
    starsFilter: number|null,
    setStarsFilter: React.Dispatch<React.SetStateAction<number|null>>,
    priceFilter: number|null,
    setPriceFilter: React.Dispatch<React.SetStateAction<number|null>>,
    fetchProducts:any,
}

function ProductTabFilterBar({fetchProducts, products, titleFilter, setTitleFilter, categoryFilter, setCategoryFilter, starsFilter, setStarsFilter, priceFilter, setPriceFilter}:ProductTabFilterBarProps) {
  const {isLoading} = useLoadingContext()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '15px', mb: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: '5px', alignItems:'center'}}>
      <Box sx={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <Typography>título:</Typography>
        <Autocomplete
          options={products ? products.map((option) => option.title) : []}
          value={titleFilter}
          onChange={(event, newValue) => {
            setTitleFilter(newValue);
          }}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <Typography>Categoría:</Typography>
        <Select
            value={categoryFilter || ''}
            onChange={(event) => setCategoryFilter(event.target.value || null)}
            >
            {CATEGORIES.map((category) => (
              <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
            <MenuItem value={''}>Limpiar</MenuItem>
        </Select>
      </Box>
      <Box sx={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <Typography>puntuación:</Typography>
        <Rating
          title="stars-filter"
          value={starsFilter}
          onChange={(event, newValue) => {
            setStarsFilter(newValue);
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <Typography>Precio:</Typography>
        <TextField
          value={priceFilter || ''}
          onChange={(event) => setPriceFilter(event.target.value ? Number(event.target.value) : null)}
          variant="outlined"
          type="number"
        />
      </Box>
      <Box sx={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <Button variant='contained' onClick={() => fetchProducts()} disabled={isLoading}>Refrescar</Button>
      </Box>
    </Box>
  )
}

export default ProductTabFilterBar