import { BlockLike } from "typescript"
import { ProductModel } from "../models/product/productModel"
import React, { useState, useEffect } from "react"

const API = "http://127.0.0.1:5000/product"

function useGetProducts() {
    const [ products, setProducts ] = useState<ProductModel[]>([])
    useEffect(()=>{
        fetch(API)
        .then(res => res.json())
        .then(data => setProducts(data.products))
    },[])
    return {products}
}

export default useGetProducts