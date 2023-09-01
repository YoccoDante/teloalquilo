import Rating from '@mui/material/Rating/Rating';
import { ProductModel } from '../../models/product/productModel';
import { useNavigate } from "react-router-dom"
import './index.css'

interface ProductProps {
  product:ProductModel
}

export default function ProductCard( props:ProductProps ) {
  const product = props.product
  const navigate = useNavigate()
  const handleClick = (product_id:string) => {
    navigate("/products/"+product_id, {replace:true})
  }
  return (
    <div className='ProductCardStyles' onClick={() => handleClick(product._id)}>
      <div className='ProductCardPrice'>
        <p>S/.{product.price}</p>
      </div>
      <div className='ProductCardImage'>
        <img src={product.imgs[0]}/>
        <div>
          <Rating className='ProductCardRating'readOnly defaultValue={product.stars}/>
          <button>Más detalles</button>
        </div>
      </div>
      <p>{product.title}</p>
    </div>
  );
}