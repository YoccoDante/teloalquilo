import { Container } from '@mui/material';
import FilterBar from './FilterBar';
import GridLoader from '../../../components/Loaders/GridLoader';
import useGetProducts from '../../../hooks/useGetProducts';
import useFilterProducts from '../../../hooks/useFilterProducts';
import MappedProducts from '../../../components/MappedProducts';

export default function Products() {
  const { products } = useGetProducts()
  const productsTools = useFilterProducts( {products} )
  return (
    <>
      {products?
        <Container>
            <FilterBar changeFilters={productsTools.setFilters}/>
            <MappedProducts products={productsTools.filteredProducts}/>
        </Container>
        :
        <GridLoader/>}
    </>
  );
}