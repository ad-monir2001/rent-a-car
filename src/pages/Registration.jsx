import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../providers/AuthProvider';

const Registration = () => {
  const navigate = useNavigate();
  const { registration, setUser, handleUpdate } = useContext(AuthContext);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    if (!isFormValid) {
      return;
    }

    // firebase signup
    registration(email, password)
      .then((result) => {
        const user = result.user;
        handleUpdate({
          displayName: name,
          photoURL: photoURL,
        });
        setUser(user);
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Successfully Sign Up.',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/');
      })
      .catch((error) => {
        console.log(error.message);
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'Failed to sign Up',
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const validatePassword = (value) => {
    setPassword(value);

    if (value.length < 6) {
      setError('Password must be at least 6 characters long.');
    } else if (!/[A-Z]/.test(value)) {
      setError('Password must contain at least one uppercase letter.');
    } else if (!/[a-z]/.test(value)) {
      setError('Password must contain at least one lowercase letter.');
    } else if (value.length > 6) {
      setError('Password must be not more than 6');
    } else {
      setError('');
      setIsFormValid(true);
    }
  };

  return (
    <div>
      <Helmet>
        <title>RideSphere | Registration</title>
      </Helmet>
      <div className="hero  bg-no-repeat bg-cover py-12">
        <div className="hero-content w-full flex-col">
          <div className="card bg-[url(/images/loginBg.jpg)] md:w-3/5 bg-gray-800 bg-blend-overlay bg-no-repeat bg-cover">
            <h1 className="font-bold text-3xl font-heading text-center py-5 text-[#ff3600]">
              Registration{' '}
            </h1>
            <form onSubmit={handleSignIn} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="font-medium text-xl font-heading text-[#ff3600]">
                    Name
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your name"
                  className="input input-bordered font-body"
                  required
                />
              </div>
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
                    Photo URL
                  </span>
                </label>
                <input
                  type="text"
                  name="photoURL"
                  placeholder="Enter Your PhotoURL"
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
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {!error && password && (
                  <p style={{ color: 'green' }}>Password is valid!</p>
                )}
                <input
                  type="password"
                  value={password}
                  onChange={(e) => validatePassword(e.target.value)}
                  placeholder="Enter Your password"
                  name="password"
                  className="input input-bordered font-body"
                  required
                />
                <label className="my-4">
                  <p className="font-body text-white">
                    Already Have an Account?{' '}
                    <Link
                      to="/login"
                      className=" font-heading text-[#ff3600] hover:underline hover:text-red-500 ml-1"
                    >
                      Login
                    </Link>{' '}
                  </p>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn font-heading text-xl border border-[#ff3600] text-[#ff3600] hover:text-white hover:bg-[#ff3600] hover:border-none">
                  Sign Up
                </button>
              </div>
              <div>
                <Toaster />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
