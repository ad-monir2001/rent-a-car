import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const CarDetails = () => {
  const { id } = useParams();
  const [carData, setCarData] = useState([]);

  const car = carData.filter((data) => data._id === id);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:5000/addCars`);
      const data = await res.json();
      setCarData(data);
    };
    fetchData();
  }, []);

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
                  // onClick={() => setShowModal(true)}
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
    </div>
  );
};

export default CarDetails;
