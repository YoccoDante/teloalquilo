import { useRoutes } from 'react-router-dom';
import router from '../src/router';
import { Snackbar, Alert } from '@mui/material';
import { useWithResponseContext } from './contexts/snackBarContext';

function App() {
  const content = useRoutes(router)
  const {withResponse, setWithResponse} = useWithResponseContext()
  return (
    <>
      {content}
      <Snackbar open={withResponse !== null} onClose={() => setWithResponse(null)} autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert  severity={withResponse?.color} sx={{ width: '100%' }}>
            {withResponse?.msg}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
