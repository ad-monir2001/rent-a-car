import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Helmet } from 'react-helmet-async';

const Root = () => {
  return (
    <div>
      <Helmet>
        <title>RideSphere | Home</title>
      </Helmet>
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-312px)]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
