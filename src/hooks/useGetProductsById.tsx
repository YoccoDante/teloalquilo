import { ProductModel } from "../models/product/productModel"
import { useState } from "react"
import { BACKEND_TOOLS } from "../models/BACKEND_TOOLS"
import { useContext } from "react"
import { UserSessionContext } from "../contexts/authContext"


function useGetProductsById() {
    const [ products, setProducts ] = useState<ProductModel[]>([])
    const {userSession } = useContext(UserSessionContext)
    const getProducts = async({userId}:{userId:string}) => {
        const API = BACKEND_TOOLS.API_URI+"/product/"+userId
        try{
            const res = await fetch(API,{
                headers:{
                    'Authorization':userSession.token!,
                    'Enterprise-Id':BACKEND_TOOLS.ENTERPRISE_ID
                    }
                })
            const data =  await res.json()
            if (res.ok){
                setProducts(data.products)
            }
        }
        catch{
            console.log('error al recuperar productos por id')
        }
        return {products, setProducts}
    }
    return {getProducts}
}

export default useGetProductsById