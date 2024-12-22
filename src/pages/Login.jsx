import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import toast, { Toaster } from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../providers/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';

const Login = () => {
  const { handleLogin, setUser, handleGoogleLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleFormData = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    handleLogin(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Successfully login.',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location?.state ? location.state : '/');
      })
      .catch((error) => {
        const errorMessage = error.message;
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Failed to login.',
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(errorMessage);
      });
  };

  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    handleGoogleLogin(provider)
      .then((result) => {
        const user = result.user;
        setUser(user);

        toast.success('Successfully sign in with google!');
        navigate(location?.state ? location.state : '/');
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  return (
    <div>
      <Helmet>
        <title>RideSphere | Login</title>
      </Helmet>
      <div className="hero bg-no-repeat bg-cover py-12">
        <div className="hero-content w-full flex-col">
          <div className="rounded-lg bg-[url(/images/loginBg.jpg)] md:w-3/5 bg-gray-800 bg-blend-overlay w-full bg-no-repeat bg-cover">
            <h1 className="font-bold text-3xl font-heading text-center py-5 text-[#FF3600]">
              Log-In Here
            </h1>
            <form onSubmit={handleFormData} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="font-medium text-xl font-heading text-[#ff3600]">
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your email"
                  className="input input-bordered font-body"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="font-medium text-xl font-heading text-[#ff3600]">
                    Password
                  </span>
                </label>

                <input
                  type="password"
                  placeholder="Enter Your password"
                  name="password"
                  className="input input-bordered font-body"
                  required
                />
                <label className="my-2">
                  <p className="font-body text-white">
                    Don&apos;t Have an Account?{' '}
                    <Link
                      to="/register"
                      className=" font-heading text-[#ff3600] hover:underline hover:text-red-500 ml-1"
                    >
                      Register
                    </Link>{' '}
                  </p>
                </label>
              </div>
              <div className="form-control mt-2">
                <button className="btn font-heading text-xl border border-[#ff3600] text-[#ff3600] hover:text-white hover:bg-[#ff3600] hover:border-none">
                  Login
                </button>
              </div>
              <div>
                <Toaster />
              </div>
            </form>
            <div className="divider divider-accent px-6">
              <h1 className="font-bold text-2xl text-[#ff3600] text-center font-heading">
                OR
              </h1>
            </div>
            <div className="flex items-start justify-center mb-6">
              <button
                onClick={googleLogin}
                className="btn border-none font-body bg-[#ff3600] hover:text-[#ff3600] text-white font-bold text-xl"
              >
                Continue with <FaGoogle />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
