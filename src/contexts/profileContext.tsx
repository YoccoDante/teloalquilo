import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { ProductModel } from '../models/product/productModel';

interface IProfileContext {
  products: ProductModel[];
  setProducts: React.Dispatch<React.SetStateAction<ProductModel[]>>;
}

// Crear el Context
const ProfileContext = createContext<IProfileContext | undefined>(undefined);

interface LoadingProviderProps {
  children: ReactNode;
}

// Crear el Provider
export const ProfileProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<ProductModel[]>([]);

  return (
    <ProfileContext.Provider value={{ products, setProducts }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Crear un hook personalizado para usar el Context
export const useProfileContext = (): IProfileContext => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfileContext debe ser usado dentro de un LoadingProvider');
  }
  return context;
};