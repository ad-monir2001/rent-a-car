import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import AvailableCars from "../pages/AvailableCars";
import PrivateRoute from "./PrivateRoute";
import AddCar from "../pages/AddCar";
import MyCars from "../pages/MyCars";
import MyBookings from "../pages/MyBookings";

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
         },
         {
            path: 'available-cars',
            element: <AvailableCars></AvailableCars>
         },
         {
            path: 'add-car',
            element: <PrivateRoute><AddCar></AddCar></PrivateRoute>
         }
         ,
         {
            path: 'my-cars',
            element: <PrivateRoute><MyCars></MyCars></PrivateRoute>
         },
         {
            path: 'my-bookings',
            element: <PrivateRoute><MyBookings></MyBookings></PrivateRoute>
         }

      ]
   }
])

export default router;