import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

// Create a context to store the history of visited URLs
interface LastUrlContextProps {
  urlHistory: string[];
}

const LastUrlContext = createContext<LastUrlContextProps | undefined>(undefined);

// Create a provider component
interface LastUrlProviderProps {
  children: ReactNode;
}

export function LastUrlProvider({ children }: LastUrlProviderProps) {
  const [urlHistory, setUrlHistory] = useState<string[]>([]);
  const location = useLocation();

  // Add the current URL to the history every time the location changes
  useEffect(() => {
    setUrlHistory(prevHistory => [...prevHistory, location.pathname]);
  }, [location]);

  return (
    <LastUrlContext.Provider value={{ urlHistory }}>
      {children}
    </LastUrlContext.Provider>
  );
}

// Create a hook to use the URL history
export function useLastUrl() {
  const context = useContext(LastUrlContext);
  if (context === undefined) {
    throw new Error('useLastUrl must be used within a LastUrlProvider');
  }
  return context;
}