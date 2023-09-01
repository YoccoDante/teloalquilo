import { useParams } from "react-router-dom"
import "./index.css"
import WedgesLoader from "../../../components/Loaders/WedgesLoader"
import DetailsContent from "./detailsContent"
import useGetProductRoot from "../../../hooks/useGetProductRoot"

function ProductDetail() {
  const {product_id} = useParams()
  const { root } = useGetProductRoot(product_id? product_id : "")
  
  return (
    <>
      {root?
      <DetailsContent root={root}/>
      :
      <WedgesLoader/>}
    </>
  )
}

export default ProductDetail