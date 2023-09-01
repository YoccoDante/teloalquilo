import { Typography, Box, Stack, Autocomplete, TextField, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { FiltersType } from '../../../hooks/useFilterProducts';
import useSetFilters from '../../../hooks/useSetFilters';

function FilterBar( {changeFilters}:{changeFilters:React.Dispatch<React.SetStateAction<FiltersType>>}) {
    const productFilters = useSetFilters({changeFilters})
    const Categories = [
        "all",
        "casa",
        "departamento",
        "mini departamento",
        "habitación",
    ]
    const Regions = [
        "all",
        "cusco",
        "lima",
        "arequipa",
        "callao",
    ]

  return (
    <>
    <Typography sx={{
        mt:"25px",
        fontSize:"26px",
        fontWeight:"500"
    }}>¡¡¡Puedes Filtrar nuestros Profuctos!!!</Typography>
    <Box sx={{ flexGrow: 1, mt:"25px"}}>
            <Stack
            sx={{
            display:'flex',
            flexDirection:"row",
            borderRadius:"4px",
            height:"50px",
            justifyContent:"space-between",
            alignItems:"center",
            mb:"25px"
            }}>
                <Autocomplete
                    disablePortal
                    id="category"
                    options={Categories}
                    size='small'
                    onChange={(event:any, value:string|null) => value!==null? productFilters.setCategory(value) : productFilters.setCategory("all")}
                    sx={{ width: 300}}
                    renderInput={(params) => <TextField {...params} label="Categorias" variant='filled'/>}
                    />
                <Autocomplete
                    disablePortal
                    id="region"
                    options={Regions}
                    size='small'
                    onChange={(event:any, value:string|null) => value!==null? productFilters.setRegion(value) : productFilters.setRegion("all")}
                    sx={{ width: 300}}
                    renderInput={(params) => <TextField {...params} label="Region" variant='filled'/>}
                    />
                <TextField label="precio máximo" variant='filled' size='small' onChange={productFilters.setPrice}/>
                <Button
                variant='contained'
                endIcon={<SearchIcon/>}
                onClick={productFilters.setFilters}
                >
                    buscar
                </Button>
            </Stack>
    </Box>
    </>
  )
}

export default FilterBar