import { Link } from "react-router-dom";
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg";
import Slider from "../components/Slider";

const Explore = () => {
  
  return (
    <>
     <div className="flex flex-col-reverse md:flex-row mt-8 ml-9">
       <div className="flex flex-col">
       <h1 className="text-6xl text-black font-bold mt-7 max-h-fit">Market place for your vehicle</h1>
       <h2 className="text-gray-500 text-xl mt-8">A free website to make your vehicle list for sale or rent. </h2>
       </div> 
       <img className="overflow-hidden p-10 rounded-full mr-7 pt-8 w-11/12 md:w-6/12"src="https://c1.wallpaperflare.com/preview/572/106/537/adventure-asphalt-country-country-lane.jpg" alt="road-image" />
     </div>
      <Slider className="mt-10"/>
      <div className="text-black flex mt-5 ml-5">
        <div className="flex flex-col md:flex-row gap-x-96 gap-y-5">
          <div className=" md:ml-20 max-h-80 overflow-hidden max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <Link to="/category/rent">
              <img
                src="https://media.istockphoto.com/photos/car-in-a-studio-picture-id1276548449?b=1&k=20&m=1276548449&s=612x612&w=0&h=Vi8sMFXREqa9W0k4wrfrdmuqR77-q_Xkhr_bQ8Z1-8k="
                alt="rent"
                className="rounded-t-lg w-full h-44 object-cover"
              />
              <div className="p-5">
                <h1 className="ml-10mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Vehicles for rent
                </h1>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  See the vehicles that have been listed for rent by users.
                </p>
              </div>
            </Link>
          </div>
          <div className="mb-10 max-h-80 overflow-hidden max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <Link to="/category/sale">
              <img
                src="https://www.pngkey.com/png/detail/252-2526563_top-view-of-a-car-png-transparent-top.png "
                alt="sell"
                className="rounded-t-lg w-full h-44 object-cover"
              />
              <div className="p-5">
                <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Vehicles for sale
                </h1>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  See the vehicles that have been listed for sale by users.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
