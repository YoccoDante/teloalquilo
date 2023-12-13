import { useContext, useState } from 'react'
import { PRODUCT_CATEGORIES, PostProductModel } from '../models/product/productModel'
import { UserSessionContext } from '../contexts/authContext'



function useSetProductData() {
    const {userSession} = useContext(UserSessionContext)
    const [ title, setTitle] = useState<string>('')
    const [ category, setCategory] = useState<PRODUCT_CATEGORIES>(PRODUCT_CATEGORIES.HOUSE)
    const [ description, setDescription] = useState<string>('')
    const [ region, setRegion ] = useState<string>('')
    const [ province, setProvince ] = useState<string>('')
    const [ price, setPrice ] = useState<number>(0)
    const [ imgs, setImgs] = useState<File[]>([])

    const ChangeTitle = (value:string) => {
        setTitle(value)
    }
    const ChangeCategory = (value:PRODUCT_CATEGORIES) => {
        setCategory(value)
    }
    const ChangeDescription = (value:string) => {
        setDescription(value)
    }
    const ChangeRegion = (value:string) => {
        setRegion(value)
    }
    const ChangeProvince = (value:string) => {
        setProvince(value)
    }
    const ChangePrice = (value:number) => {
        setPrice(value)
    }
    const ChangeImgs = (value:File[]) => {
        setImgs(value)
    }

    const getProductData = () => {
        const tokenString = userSession.token? userSession.token : ''
        const PostProductData:PostProductModel = {
            title:title,
            category:category,
            description:description,
            region:region,
            province:province,
            price:price,
            token:tokenString,
            imgs:imgs
        }
        return PostProductData
    }

    return {
        ChangeTitle,
        ChangeCategory,
        ChangeDescription,
        ChangeRegion,
        ChangeProvince,
        ChangePrice,
        ChangeImgs,
        getProductData
    }
}

export default useSetProductData