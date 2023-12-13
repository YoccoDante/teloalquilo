import { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context
interface NavBarHeightContextProps {
  navBarHeight: number;
  setNavBarHeight: React.Dispatch<React.SetStateAction<number>>;
}

// Initialize the context
const NavBarHeightContext = createContext<NavBarHeightContextProps | undefined>(undefined);

// Custom hook for easy access to the context
export function useNavBarHeight() {
  const context = useContext(NavBarHeightContext);
  if (!context) {
    throw new Error('useNavBarHeight must be used within a NavBarHeightProvider');
  }
  return context;
}

// Create a provider component to provide the context to its children
interface NavBarHeightProviderProps {
  children: ReactNode;
}

export function NavBarHeightProvider({ children }: NavBarHeightProviderProps) {
  const [navBarHeight, setNavBarHeight] = useState(0);

  return (
    <NavBarHeightContext.Provider value={{ navBarHeight, setNavBarHeight }}>
      {children}
    </NavBarHeightContext.Provider>
  );
}