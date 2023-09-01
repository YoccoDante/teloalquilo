import { useRoutes } from 'react-router-dom';
import router from '../src/router';
import React from "react";

function App() {
  const content = useRoutes(router)
  return (
    <>
      {content}
    </>
  );
}

export default App;
