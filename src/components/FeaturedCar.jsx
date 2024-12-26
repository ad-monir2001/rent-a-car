const FeaturedCar = ({ car }) => {
  const { availability, car_image, daily_price, date_posted, model,booking_count } = car;

  const isAvailable = availability === 'Available';

  return (
    <div className="relative group w-full max-w-sm bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={car_image}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <div
            className={
              availability === 'Available'
                ? 'badge badge-success text-white font-body'
                : 'badge badge-error text-white font-body'
            }
          >
            {availability}
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-black/50 text-white px-3 py-1 rounded-full text-sm font-body">
            {date_posted}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors font-heading">
            {model}
          </h2>
          <span className="text-lg font-bold text-blue-600">
            {daily_price}
            <span className="text-sm text-gray-500">/day</span>
          </span>
        </div>

        <div className="flex gap-3 mt-4">
          <div className="flex items-center gap-1">
            
            <span className="text-sm font-body text-gray-600">Booked: <span className="text-[#ff3600]">{booking_count}</span></span>
          </div>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="font-body text-sm text-gray-600">Free Pickup</span>
          </div>
        </div>

        <button
          disabled={!isAvailable}
          className={`w-full font-heading mt-6 py-2 rounded-lg transition-colors duration-300 focus:ring-2 focus:ring-offset-2
            ${
              isAvailable
                ? 'bg-[#ff3600] hover:bg-green-500 text-white focus:ring-blue-500'
                : 'bg-gray-300 cursor-not-allowed text-gray-500'
            }`}
        >
          {isAvailable ? 'Rent Now' : 'Not Available'}
        </button>
      </div>
    </div>
  );
};

export default FeaturedCar;
