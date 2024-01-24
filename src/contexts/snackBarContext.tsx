import React, { createContext, useState, useContext, ReactNode } from 'react';
import { WithResponseModel } from '../models/withResponse';

interface IContext {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  withResponse: WithResponseModel | null;
  setWithResponse: React.Dispatch<React.SetStateAction<WithResponseModel | null>>;
}

// Crear el Context
const WithResponseContext = createContext<IContext | undefined>(undefined);

interface WithResponseContext {
  children: ReactNode;
}

// Crear el Provider
export const WithResponseProvider: React.FC<WithResponseContext> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [withResponse, setWithResponse] = useState<WithResponseModel | null>(null);

  return (
    <WithResponseContext.Provider value={{ open, setOpen, withResponse, setWithResponse }}>
      {children}
    </WithResponseContext.Provider>
  );
};

// Crear un hook personalizado para usar el Context
export const useWithResponseContext = (): IContext => {
  const context = useContext(WithResponseContext);
  if (!context) {
    throw new Error('useAppContext debe ser usado dentro de un AppProvider');
  }
  return context;
};