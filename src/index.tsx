import { UserContextProvider } from './contexts/authContext';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { NavBarHeightProvider } from './contexts/navBarContext';
import { LastUrlProvider } from './contexts/pathContext';
import { WithResponseProvider } from './contexts/snackBarContext';
import { LoadingProvider } from './contexts/loadingContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <NavBarHeightProvider>
      <UserContextProvider>
        <LastUrlProvider>
          <WithResponseProvider>
            <LoadingProvider>
              <App />
            </LoadingProvider>
          </WithResponseProvider>
        </LastUrlProvider>
      </UserContextProvider>
    </NavBarHeightProvider>
  </BrowserRouter>
);

reportWebVitals();
