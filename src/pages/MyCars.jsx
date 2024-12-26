import { format } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../hooks/useAxiosSecure';
const MyCars = () => {
  const axiosSecure = useAxiosSecure();
  const [carData, setCarData] = useState([]);

  const [carId, setCarId] = useState();

  const [sortOption, setSortOption] = useState('');
  const [errors, setErrors] = useState({});
  const { user } = useContext(AuthContext);
  const userEmail = user.email;

  const [loading, setLoading] = useState(true);

  // Fetch sorted reviews
  const fetchSortedReviews = async (sortBy = '') => {
    setLoading(true);
    try {
      const response = await axiosSecure.get(
        `/addCars/email/${userEmail}/sort`,
        {
          params: { sortBy },
        }
      );
      setCarData(response.data);
    } catch (error) {
      console.error('Error fetching sorted reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get(`/addCars/email/${userEmail}`);
        setCarData(response.data);
      } catch (error) {
        console.error('An error occurred while fetching car data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosSecure, userEmail]);

  // form validation
  const validateForm = (data) => {
    const errors = {};

    if (!data.model.trim()) errors.model = 'Model is required';

    if (!data.price || data.price <= 0)
      errors.price = 'Price must be greater than 0';

    if (!['Available', 'Not Available'].includes(data.availability))
      errors.availability =
        'Availability must be "Available" or "Not Available"';

    if (!data.regNumber.match(/^[A-Z0-9]{5,}$/))
      errors.regNumber = 'Invalid registration number format';

    if (!data.features.trim()) errors.features = 'Features are required';

    if (data.description.length < 20)
      errors.description = 'Description must be at least 20 characters';

    if (!data.imageURL) errors.imageURL = 'Image is required';

    if (!data.location.trim()) errors.location = 'Location is required';

    return errors;
  };

  // handle update data of cars
  const handleUpdate = async (e, carId) => {
    e.preventDefault();
    const form = e.target;
    const model = form.model.value;
    const price = parseInt(form.price.value);
    const availability = form.availability.value;
    const regNumber = form.regNumber.value;
    const features = form.features.value;
    const description = form.description.value;
    const location = form.location.value;
    const imageURL = form.image.value;
    const data = {
      model,
      price,
      availability,
      regNumber,
      features,
      description,
      location,
      imageURL,
    };

    const formErrors = validateForm(data);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    try {
      const response = await axiosSecure.patch(`/addCars/${carId}`, data);
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Car Data Updated Successfully',
        showConfirmButton: false,
        timer: 1500,
      });
      document.getElementById('my_modal_5').close();
      const updatedCars = await axiosSecure.get(`/addCars/email/${userEmail}`);
      setCarData(updatedCars.data);
      return response.data;
    } catch (error) {
      console.error('Error updating car:', error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Failed to update car data',
      });
    }
  };
  // delete a review
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}/addCars/${id}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: 'Deleted!',
                text: 'Your Car data has been deleted.',
                icon: 'success',
              });

              const remainingReviews = carData.filter(
                (data) => data._id !== id
              );
              setCarData(remainingReviews);
            }
          });
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>RideSphere | My Cars</title>
      </Helmet>
      <section className="container px-4 mx-auto">
        <div className="text-center my-5 space-y-2 py-4">
          <p className="font-body text-gray-500 italic">
            Drive Your Dreams, One Click at a Time! 🚗✨
          </p>
          <h1 className="font-heading text-3xl font-semibold text-[#ff3600]">
            Cars Added By You
          </h1>
        </div>

        {/* sort */}
        <div className="flex items-center justify-center ">
          <p className="font-heading mr-2 text-xl text-[#ec4899]">Sort by: </p>
          <select
            value={sortOption}
            onChange={(e) => {
              const selectedOption = e.target.value;
              setSortOption(selectedOption);
              fetchSortedReviews(selectedOption);
            }}
            className="select select-bordered w-full max-w-xs  font-heading"
          >
            <option className="font-heading" value="">
              Default sort
            </option>
            <option className="font-heading" value="price">
              {' '}
              Price (Lowest First)
            </option>
            <option className="font-heading" value="date">
              Date (Newest First)
            </option>
          </select>
        </div>
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 ">
                  <thead className="">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 font-heading font-normal text-left rtl:text-right text-gray-800"
                      >
                        <div className="flex items-center gap-x-3">
                          <span>Car Model</span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 font-heading font-normal text-left rtl:text-right text-gray-800"
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Availability</span>
                          <svg
                            className="h-3"
                            viewBox="0 0 10 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth="0.1"
                            />
                            <path
                              d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth="0.1"
                            />
                            <path
                              d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth="0.3"
                            />
                          </svg>
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 font-heading font-normal text-left rtl:text-right text-gray-800"
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Date Added</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                            />
                          </svg>
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 font-heading font-normal text-left rtl:text-right text-gray-800"
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Booking Count</span>
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 font-heading font-normal text-left rtl:text-right text-gray-800 "
                      >
                        Daily Rental Price
                      </th>

                      <th
                        scope="col"
                        className=" px-4 py-3.5 font-heading font-normal text-left rtl:text-right text-gray-800 "
                      >
                        <span className="">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loading ? (
                      <div className="flex justify-center items-center h-32">
                        <span className="loading loading-spinner loading-lg"></span>
                      </div>
                    ) : carData.length > 0 ? (
                      carData.map((car) => (
                        <tr key={car._id}>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              <div className="flex items-center gap-x-2">
                                <img
                                  className="object-cover w-10 h-10 rounded-full"
                                  src={car.imageURL}
                                  alt="Car"
                                />
                                <div>
                                  <h2 className="font-medium text-gray-800  font-heading">
                                    {car.model}
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div
                              className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${
                                car.availability === 'Available'
                                  ? 'bg-emerald-100/60'
                                  : 'bg-warning'
                              }`}
                            >
                              <h2
                                className={`text-sm font-body font-normal ${
                                  car.availability === 'Available'
                                    ? 'text-emerald-500'
                                    : 'text-red-500'
                                }`}
                              >
                                {car.availability}
                              </h2>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-800 font-body whitespace-nowrap">
                            {format(new Date(car.date), 'MM/dd/yy')}
                          </td>
                          <td className="px-4 py-4 font-body text-gray-800 whitespace-nowrap">
                            {car.bookingCount}
                          </td>
                          <td className="px-4 py-4 font-body text-gray-800 whitespace-nowrap">
                            {car.price} $
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div className="flex items-center gap-x-6">
                              {/* Delete button */}
                              <button
                                onClick={() => handleDelete(car._id)}
                                className="text-gray-800 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-800 hover:text-red-500 focus:outline-none"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                              </button>

                              {/* Update button */}
                              <button
                                onClick={() => {
                                  document
                                    .getElementById('my_modal_5')
                                    .showModal();
                                  setCarId(car._id);
                                }}
                                className="text-gray-800 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-800 hover:text-yellow-500 focus:outline-none"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="font-body text-2xl text-center"
                        >
                          You have not Added any car.{' '}
                          <Link
                            className="btn font-heading bg-[#ff3600] text-white text-xl"
                            to="/add-car"
                          >
                            Add Car
                          </Link>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* show the modal here */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box dark:bg-[#3C3C3C] dark:text-gray-500">
          <form onSubmit={(e) => handleUpdate(e, carId)} className="card-body">
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
                className={`input input-bordered ${
                  errors.model ? 'border-red-500' : ''
                }`}
                required
              />
              {errors.model && (
                <span className="text-red-500 text-sm">{errors.model}</span>
              )}
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
                className={`input input-bordered ${
                  errors.price ? 'border-red-500' : ''
                }`}
                required
              />
              {errors.price && (
                <span className="text-red-500 text-sm">{errors.price}</span>
              )}
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
                className={`input input-bordered ${
                  errors.availability ? 'border-red-500' : ''
                }`}
                required
              />
              {errors.availability && (
                <span className="text-red-500 text-sm">
                  {errors.availability}
                </span>
              )}
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
                className={`input input-bordered ${
                  errors.regNumber ? 'border-red-500' : ''
                }`}
                required
              />
              {errors.regNumber && (
                <span className="text-red-500 text-sm">{errors.regNumber}</span>
              )}
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
                className={`input input-bordered ${
                  errors.features ? 'border-red-500' : ''
                }`}
                required
              />
              {errors.features && (
                <span className="text-red-500 text-sm">{errors.features}</span>
              )}
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
                className={`input input-bordered ${
                  errors.description ? 'border-red-500' : ''
                }`}
                required
              />
              {errors.description && (
                <span className="text-red-500 text-sm">
                  {errors.description}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="font-medium text-xl font-heading text-[#ff3600]">
                  Image here
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
                Update Car
              </button>
            </div>
          </form>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
        <div></div>
      </dialog>
    </div>
  );
};

export default MyCars;
