import { CalendarDays, MessageSquare, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Coupon = ({ coupon }) => {
  const { car_img, title, offer_exp_date } = coupon;

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white"
    >
      <div className="relative">
        <img
          src={car_img}
          alt="Car rental promotion"
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            Exclusive
          </span>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-heading font-bold text-gray-800 mb-4">
          {title}
        </h2>

        <div className="flex items-center gap-4 text-gray-600 text-sm mb-4">
          <div className="flex items-center gap-1">
            <CalendarDays className="w-4 h-4" />
            <span>
              {new Date(offer_exp_date).toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'short',
                year: '2-digit',
              })}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            <span>25</span>
          </div>
          <div className="flex items-center gap-1">
            <Share2 className="w-4 h-4" />
            <span>15</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full font-heading bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <span>Learn More</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Coupon;
