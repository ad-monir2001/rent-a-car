import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";

const router = createBrowserRouter([
   {
      path: '/',
      element: <Home></Home>,
      errorElement: <ErrorPage></ErrorPage>,
      children:[
         {
            path:'login',
            element: <Login></Login>
         }
      ]
   }
])

export default router;