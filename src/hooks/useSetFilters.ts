import { FiltersType } from "./useFilterProducts"
import { PRODUCT_CATEGORIES } from "../models/product/productModel"
import { useState } from "react"

function useSetFilters( {changeFilters}:{changeFilters:React.Dispatch<React.SetStateAction<FiltersType>>} ) {
    const [categoryFilter, setCategoryFilter] = useState<PRODUCT_CATEGORIES|string>("all")
    const [regionFilter, setRegionFilter] = useState("all")
    const [priceFilter, setPriceFilter] = useState(1000000)
    const setPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(isNaN(parseInt(event.target.value)) || event.target.value === null || parseInt(event.target.value) === 0){
            setPriceFilter(1000000)
        }
        else{
            setPriceFilter(parseInt(event.target.value))
        }
    }
    const setCategory = (value:string) => {
        setCategoryFilter(value)
    }
    const setRegion = (value:string) => {
        setRegionFilter(value)
    }
    const setFilters = () =>{
        changeFilters({
            category:categoryFilter.toLocaleLowerCase(),
            maxPrice:priceFilter,
            region:regionFilter
        })
    }
    const resetFilters = () =>{
        changeFilters({
            category:'all',
            maxPrice:1000000,
            region:'all'
        })
    }
    return {setPrice, setCategory, setRegion, setFilters, resetFilters}
}

export default useSetFilters