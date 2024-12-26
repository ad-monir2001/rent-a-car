import { Link, useNavigate } from 'react-router-dom';
import { CarFront, ArrowLeft, Home } from 'lucide-react';

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="relative mb-8">
          <div className="animate-bounce">
            <CarFront className="w-24 h-24 mx-auto text-[#ff3600]" />
          </div>
          <div className="absolute top-16 w-full">
            <div className="w-16 h-1 mx-auto bg-gray-200 rounded-full shadow-lg animate-pulse" />
          </div>
        </div>
        <h1 className="text-9xl font-bold font-heading text-[#ff3600] mb-4">
          404
        </h1>
        <h2 className="text-3xl font-semibold font-heading text-gray-800 mb-4">
          Oops! Wrong Turn
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto font-body">
          Looks like this road leads nowhere. The page you're looking for has
          either been moved or doesn't exist.
        </p>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#ff3600] rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
