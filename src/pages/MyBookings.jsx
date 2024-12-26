import axios from 'axios';
import { format } from 'date-fns';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { CalendarCog, Trash } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
const MyBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const { user } = useContext(AuthContext);
  const userEmail = user.email;

  // date handle

  // start
  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  // end
  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const handleBookingDate = async () => {
    try {
      if (!selectedStartDate || !selectedEndDate) {
        toast.error('Please select both start and end dates');
        return;
      }

      const bookingStart = format(new Date(selectedStartDate), 'dd/MM/yyyy');
      const bookingEnd = format(new Date(selectedEndDate), 'dd/MM/yyyy');

      const response = await axiosSecure.put(`/bookedCars/${selectedCarId}`, {
        bookingStart,
        bookingEnd,
      });

      if (response.data) {
        setCarData((prevData) =>
          prevData.map((car) =>
            car._id === selectedCarId
              ? { ...car, bookingStart, bookingEnd }
              : car
          )
        );

        toast.success('Booking dates updated successfully');
        setSelectedStartDate(null);
        setSelectedEndDate(null);
        setSelectedCarId(null);

        // Close the modal
        document.getElementById('conform').close();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Error updating booking dates'
      );
    }
  };

  const openDateModal = (carId) => {
    setSelectedCarId(carId);
    document.getElementById('conform').showModal();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get(`/bookedCars/${userEmail}`);
        setCarData(response.data);
      } catch (error) {
        console.error('An error occurred while fetching car data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosSecure, userEmail]);

  // Cancel a Booking
  const handleCancelBooking = (id) => {
    Swal.fire({
      title: 'Are you sure you want to cancel this booking?',
      text: 'Think twice before you cancel – your adventure awaits!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(`${import.meta.env.VITE_API_URL}/bookedCars/${id}`, {
            bookingStatus: 'canceled',
          })
          .then((response) => {
            console.log('Response:', response.data);
            if (response.data.modifiedCount > 0) {
              setCarData((prevBookings) =>
                prevBookings.map((booking) =>
                  booking._id === id
                    ? { ...booking, bookingStatus: 'canceled' }
                    : booking
                )
              );
              Swal.fire({
                title: 'Updated!',
                text: 'Your booking has been cancelled.',
                icon: 'success',
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              title: 'Error!',
              text: 'Failed to cancel booking.',
              icon: 'error',
            });
            console.error('Error:', error);
          });
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>RideSphere | My Bookings</title>
      </Helmet>
      <div className="text-center space-y-1 my-4">
        <p className="italic font-body text-gray-500">
          Your Plans, Our Priority – Seamless Booking, Every Time!
        </p>
        <h1 className="font-semibold text-3xl font-heading text-[#ff3600]">
          My Bookings
        </h1>
      </div>
      <Toaster />
      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className=" w-11/12 my-10 mx-auto py-2 align-middle md:px-6 lg:px-8">
            <div className=" border border-gray-200 md:rounded-lg">
              <div></div>
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
                          {!car.bookingStart
                            ? car.bookingDate
                            : `${car.bookingStart} to ${car.bookingEnd}`}
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
                              className="flex flex-col items-center transition-colors duration-200 text-red-500 focus:outline-none"
                            >
                              <Trash />
                              <span className="text-sm font-body">Cancel</span>
                            </button>

                            {/* Update date */}
                            <button
                              onClick={() => {
                                openDateModal(car._id);
                              }}
                              className=" transition-colors duration-200 text-blue-500 focus:outline-none flex items-center flex-col"
                            >
                              <CalendarCog />
                              <span className="text-sm font-body">
                                Modify Date
                              </span>
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

      <div className="mx-auto w-11/12 my-10">
        <div className="text-center my-9 space-y-1">
          <p className="font-body italic text-gray-500">
            Drive Your Budget Further – Affordable Daily Rentals for Every
            Journey!
          </p>
          <h1 className="font-heading text-[#ff3600] font-semibold text-2xl">
            Charts Based on car Daily Rental Price
          </h1>
        </div>
        <div>
          <BarChart width={600} height={300} data={carData}>
            <XAxis dataKey="model" stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar dataKey="price" fill="#8884d8" barSize={30} />
          </BarChart>
        </div>
      </div>

      {/* show the conformation modal */}
      <dialog id="conform" className="modal modal-bottom sm:modal-middle">
        <Toaster />
        <div className="modal-box text-center">
          <h3 className="font-bold text-xl font-heading text-[#ff3600]">
            Select Your Booking Date
          </h3>
          <div className="flex items-center justify-between border py-14 px-2 rounded-xl my-2 ">
            <div className="flex gap-1">
              <p>Start:</p>
              <DatePicker
                className="font-body border rounded-lg text-center"
                selected={selectedStartDate}
                onChange={handleStartDateChange}
                minDate={new Date()}
                placeholderText="Select Start Date"
              />
            </div>
            <div className="flex gap-1">
              <p>End:</p>
              <DatePicker
                className="font-body border rounded-lg text-center"
                selected={selectedEndDate}
                onChange={handleEndDateChange}
                minDate={selectedStartDate || new Date()}
                placeholderText="Select End Date"
              />
            </div>
          </div>
          <div className="modal-action">
            <form
              method="dialog"
              className="flex justify-between gap-4 items-center"
            >
              <button
                onClick={handleBookingDate}
                type="button"
                className="btn btn-success font-heading text-white"
              >
                Confirm
              </button>
              <button className="btn btn-error text-white font-heading">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyBookings;
