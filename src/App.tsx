import { useRoutes } from 'react-router-dom';
import router from '../src/router';

function App() {
  const content = useRoutes(router)
  return (
    <>
      {content}
    </>
  );
}

export default App;
