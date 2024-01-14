import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';
import SuspenseLoader from '../src/components/SuspenseLoader';
import LandingPage from '../src/content/pages/LandingPage'
import NavBar from './commons/NavBar';
import RequiredLogin from './components/RequiredLogin';

const Loader = (Component:any) => (props:any) =>
  (
    <Suspense fallback={<SuspenseLoader/>}>
      <Component {...props} />
    </Suspense>
  );

const Admin = Loader(
  lazy(() => import('./content/pages/Admin'))
)
const NotFound = Loader(
  lazy(() => import('./commons/404'))
)
const SignIn = Loader(
    lazy(() => import("./content/pages/Auth/SignIn"))
)
const SignUp = Loader(
  lazy(() => import("./content/pages/Auth/SignUp"))
)
const About = Loader(
  lazy(() => import("./content/pages/About"))
)
const Products = Loader(
  lazy(() => import("./content/pages/Products"))
)
const QuickQuestions = Loader(
  lazy(() => import("./content/pages/QuickQuestions"))
)
const ProductDetails = Loader(
  lazy(() => import("./content/pages/ProductDetails"))
)
const Finder = Loader(
  lazy(() => import('./content/pages/Finder'))
)
const HostDetails = Loader(
  lazy(() => import('./content/pages/UserDetails'))
)
const ProfilePage = Loader(
  lazy(() => import('./content/pages/Profile'))
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
          },
          {
            path:'products',
            element:<Navigate to='listby/all'/>
          },
          {
            path:"products/listby/:filter",
            element:<Products/>,
          },
          {
            path:"quickquestions",
            element:<QuickQuestions/>
          },
          {
            path:'/profile',
            element:<RequiredLogin>
                      <ProfilePage/>
                    </RequiredLogin>
          }
        ]
    },
    {
      path:"/products/:product_id",
      children:[
        {
          path:"",
          element:<ProductDetails/>
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
      path:"/finder",
      element:<NavBar/>,
      children:[
        {
          path:"",
          element:<Finder/>
        }
      ]
    },
    {
      path:"/finder/:user_id",
      element:<NavBar/>,
      children:[
        {
          path:"",
          element:<HostDetails/>
        }
      ]
    },
    {
      path:'admin',
      element:<RequiredLogin>
                <Admin/>
              </RequiredLogin>
    },
    {
      path:"*",
      element:<NotFound/>
    }
  ]

export default routes;