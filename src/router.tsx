import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';
import SuspenseLoader from '../src/components/SuspenseLoader';
import LandingPage from '../src/user-content/pages/LandingPage'
import NavBar from './commons/NavBar';
import React from 'react';

const Loader = (Component:any) => (props:any) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages
//CommonContent
const NotFound = Loader(
  lazy(() => import('./commons/404'))
)
//UserContent
const SignIn = Loader(
    lazy(() => import("./user-content/pages/Auth/SignIn"))
)
const SignUp = Loader(
  lazy(() => import("./user-content/pages/Auth/SignUp"))
)
const SideBar = Loader(
  lazy(() => import('./layouts/SideBar'))
)
const About = Loader(
  lazy(() => import("./user-content/pages/About"))
)
const Products = Loader(
  lazy(() => import("./user-content/pages/Products"))
)
const QuickQuestions = Loader(
  lazy(() => import("./user-content/pages/QuickQuestions"))
)
const ProductDetails = Loader(
  lazy(() => import("./user-content/pages/ProductDetails"))
)
const Finder = Loader(
  lazy(() => import('./user-content/pages/Finder'))
)
const HostDetails = Loader(
  lazy(() => import('./user-content/pages/HostDetails'))
)
//Host Content
const HostPanel = Loader(
  lazy(() => import('./host-content/pages'))
)
// const AdminOverview = Loader(
//   lazy(() => import('./user-content/overviews/AdminOverview'))
// )
// const UsersManagment =  Loader(
//   lazy(() => import('./user-content/applications/User/managment/index'))
// )
// const ProductsManagment = Loader(
//   lazy(() => import('./user-content/applications/Products/managment'))
// )
// const FinanceStatus = Loader(
//   lazy(() => import('./user-content/applications/Finance/status'))
// )

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
            path:"products",
            element:<Products/>,
          },
          {
            path:"quickquestions",
            element:<QuickQuestions/>
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
      path:'admin',
      element:<HostPanel/>
      // children:[
      //   {
      //     path:'',
      //     element:<Navigate to='adminoverview'/>,
      //   },
      //   {
      //     path:'adminoverview',
      //     element:<AdminOverview/>
      //   },
      //   {
      //     path:"users",
      //     element:<UsersManagment/>
      //   },
      //   {
      //     path:"products",
      //     element:<ProductsManagment/>
      //   },
      //   {
      //     path:"finance",
      //     element:<FinanceStatus/>
      //   },
      //   {
      //     path:"rate",
      //     element:<StarRating/>
      //   }
      // ]
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
      path:"/finder/:customer_id",
      children:[
        {
          path:"",
          element:<HostDetails/>
        }
      ]
    },
    {
      path:"*",
      element:<NotFound/>
    }
  ]

export default routes;