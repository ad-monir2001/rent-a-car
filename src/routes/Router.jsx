import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import AvailableCars from '../pages/AvailableCars';
import PrivateRoute from './PrivateRoute';
import AddCar from '../pages/AddCar';
import MyCars from '../pages/MyCars';
import MyBookings from '../pages/MyBookings';
import Root from '../pages/Root';
import Home from '../pages/Home';
import CarDetails from '../pages/CarDetails';

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
        element: <CarDetails></CarDetails>,
        loader: (params)=> fetch(`http://localhost:5000/addCars/${params.id}`)
      }
    ],
  },
]);

export default router;
