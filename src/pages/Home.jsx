import { useEffect, useState } from 'react';
import { FaCar } from 'react-icons/fa';
import { IoPricetagsOutline } from 'react-icons/io5';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { TbBrandBooking } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import FeaturedCar from '../components/FeaturedCar';
import Testimonial from '../components/Testimonial';

const Home = () => {
  const [cars, setCars] = useState([]);
  const [testimonials, setTestimonials] = useState([]);


  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/featuredCars`)
      .then((response) => response.json())
      .then((data) => {
        setCars(data);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/testimonials`)
      .then((response) => response.json())
      .then((data) => {
        setTestimonials(data);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

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
      <div className="space-y-14 my-14 w-11/12 mx-auto">
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

      {/* Recent listing */}
      <div className="w-11/12 mx-auto my-14">
        <div className="text-center space-y-1 mb-14">
          <p className="font-body text-[#ff3600] ">
            Find the Ride That Drives You Forward!
          </p>
          <h1 className="font-heading text-3xl font-semibold ">
            Discover Your Dream Car Today!
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cars.map((car) => (
            <FeaturedCar key={car._id} car={car}></FeaturedCar>
          ))}
        </div>
      </div>

      {/* testimonials */}
      <div className=''>
        <div className="text-center my-14 space-y-2">
          <p className="font-body text-lg text-[#ff3600]">
            Voices of Trust, Stories of Satisfaction!
          </p>
          <h1 className="font-heading text-3xl font-semibold">
            What Our Clients are Said About Our Service
          </h1>
        </div>
        <div>
          {testimonials.map((testimonial) => (
            <Testimonial
              key={testimonial._id}
              testimonial={testimonial}
            ></Testimonial>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
