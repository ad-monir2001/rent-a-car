import { createBrowserRouter } from 'react-router-dom';
import AddCar from '../pages/AddCar';
import AvailableCars from '../pages/AvailableCars';
import CarDetails from '../pages/CarDetails';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MyBookings from '../pages/MyBookings';
import MyCars from '../pages/MyCars';
import Registration from '../pages/Registration';
import Root from '../pages/Root';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: 'login',
        element: <Login></Login>,
      },
      {
        path: 'register',
        element: <Registration></Registration>,
      },
      {
        path: 'available-cars',
        element: <AvailableCars></AvailableCars>,
      },
      {
        path: 'add-car',
        element: (
          <PrivateRoute>
            <AddCar></AddCar>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-cars',
        element: (
          <PrivateRoute>
            <MyCars></MyCars>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-bookings',
        element: (
          <PrivateRoute>
            <MyBookings></MyBookings>
          </PrivateRoute>
        ),
      },
      {
        path: 'car-details/:id',
        element: <PrivateRoute><CarDetails></CarDetails></PrivateRoute>,
        loader: (params)=> fetch(`${import.meta.env.VITE_API_URL}/addCars/${params.id}`)
      }
    ],
  },
]);

export default router;
