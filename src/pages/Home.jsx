import { useEffect, useState } from 'react';
import { FaCar } from 'react-icons/fa';
import { IoPricetagsOutline } from 'react-icons/io5';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { TbBrandBooking } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import FeaturedCar from '../components/FeaturedCar';
import Coupon from '../components/Coupon';
import ReactStars from 'react-rating-stars-component';
import { easeInOut, motion } from 'framer-motion';

const Home = () => {
  const [cars, setCars] = useState([]);
  const [coupons, setCoupons] = useState([]);

  // fetch featured cars
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/featuredCars`)
      .then((response) => response.json())
      .then((data) => {
        setCars(data);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  // fetch coupons data
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/coupons`)
      .then((response) => response.json())
      .then((data) => {
        setCoupons(data);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div>
      {/* Banner Section */}
      <div className="w-full bg-[url(/images/bg.jpg)] md:min-h-[80vh] min-h-[30vh] bg-no-repeat bg-cover md:bg-cover bg-gray-700 bg-blend-overlay flex items-center justify-center flex-col gap-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
          <p className="font-body italic text-gray-500 ">
            Find the Ride That Drives You Forward!
          </p>
          <h1 className="font-heading text-[#ff3600] font-semibold text-3xl ">
            Discover Your Dream Car Today!
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cars.map((car) => (
            <FeaturedCar key={car._id} car={car}></FeaturedCar>
          ))}
        </div>
      </div>

      {/* testimonials */}
      <div className="">
        <div className="text-center my-14 space-y-2">
          <p className="font-body italic text-gray-500">
            Voices of Trust, Stories of Satisfaction!
          </p>
          <h1 className="font-heading text-[#ff3600] font-semibold text-3xl">
            What Our Clients Said About Our Services
          </h1>
        </div>
        <div className="w-10/12 mx-auto md:flex gap-6 my-10">
          {/* card 1 */}
          <motion.div
            animate={{ y: [0, 50, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
            className="card bg-white shadow-xl p-6 mb-16 md:mb-0"
          >
            <div className="space-y-4">
              {/* Stars */}
              <div className="flex gap-1">
                {/* {renderStars()} */}
                <ReactStars
                  count={5}
                  size={25}
                  value={5}
                  edit={false}
                  isHalf={true}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />
              </div>

              {/* Review Text */}
              <p className="text-gray-600 text-base font-body">
                Amazing experience! The car was in excellent condition and the
                process was seamless.
              </p>

              {/* User Info */}
              <div className="flex items-center gap-3 pt-2">
                <div className="avatar">
                  <div className="w-12 h-12 rounded-full">
                    <img
                      src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Asif Adnan"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 font-heading">
                    Asif Adnan
                  </h3>
                  <p className="font-body text-sm text-gray-500">
                    Project Manager
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          {/* card 2 */}
          <motion.div
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="card bg-white shadow-xl p-6"
          >
            <div className="space-y-4">
              {/* Stars */}
              <div className="flex gap-1">
                {/* {renderStars()} */}
                <ReactStars
                  count={5}
                  size={25}
                  value={4.2}
                  edit={false}
                  isHalf={true}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />
              </div>

              {/* Review Text */}
              <p className="text-gray-600 text-base font-body">
                The car was good, but the pricing felt a bit high compared to
                others.
              </p>

              {/* User Info */}
              <div className="flex items-center gap-3 pt-2">
                <div className="avatar">
                  <div className="w-12 h-12 rounded-full">
                    <img
                      src="https://images.unsplash.com/photo-1580880783226-2eb5a737db5b?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Jalal Yousuf"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 font-heading">
                    Jalal Yousuf
                  </h3>
                  <p className="font-body text-sm text-gray-500">Researcher</p>
                </div>
              </div>
            </div>
          </motion.div>
          {/* card 3 */}
          <motion.div
            animate={{ y: [0, 50, 0] }}
            transition={{ duration: 12, repeat: Infinity }}
            className="card bg-white shadow-xl p-6 mt-4 md:mt-0"
          >
            <div className="space-y-4">
              {/* Stars */}
              <div className="flex gap-1">
                {/* {renderStars()} */}
                <ReactStars
                  count={5}
                  size={25}
                  value={4.5}
                  edit={false}
                  isHalf={true}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />
              </div>

              {/* Review Text */}
              <p className="text-gray-600 text-base font-body">
                Superb! Found exactly what I was looking for. Smooth
                transaction! process was seamless.
              </p>

              {/* User Info */}
              <div className="flex items-center gap-3 pt-2">
                <div className="avatar">
                  <div className="w-12 h-12 rounded-full">
                    <img
                      src="https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="kamal"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 font-heading">
                    Kamal Ataturk
                  </h3>
                  <p className="font-body text-sm text-gray-500">Sports Man</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* special offers */}
      <div className="w-11/12 mx-auto ">
        <div className="text-center pt-14">
          <p className="font-body italic text-gray-500">
            Unlock the Joy of Driving!
          </p>
          <h1 className="font-heading text-[#ff3600] font-semibold text-3xl">
            Find Your Exclusive Offer
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6  my-14">
          {coupons.map((coupon) => (
            <Coupon key={coupon._id} coupon={coupon}></Coupon>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
