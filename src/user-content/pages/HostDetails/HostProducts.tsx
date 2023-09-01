import MappedProducts from '../../../components/MappedProducts'
import { ProductModel } from '../../../models/product/productModel'
import './index.css'

function CustomerProducts( {products}:{products:ProductModel[]} ) {
  return (
    <>
        <dt>Productos:</dt>
        <MappedProducts products={products}/>
    </>
  )
}

export default CustomerProducts