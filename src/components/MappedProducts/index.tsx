import { ProductModel } from "../../models/product/productModel"
import ProductCard from "../ProductCard"
import './index.css'

function MappedProducts( {products}:{products:ProductModel[]} ) {
  return (
    <div className='MappedProducts'>
          {products.map((product) => (
              <ProductCard key={product._id} product={product}/>
          ))}
    </div>
  )
}

export default MappedProducts