import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ILoadingContext {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Crear el Context
const LoadingContext = createContext<ILoadingContext | undefined>(undefined);

interface LoadingProviderProps {
  children: ReactNode;
}

// Crear el Provider
export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Crear un hook personalizado para usar el Context
export const useLoadingContext = (): ILoadingContext => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoadingContext debe ser usado dentro de un LoadingProvider');
  }
  return context;
};