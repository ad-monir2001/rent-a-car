import { Link } from 'react-router-dom';

const AvailableCarCard = ({ car }) => {
  return (
    <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <img
        src={car.imageURL}
        alt={car.model}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <div
          className={`badge badge-outline text-sm font-body font-normal ${
            car.availability === 'Available'
              ? 'text-emerald-500'
              : 'text-red-500'
          }`}
        >
          {car.availability}
        </div>
        <h3 className="text-xl font-bold font-heading">{car.model}</h3>
        <p className="text-sm text-gray-500 font-body">
          {car.description.slice(0, 60)}...
        </p>
        <div className="flex items-center justify-between my-3">
          <div>
            <p className="text-sm font-medium font-heading">
              Location: <span className="text-gray-700">{car.location}</span>
            </p>
            <p className="text-sm font-medium font-heading">
              Features: <span className="text-gray-700">{car.features}</span>
            </p>
          </div>
          <p className="text-lg font-bold font-body">
            ${car.price}
            <span className="text-sm text-gray-500">/Day</span>
          </p>
        </div>
        <div className="flex justify-between items-center">
          <Link
            to={`/car-details/${car._id}`}
            disabled={car.availability === 'Not Available' && true}
            className="btn btn-sm bg-[#ff3600] text-white font-heading"
          >
            Book Now
          </Link>
          <span className="text-sm text-green-500 font-body">
            Booking: {car.bookingCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AvailableCarCard;
