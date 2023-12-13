import { ProductModel } from "../models/product/productModel"
import { useState, useEffect } from "react"
import { BACKEND_TOOLS } from "../models/BACKEND_TOOLS"


function useGetProducts(page:number, page_size:number) {
    const [ products, setProducts ] = useState<ProductModel[]>([])
    const API = BACKEND_TOOLS.API_URI+'/product?page='+page+'&page_size='+page_size
    useEffect(()=>{
        fetch(API,{
            headers:{
                'Enterprise-Id':BACKEND_TOOLS.ENTERPRISE_ID
            }
        })
        .then(res => res.json())
        .then(data => setProducts(data.products))
    },[])
    return {products}
}

export default useGetProducts