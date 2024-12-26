import axios from 'axios';
import { LayoutGrid, List } from 'lucide-react';
import { useEffect, useState } from 'react';
import AvailableCarCard from '../components/AvailableCarCard';
import { Helmet } from 'react-helmet-async';
const AvailableCars = () => {
  const [carData, setCarData] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState('');
  const [isGridView, setIsGridView] = useState(true);

  // Fetch sorted reviews
  const fetchSortedReviews = async (sortBy = '') => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/addCars/sort`,
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
  // search functionality
  const handleSearch = (event) => {
    const item = event.target.value;
    setItem(item);
  };

  const searchData = carData.filter((car) =>
    car.model.toLowerCase().includes(item.toLowerCase())
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/addCars`
        );
        setCarData(response.data);
      } catch (error) {
        console.error('An error occurred while fetching car data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>RideSphere | Available Cars</title>
      </Helmet>
      <div className="text-center space-y-2 my-8">
        <p className="font-body text-gray-500 italic">
          Your Journey Awaits – Choose the Perfect Ride! 🚘🌟
        </p>
        <h1 className="font-heading font-semibold text-3xl text-[#ff3600]">
          Available Cars
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 my-8">
        <div>
          {/* sort */}
          <div className="flex  ">
            <p className="font-heading mr-2 text-xl text-[#ff3600]">
              Sort by:{' '}
            </p>
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
        </div>
        {/* Search and View Toggle Container */}
        <div className="flex w-full max-w-xl justify-between items-center gap-4 px-2 my-5">
          {/* Search Input */}
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <input
              onChange={handleSearch}
              type="text"
              className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border rounded-md focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              placeholder="Search based on Model"
            />
          </div>

          {/* View Toggle Buttons */}
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setIsGridView(true)}
              className={`p-2 rounded ${
                isGridView
                  ? 'bg-white shadow-sm text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <LayoutGrid size={20} />
            </button>
            <button
              onClick={() => setIsGridView(false)}
              className={`p-2 rounded ${
                !isGridView
                  ? 'bg-white shadow-sm text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Grid/List Container */}
      <div
        className={`mx-auto w-11/12 ${
          isGridView
            ? 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 my-14'
            : 'flex flex-col gap-4 my-8'
        }`}
      >
        {searchData.map((car) => (
          <div
            key={car._id}
            className={!isGridView ? 'w-full max-w-4xl mx-auto' : ''}
          >
            <AvailableCarCard car={car} isListView={!isGridView} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableCars;
