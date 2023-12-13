import { Container, Typography } from '@mui/material';
import FilterBar from '../../../components/FilterBar';
import WedgesLoader from '../../../commons/WedgesLoader';
import useGetProducts from '../../../hooks/useGetProducts';
import useFilterProducts from '../../../hooks/useFilterProducts';
import MappedProducts from './MappedProducts';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductModel } from '../../../models/product/productModel';
import { BACKEND_TOOLS } from '../../../models/BACKEND_TOOLS';

export default function Products() {
  const {filter} = useParams()
  const [products, setProducts] = useState<ProductModel[]>([])
  const [isLoading, setIsLoading] = useState(true) // Set initial loading state to true
  const productsTools = useFilterProducts( {products} )
  const [ seeResetFilters, setSeeResetFilters ] = useState(false)
  const title = productsTools.filters.category === 'all' ? '¡¡¡Puedes Filtrar nuestros Productos!!!' : '!Lo mejor para ti, una lista de '+productsTools.filters.category+'s!'
  const page = 1
  const page_size = 50
  const API = BACKEND_TOOLS.API_URI+"/product/result?page="+page+'&page_size='+page_size

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
    fetch(API,{
      headers:{
        'Enterprise-Id':BACKEND_TOOLS.ENTERPRISE_ID
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setProducts(data.products);
        setIsLoading(false); // Set loading state to false once data is fetched
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  }, []);

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
    </>
  );
}