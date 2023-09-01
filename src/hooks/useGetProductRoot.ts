import { useState, useEffect } from "react"
import { ProductRootModel } from "../models/rootModel/productRootModel"

const API = "http://127.0.0.1:5000/root/product"

function useGetProductRoot( product_id:string ) {
    const [ root, setRoot ] = useState<ProductRootModel>()
    useEffect(() => {
      fetch(API+"/"+product_id)
        .then(res => res.json())
        .then(data => setRoot(data.root))
      },[])
    return {root}
}

export default useGetProductRoot