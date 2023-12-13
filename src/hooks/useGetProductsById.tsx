import { ProductModel } from "../models/product/productModel"
import { useState, useEffect } from "react"
import { BACKEND_TOOLS } from "../models/BACKEND_TOOLS"
import { useContext } from "react"
import { UserSessionContext } from "../contexts/authContext"


function useGetProductsById({userId}:{userId:string}) {
    const [ products, setProducts ] = useState<ProductModel[]>([])
    const API = BACKEND_TOOLS.API_URI+"/product/"+userId
    const {userSession } = useContext(UserSessionContext)
    useEffect(()=>{
        fetch(API,{
            headers:{
                'Authorization':userSession.token!,
                'Enterprise-Id':BACKEND_TOOLS.ENTERPRISE_ID
            }
        })
        .then(res => res.json())
        .then(data => setProducts(data.products))
    },[])
    return {products, setProducts}
}

export default useGetProductsById