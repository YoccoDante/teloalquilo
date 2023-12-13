import { useParams } from "react-router-dom"
import WedgesLoader from "../../../commons/WedgesLoader"
import DetailsContent from "./detailsContent"
import useGetProductRoot from "../../../hooks/useGetProductRoot"
import { useEffect, useState } from "react"
import { ProductRootModel } from "../../../models/rootModel/productRootModel"

function ProductDetail() {
  const {product_id} = useParams()
  const getProducts = useGetProductRoot(product_id? product_id : "")
  const [root, setRoot] = useState<ProductRootModel>()
  useEffect(() => {
    const fetchData = async () => {
      const root = await getProducts
      setRoot(root)
    }
    fetchData()
  },[])
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