import { ProductModel } from "../models/product/productModel"
import { BACKEND_TOOLS } from "../models/BACKEND_TOOLS"
import { WithResponseModel } from "../models/withResponse"

interface ProductData {
    products: ProductModel[];
    total: number;
  }

interface GetProductsProps {
    page:number,
    page_size:number,
    setWithResponse:React.Dispatch<React.SetStateAction<WithResponseModel|null>>
}

interface CahngeAveilabilityProps {
    selectedProduct:ProductModel|null,
    setWithResponse:React.Dispatch<React.SetStateAction<WithResponseModel|null>>,
    setSelectedProduct:React.Dispatch<React.SetStateAction<ProductModel|null>>,
    token:string
}

interface DeleteProductProps {
    selectedProduct:ProductModel|null,
    setWithResponse:React.Dispatch<React.SetStateAction<WithResponseModel|null>>,
    setProducts:React.Dispatch<React.SetStateAction<ProductModel[]>>,
    products:ProductModel[],
    setSelectedProduct:React.Dispatch<React.SetStateAction<ProductModel|null>>,
    token:string
}

function useProducts() {
    const getProducts = async ({page, page_size, setWithResponse}:GetProductsProps):Promise<ProductData> => {
        const API = BACKEND_TOOLS.API_URI+`/product/result?page=${page}&page_size=${page_size}`
        try {
            const res = await fetch(API,{
                headers:{
                    'Enterprise-Id':BACKEND_TOOLS.ENTERPRISE_ID
                }
            })
            const data = await res.json()
            if (res.ok){
                return {products:data.products, total:data.total}
            }
            else {
                return {products:[], total:0}
            }
        }
        catch{
            setWithResponse({msg:'No es posible recuperar los productos, intente más tarde', color:'error'})
            return {products:[], total:0}
        }
    }
    const changeAvailability = async ({token, selectedProduct, setWithResponse, setSelectedProduct}:CahngeAveilabilityProps) => {
        const API = BACKEND_TOOLS.API_URI+'/product/'
        const product_id = selectedProduct? selectedProduct._id : ''
        const able = !selectedProduct?.able
    
        const formData = new FormData();
        formData.append('product_id', product_id)
        formData.append('atributes', JSON.stringify({able:able}))
        
        try {
            const res = await fetch(API,{
            headers:{
                'Enterprise-Id':BACKEND_TOOLS.ENTERPRISE_ID,
                'Authorization':token
            },
            method:'PUT',
            body: formData
            })
            const data = await res.json()
            if (res.ok) {
            setWithResponse({msg:!able?'Producto suspendido correctamente!':'Producto recuperado correctamente', color:'success'})
            selectedProduct!.able = !selectedProduct?.able
            }
            if (!res.ok) {
            setWithResponse({msg:JSON.stringify(data), color:'error'})
            }
        }catch (error) {
            setWithResponse({msg:'Ha ocurrido un error, intentalo más tarde!', color:'error'})
        }
        finally {
            setSelectedProduct(null)
        }
    }
    const deleteProduct = async ({token, selectedProduct, setWithResponse, setProducts, products, setSelectedProduct}:DeleteProductProps) => {
        const API = BACKEND_TOOLS.API_URI+'/product/'
        const product_id = selectedProduct?._id? selectedProduct._id : ''
        const deleteData = {token:token, product_id:product_id}
        try {
        const res = await fetch(API,{
            headers:{
            'Content-Type':'application/json',
            'Enterprise-Id':BACKEND_TOOLS.ENTERPRISE_ID,
            'Authorization':token
            },
            method:'DELETE',
            body:JSON.stringify(deleteData)
        })
        const data = await res.json()
        if (res.ok) {
            setWithResponse({msg:'¡Eliminado correctamente!', color:'success'})
            if (products) {
                const newProducts = products.filter((product) => product._id !== selectedProduct?._id)
                setProducts(newProducts)
            }
        }
        if (!res.ok) {
            setWithResponse({msg:JSON.stringify(data), color:'error'})
        }
        }catch (error) {
        setWithResponse({msg:'Ha ocurrido un error, intentalo más tarde!', color:'error'})
        }
        finally {
        setSelectedProduct(null)
        }
    }
    return {
        getProducts,
        changeAvailability,
        deleteProduct
    }
}

export default useProducts