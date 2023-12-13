import { useContext } from 'react'
import { UserSessionContext } from '../contexts/authContext'
import { Navigate, useLocation } from 'react-router-dom'

function RequiredLogin( {children}:{children:JSX.Element} ) {
    const { isLogged } = useContext(UserSessionContext);
    const location = useLocation();

  return isLogged? children : <Navigate to={'/login'} replace state={{ path: location.pathname}}/>;
}

export default RequiredLogin