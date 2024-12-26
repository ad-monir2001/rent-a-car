import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AddCar = () => {
  const { user } = useContext(AuthContext);


  const navigate = useNavigate();
  

  const handleForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const model = form.model.value;
    const price = parseInt(form.price.value);
    const availability = form.availability.value;
    const regNumber = form.regNumber.value;
    const features = form.features.value;
    const description = form.description.value;
    const bookingCount = parseInt(form.count.value);
    const location = form.location.value;
    const imageURL = form.image.value;
    const date = new Date();
    const userEmail = user.email;
    const userName = user.displayName
    const userImage = user.photoURL
    const bookingStatus = 'pending';
    const data = {
      model,
      price,
      availability,
      regNumber,
      features,
      description,
      bookingCount,
      location,
      imageURL,
      date,
      userEmail,
      userName,
      bookingStatus,
      userImage
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/addCars`, data)
      .then((res) => {
        console.log(res);
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Successfully Added Your Car',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/my-cars');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div>
      <Helmet>
        <title>RideSphere | Add Car</title>
      </Helmet>
      <div className="text-center my-4 space-y-1">
        <p className="font-body text-lg text-[#ff3600] italic">
          Drive Your Dreams with Ease!
        </p>
        <h1 className="font-heading text-3xl font-semibold">
          Add Your Favorite one
        </h1>
        <div className="hero bg-base-100  bg-no-repeat bg-cover my-12">
          <div className="hero-content  w-full flex-col">
            <div className="rounded-2xl   bg-[url(/images/addcar.png)] bg-gray-700 bg-blend-overlay md:w-3/5 bg-no-repeat bg-cover dark:border">
              <form onSubmit={handleForm} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="font-medium text-xl font-heading text-[#ff3600]">
                      Car Model
                    </span>
                  </label>
                  <input
                    type="text"
                    name="model"
                    placeholder="The car model"
                    className="input input-bordered font-body"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="font-medium text-xl font-heading text-[#ff3600]">
                      Daily Rental Price
                    </span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    className="input input-bordered font-body"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="font-medium text-xl font-heading text-[#ff3600]">
                      Availability
                    </span>
                  </label>
                  <input
                    type="text"
                    name="availability"
                    placeholder="Availability"
                    className="input input-bordered font-body"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="font-medium text-xl font-heading text-[#ff3600]">
                      Reg Number
                    </span>
                  </label>
                  <input
                    type="text"
                    name="regNumber"
                    placeholder="Vehicle Registration Number"
                    className="input input-bordered font-body"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="font-medium text-xl font-heading text-[#ff3600]">
                      Features
                    </span>
                  </label>
                  <input
                    type="text"
                    name="features"
                    placeholder="Vehicle Features (e.g., GPS, AC, etc.)
"
                    className="input input-bordered font-body"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="font-medium text-xl font-heading text-[#ff3600]">
                      Review Description
                    </span>
                  </label>
                  <textarea
                    type="text"
                    name="description"
                    placeholder=" A detailed review of the Car
"
                    className="textarea input-bordered font-body"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="font-medium text-xl font-heading text-[#ff3600]">
                      Booking Count
                    </span>
                  </label>
                  <input
                    type="number"
                    name="count"
                    defaultValue={0}
                    placeholder="Booking count"
                    className="input input-bordered font-body"
                    required
                  />
                </div>
                


                <div className="form-control">
                  <label className="label">
                    <span className="font-medium text-xl font-heading text-[#ff3600]">
                      Image URL
                    </span>
                  </label>
                  <input
                    type="text"
                    name="image"
                    placeholder="Image URL only"
                    className="input input-bordered font-body"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="font-medium text-xl font-heading text-[#ff3600]">
                      Location
                    </span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="location"
                    className="input input-bordered font-body"
                    required
                  />
                </div>

                <div className="form-control mt-6">
                  <button className="btn font-heading text-xl border border-[#ff3600] text-[#ff3600] hover:text-white hover:bg-[#ff3600] hover:border-none">
                    Add Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCar;
