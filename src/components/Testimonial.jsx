import ReactStars from 'react-rating-stars-component';
const Testimonial = ({ testimonial }) => {
  const { ProfileImage, Rating, ReviewText, UserName } = testimonial;
  return (
    <div className="card w-96 bg-white shadow-xl p-6">
      <div className="space-y-4">
        {/* Stars */}
        <div className="flex gap-1">
          {/* {renderStars()} */}
          <ReactStars
            count={5}
            size={25}
            value={Rating}
            edit={false}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
          />
        </div>

        {/* Review Text */}
        <p className="text-gray-600 text-base font-body">{ReviewText}</p>

        {/* User Info */}
        <div className="flex items-center gap-3 pt-2">
          <div className="avatar">
            <div className="w-12 h-12 rounded-full">
              <img src={ProfileImage} alt={UserName} />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 font-heading">
              {UserName}
            </h3>
            <p className="font-body text-sm text-gray-500">Project Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
