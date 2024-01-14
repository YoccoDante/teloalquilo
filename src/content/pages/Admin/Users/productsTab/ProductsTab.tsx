import React, { useContext, useState, useMemo } from 'react'
import { Box, Button, Dialog, DialogTitle, Typography, DialogContent, DialogActions } from '@mui/material'
import ProductCard from '../../../../../components/ProductCard'
import { WithResponseModel } from '../../../../../models/withResponse'
import { ProductModel } from '../../../../../models/product/productModel'
import OverScreen from '../../../../../commons/OverScreen'
import useProducts from '../../../../../hooks/useGetProducts'
import { UserSessionContext } from '../../../../../contexts/authContext'
import ProductTabFilterBar from './Filterbar'

interface ProductsTabProps {
    setWithResponse:React.Dispatch<React.SetStateAction<WithResponseModel|null>>,
    products:ProductModel[],
    setProducts:React.Dispatch<React.SetStateAction<ProductModel[]>>,
    setIsLoading:React.Dispatch<React.SetStateAction<boolean>>
}

function ProductsTab({setWithResponse, products, setProducts, setIsLoading}:ProductsTabProps) {
    const {userSession} = useContext(UserSessionContext)
    const [selectedProduct, setSelectedProduct] = useState<ProductModel|null>(null)
    const Products = useProducts()
    const [titleFilter, setTitleFilter] = useState<string | null>(null);
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
    const [starsFilter, setStarsFilter] = useState<number | null>(null);
    const [priceFilter, setPriceFilter] = useState<number | null>(null);
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
          return (
            (!titleFilter || product.title === titleFilter) &&
            (!categoryFilter || product.category === categoryFilter) &&
            (!starsFilter || product.stars === starsFilter) &&
            (!priceFilter || product.price === priceFilter)
          );
        });
      }, [products, titleFilter, categoryFilter, priceFilter, starsFilter]);
    const handleDeleteProduct = () => {
        setIsLoading(true)
        Products.deleteProduct({
            token:userSession.token!,
            products:products,
            selectedProduct:selectedProduct,
            setWithResponse:setWithResponse,
            setProducts:setProducts,
            setSelectedProduct:setSelectedProduct
        })
        setIsLoading(false)
    }
  return (
    <>
    <ProductTabFilterBar
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        products={products}
        titleFilter={titleFilter}
        setTitleFilter={setTitleFilter}
        starsFilter={starsFilter}
        setStarsFilter={setStarsFilter}
    />
    <Box
    sx={{
        position:'relative',
        display: products.length === 0 ? 'flex' : 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'center',
        p:4,
        boxSizing:'border-box'
    }}>
        {products.length === 0 && <p style={{fontSize:'24px', textAlign: 'center'}}>No hay productos aún</p>}
        {filteredProducts.map((product) => {
            return <>
                <ProductCard key={product._id} product={product}/>
                <Button color='error' onClick={() => setSelectedProduct(product)}>
                    Eliminar producto
                </Button>
            </>
        })}
        {selectedProduct &&
            <OverScreen>
                <Dialog open>
                    <DialogTitle>
                        <Typography>¿Seguro que deseas eliminar el producto?</Typography>
                    </DialogTitle>
                    <DialogContent>
                        <Typography>
                            el producto {selectedProduct.title} será eliminado de manera permanente.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' color='error' onClick={() => setSelectedProduct(null)}>
                            Cancelar
                        </Button>
                        <Button variant='contained' onClick={handleDeleteProduct}>
                            Eliminar
                        </Button>
                    </DialogActions>
                </Dialog>
            </OverScreen>
        }
    </Box>
    </>
  )
}

export default ProductsTab