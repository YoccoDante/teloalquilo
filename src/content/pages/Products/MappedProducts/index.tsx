import { ProductModel } from "../../../../models/product/productModel"
import ProductCard from "../../../../components/ProductCard"
import './index.css'
import LampLoader from "../../../../commons/LampLoader"
import { Box } from '@mui/material'

interface MappedProductsProps {
  products:ProductModel[],
}

function MappedProducts( {products}:MappedProductsProps){
  return (
    <>
    { products.length !== 0?
    <Box className='MappedProducts NoScrollBar'>
      {products.map((product) => (
          <div className='ProductContainer' key={product._id}>
            <ProductCard key={product._id} product={product}/>
          </div>
      ))}
    </Box>
    :
    <LampLoader/>
    }
    </>
  )
}

export default MappedProducts