import { Container, Typography, Pagination } from '@mui/material';
import FilterBar from '../../../components/FilterBar';
import WedgesLoader from '../../../commons/WedgesLoader';
import useFilterProducts from '../../../hooks/useFilterProducts';
import MappedProducts from './MappedProducts';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductModel } from '../../../models/product/productModel';
import useProducts from '../../../hooks/useGetProducts';
import { WithResponseModel } from '../../../models/withResponse';
import ResponseSnackBar from '../../../commons/ResponseSnackBar';

export default function Products() {
  const {filter} = useParams()
  const [products, setProducts] = useState<ProductModel[]>([])
  const [totalProducts, setTotalProducts] = useState(1)
  const [withResponse, setWithResponse] = useState<WithResponseModel|null>(null)
  const [isLoading, setIsLoading] = useState(true) // Set initial loading state to true
  const productsTools = useFilterProducts( {products} )
  const [page, setPage] = useState(1)
  const [ seeResetFilters, setSeeResetFilters ] = useState(false)
  const title = productsTools.filters.category === 'all' ? '¡¡¡Puedes Filtrar nuestros Productos!!!' : '!Lo mejor para ti, una lista de '+productsTools.filters.category+'s!'
  const page_size = 50
  const Products = useProducts()

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    if (filter) productsTools.setFilters({category:filter,maxPrice:1000000,region:"all"})
  },[])

  useEffect(() => {
    if (productsTools.filteredProducts.length === 0){
      setSeeResetFilters(true)
    }
    else {
      setSeeResetFilters(false)
    }
  },[productsTools.filteredProducts])

  // Fetch products when component mounts
  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true)
      const {products, total} = await Products.getProducts({page, page_size, setWithResponse})
      console.log(products)
      setProducts(products)
      setTotalProducts(total)
      setIsLoading(false)
    }
    getProducts()
  }, [page]);

  return (
    <>
      {isLoading ? (
        <Typography>Getting data...</Typography>
      ) : products ? (
        <Container>
          <Typography sx={{
            mt:"25px",
            fontSize:"26px",
            fontWeight:"500"
          }}>{title}</Typography>
          
            <FilterBar seeResetFilters={seeResetFilters} changeFilters={productsTools.setFilters}/>
            <MappedProducts products={productsTools.filteredProducts}/>
        </Container>
      ) : (
        <WedgesLoader/>
      )}
      {withResponse &&
        <ResponseSnackBar withResponse={withResponse} setWithResponse={setWithResponse}/>
      }
      <Pagination 
          count={totalProducts} 
          page={page} 
          onChange={handlePageChange} 
          sx={{ 
            position: 'fixed',
            bottom: 0,
            zIndex: 1,
          }}
        />
    </>
  );
}