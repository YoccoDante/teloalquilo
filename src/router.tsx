import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';
import SuspenseLoader from '../src/componets/SuspenseLoader';
import LandingPage from '../src/content/pages/LandingPage'
import NavBar from './commons/NavBar';

const Loader = (Component:any) => (props:any) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages
const SignIn = Loader(
    lazy(() => import("../src/content/pages/Auth/SignIn"))
)
const SignUp = Loader(
  lazy(() => import("../src/content/pages/Auth/SignUp"))
)
const SideBar = Loader(
  lazy(() => import('./layouts/SideBarLayout'))
)
const AdminOverview = Loader(
  lazy(() => import('./content/overviews/AdminOverview'))
)
const UsersManagment =  Loader(
  lazy(() => import('./content/applications/User/managment/index'))
)
const ProductsManagment = Loader(
  lazy(() => import('./content/applications/Products/managment'))
)
const FinanceStatus = Loader(
  lazy(() => import('./content/applications/Finance/status'))
)
const StarRating = Loader(
  lazy(() => import('./content/applications/StarRate/rating'))
)
const About = Loader(
  lazy(() => import("./content/pages/About"))
)

const routes:RouteObject[] = [
    {
        path:'/',
        element:<NavBar/>,
        children:[
          {
            path:'',
            element:<Navigate to='home' replace/>
          },
          {
            path:'home',
            element:<LandingPage/>
          },
          {
            path:"about",
            element:<About/>
          }
        ]
    },
    {
      path:'/login',
      element:<SignIn/>
    },
    {
      path:'/register',
      element:<SignUp/>
    },
    {
      path:'admin',
      element:<SideBar/>,
      children:[
        {
          path:'',
          element:<Navigate to='adminoverview'/>,
        },
        {
          path:'adminoverview',
          element:<AdminOverview/>
        },
        {
          path:"users",
          element:<UsersManagment/>
        },
        {
          path:"products",
          element:<ProductsManagment/>
        },
        {
          path:"finance",
          element:<FinanceStatus/>
        },
        {
          path:"rate",
          element:<StarRating/>
        }
      ]
    }
]

export default routes;