import { Link } from 'react-router-dom';
import { FaCar } from 'react-icons/fa';
import { IoPricetagsOutline } from 'react-icons/io5';
import { TbBrandBooking } from 'react-icons/tb';
import { RiCustomerService2Fill } from 'react-icons/ri';

const Home = () => {
  return (
    <div>
      {/* Banner Section */}
      <div className="w-full bg-[url(/images/banner.jpg)] md:min-h-[80vh] min-h-[40vh] bg-no-repeat bg-contain md:bg-cover bg-gray-700 bg-blend-overlay flex items-center justify-center flex-col gap-8">
        <h1 className="text-white font-heading font-bold md:text-4xl text-xl text-center lg:w-1/3">
          Your Perfect Ride is Just a Click Away!
        </h1>
        <Link to="available-cars">
          <button
            className="btn border-none font-heading md:text-xl md:font-semibold text-white  bg-[#ff3600] hover:text-[#ff3600] hover:bg-white
         "
          >
            View Available Cars
          </button>
        </Link>
      </div>

      {/* Why choose us */}
      <div className='space-y-14 my-6 w-11/12 mx-auto'>
        <div className="text-center">
          <p className="font-body text-lg text-[#ff3600]">Why Choose Us</p>
          <h1 className="font-heading text-3xl font-semibold">
            Drive Your Journey, Powered by Trust!
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {/* card */}
          <div className="flex gap-2 ">
            <FaCar className="font-bold text-3xl text-[#ff3600]" />
            <div>
              <h1 className="font-heading text-xl font-medium">
                Wide Variety of Cars
              </h1>
              <p className="font-body text-lg text-gray-500">
                Explore a wide selection of cars, from luxury to economy,
                tailored to match your journey and budget needs.
              </p>
            </div>
          </div>
          {/* card */}
          <div className="flex gap-2 ">
            <IoPricetagsOutline className="font-bold text-3xl text-[#ff3600]" />
            <div>
              <h1 className="font-heading text-xl font-medium">
                Affordable Prices
              </h1>
              <p className="font-body text-lg text-gray-500">
                Enjoy competitive rates and unbeatable value, ensuring quality
                car rentals that fit your budget perfectly.
              </p>
            </div>
          </div>

          {/* card */}
          <div className="flex gap-2 ">
            <TbBrandBooking className="font-bold text-3xl text-[#ff3600]" />
            <div>
              <h1 className="font-heading text-xl font-medium">
                Easy Booking Process
              </h1>
              <p className="font-body text-lg text-gray-500">
                Experience a seamless and hassle-free booking process designed
                to get you on the road quickly and effortlessly
              </p>
            </div>
          </div>
          {/* card */}
          <div className="flex gap-2 ">
            <RiCustomerService2Fill className="font-bold text-3xl text-[#ff3600]" />
            <div>
              <h1 className="font-heading text-xl font-medium">
                Customer Support
              </h1>
              <p className="font-body text-lg text-gray-500">
                Dedicated customer support available 24/7 to assist you every
                step of the way, ensuring a smooth rental experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
