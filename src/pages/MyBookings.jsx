import axios from 'axios';
import { format } from 'date-fns';
import { CalendarCog, Trash } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../providers/AuthProvider';
const MyBookings = () => {
  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const userEmail = user.email;
  console.log(carData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/bookedCars/${userEmail}`
        );
        setCarData(response.data);
      } catch (error) {
        console.error('An error occurred while fetching car data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userEmail]);

  // Cancel a Booking
  // const handleCancelBooking = (id) => {
  //   Swal.fire({
  //     title: 'Are you sure you want to cancel this booking?',
  //     text: "Think twice before you cancel – your adventure awaits!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       axios.patch(`${import.meta.env.VITE_API_URL}/addCars/${id}`, {

  //         bookingStatus: 'canceled'
  //       })
  //         .then((response) => {
  //           if (response.data.modifiedCount > 0) {
  //             Swal.fire({
  //               title: 'Updated!',
  //               text: 'Your booking has been cancelled.',
  //               icon: 'success',
  //             });

  //             // Update the local state with the modified data
  //             const updatedCarData = carData.map(car =>
  //               car._id === id ? { ...car, bookingStatus: 'cancelled' } : car
  //             );
  //             setCarData(updatedCarData);
  //           }
  //         })
  //         .catch((error) => {
  //           Swal.fire({
  //             title: 'Error!',
  //             text: 'Failed to cancel booking.',
  //             icon: 'error',
  //           });
  //           console.error('Error:', error);
  //         });
  //     }
  //   });
  // };
  return (
    <div>
      <div className="text-center space-y-1 my-4">
        <p className="italic font-body text-gray-500">
          Your Plans, Our Priority – Seamless Booking, Every Time!
        </p>
        <h1 className="font-semibold text-3xl font-heading text-[#ff3600]">
          My Bookings
        </h1>
      </div>
      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className=" w-11/12 my-10 mx-auto py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="">
                  <tr className="bg-[#e8f5e9] text-[#1b5e20]">
                    <th
                      scope="col"
                      className="py-3.5 px-4 font-heading font-normal text-left rtl:text-right"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Car Model</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 font-heading font-normal text-left rtl:text-right "
                    >
                      Total Price(+15% fee)
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 font-heading font-normal text-left rtl:text-right  "
                    >
                      Booking Date
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 font-heading font-normal text-left rtl:text-right  "
                    >
                      Booking Status
                    </th>

                    <th
                      scope="col"
                      className=" px-4 py-3.5 font-heading font-normal text-left rtl:text-right  "
                    >
                      <span className="">Actions</span>
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
                      <tr
                        className="bg-[#e3f2fd] text-[#0d47a1] hover:bg-[#fffde7] hover:text-[#424242]"
                        key={car._id}
                      >
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <div className="flex items-center gap-x-2">
                              <img
                                className="object-cover w-10 h-10 rounded-full"
                                src={car.imageURL}
                                alt="Car"
                              />
                              <div>
                                <h2 className="font-medium   font-heading">
                                  {car.model}
                                </h2>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 font-body  whitespace-nowrap">
                          {parseInt(car.price) + parseInt(car.price * 0.15)}
                        </td>
                        <td className="px-4 py-4 text-sm  font-body whitespace-nowrap">
                          {format(new Date(car.date), 'MM/dd/yy')}
                        </td>
                        <td className="px-4 py-4 font-body  whitespace-nowrap">
                          <div
                            className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${
                              car.bookingStatus === 'confirmed'
                                ? 'bg-emerald-100/60'
                                : car.bookingStatus === 'canceled'
                                ? 'bg-red-100/60'
                                : car.bookingStatus === 'pending'
                                ? 'bg-yellow-100/60'
                                : 'bg-warning'
                            }`}
                          >
                            <h2
                              className={`text-sm font-body font-semibold ${
                                car.bookingStatus === 'confirmed'
                                  ? 'text-emerald-500'
                                  : car.bookingStatus === 'canceled'
                                  ? 'text-red-500'
                                  : car.bookingStatus === 'pending'
                                  ? 'text-yellow-500'
                                  : 'text-warning'
                              }`}
                            >
                              {car.bookingStatus}
                            </h2>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-6">
                            {/* cancel booking button */}
                            <button
                              onClick={() => handleCancelBooking(car._id)}
                              className="text-gray-800 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-800 hover:text-red-500 focus:outline-none"
                            >
                              <Trash />
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
                              <CalendarCog />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="font-body text-2xl text-center py-14"
                      >
                        You have not Booked any car.{' '}
                        <Link
                          className="btn font-heading bg-[#ff3600] text-white text-xl"
                          to="/available-cars"
                        >
                          Book car
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
    </div>
  );
};

export default MyBookings;
