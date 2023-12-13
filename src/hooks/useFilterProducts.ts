import { ProductModel,PRODUCT_CATEGORIES } from "../models/product/productModel"
import { useEffect, useState  } from "react"

export type FiltersType = {
    category:PRODUCT_CATEGORIES | string
    region:string | "all"
    maxPrice:number
}

function useFilterProducts( {products}:{products:ProductModel[]}) {
    const [ filters, setFilters ] = useState<FiltersType>({category:"all",maxPrice:1000000,region:"all"})  
    const [ filteredProducts, setFilteredProducts ] = useState<ProductModel[]>(products)
    
    const filter = (products:ProductModel[]) => {
        if (!Array.isArray(products)) {
            return [];
        }

        return products.filter(product => {
            if (filters.category === "all" && filters.region === "all"){
                return product.price <= filters.maxPrice
            }else{
                if (filters.category !== "all" && filters.region !== "all"){
                    return product.category === filters.category && product.region === filters.region && product.price <= filters.maxPrice
                }else{
                    if (filters.category === "all"){
                        return product.price <= filters.maxPrice && product.region === filters.region
                    }
                    else{
                        return product.price <= filters.maxPrice && product.category === filters.category
                    }
                }
            }
        })
    }

    useEffect(() => {
        setFilteredProducts(filter(products))
    },[filters, products])
    
    return {filteredProducts, setFilters, filters}
}

export default useFilterProducts