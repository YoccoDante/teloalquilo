import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

let historyStack: string[] = [];

export function useNavigation() {
  const location = useLocation();

  useEffect(() => {
    historyStack.push(location.pathname);
  }, [location]);

  const back = () => {
    historyStack.pop(); // remove current page
    return historyStack[historyStack.length - 1]; // return previous page
  };

  return { back };
}