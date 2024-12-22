import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";

const router = createBrowserRouter([
   {
      path: '/',
      element: <Home></Home>,
      errorElement: <ErrorPage></ErrorPage>,
      children:[
         {
            path:'login',
            element: <Login></Login>
         },
         {
            path: 'register',
            element: <Registration></Registration>
         }
      ]
   }
])

export default router;