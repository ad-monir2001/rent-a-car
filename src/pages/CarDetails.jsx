import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';
import { format } from 'date-fns';

const CarDetails = () => {
  const { id } = useParams();
  const [carData, setCarData] = useState([]);
  const { user } = useContext(AuthContext);

  const car = carData.filter((data) => data._id === id);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/addCars`);
      const data = await res.json();
      setCarData(data);
    };
    fetchData();
  }, []);


  const handleBooking = (id,imageURL,model,price,bookingStatus) => {
    const bookedCarId = id;
    const bookingDate = format(new Date(), "dd/MM/yy h:m");
    const bookedBy = user.email;
    const bookingData = { bookedCarId, bookedBy, bookingDate,imageURL, model,price,bookingStatus};

    axios
      .post(`${import.meta.env.VITE_API_URL}/bookedCars`, bookingData)
      .then((res) => {
        console.log(res);
        document.getElementById('conform').showModal()
      })
      .catch((error) => {
        toast.error(`${error.response.data}`)
      });
  };

  return (
    <div>
      {car.map((c) => (
        <div key={c._id} className="relative">
          <div className="md:w-7/12 mx-auto my-16 rounded-lg overflow-hidden shadow-lg bg-white">
            <div className="relative h-48">
              <img
                src={c.imageURL}
                alt={c.model}
                className="w-full h-full object-cover"
              />
              <span
                className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                  c.availability === 'Available'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {c.availability}
              </span>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-heading font-bold text-gray-900">
                  {c.model}
                </h2>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">${c.price}</p>
                  <p className="text-sm text-gray-500">per day</p>
                </div>
              </div>

              <p className="text-gray-600 font-body mb-4">{c.description}</p>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold font-heading text-gray-900 mb-2">
                  Features: {c.features}
                </h3>
              </div>

              {/* Book Now Button */}
              <div className="flex justify-between items-center">
                <button
                  onClick={() => {
                    
                    handleBooking(c._id,c.imageURL,c.model,c.price,c.bookingStatus);
                  }}
                  className="bg-green-500 font-heading text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Book Now
                </button>
                <Link
                  className="bg-[#ff3600] text-white font-semibold py-2 font-heading px-4 rounded-lg transition-colors"
                  to="/available-cars"
                >
                  Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* show the conformation modal */}
      <dialog id="conform" className="modal modal-bottom sm:modal-middle">
        {car.map((c) => (
          <div key={c._id} className="modal-box text-center">
            <h3 className="font-bold text-xl font-heading text-[#ff3600]">
              Congratulations!!!
            </h3>
            <p className="py-1 font-body italic">
              You have successfully Booked{' '}
              <span className="font-heading text-[#ff3600] text-xl">
                {c.model}
              </span>
            </p>
            <div className="flex items-center justify-between border p-8 rounded-xl my-2 ">
              <div className="space-y-2">
                <p>
                  Price per day:{' '}
                  <span className="font-body text-green-500">{c.price}$</span>
                </p>
                <p>
                  Location:{' '}
                  <span className="font-body text-green-500">{c.location}</span>
                </p>
              </div>
              <div className="space-y-2">
                <p>
                  RegNumber:{' '}
                  <span className="font-body text-green-500">
                    {c.regNumber}
                  </span>
                </p>
                <p>
                  Booking Status:{' '}
                  <span className="font-body text-green-500">
                    {c.bookingStatus}
                  </span>
                </p>
              </div>
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        ))}
      </dialog>
      <div><Toaster/></div>
    </div>
  );
};

export default CarDetails;
