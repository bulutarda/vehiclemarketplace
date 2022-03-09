import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Navbar = () => {
  const navigate = useNavigate();
  
  return (
    <nav className="w-full flex flex-col">
      <div className="p-10 md:px-10 lg:px-30 xl:px-120 z-10 justify-between flex font-bold ">
        <a
          className="whitespace-nowrap  text-xl text-black cursor-pointer"
          onClick={() => navigate("/")}
        >
          Vehicle Market Place
        </a>

        <div className="  flex flex-col gap-x-5 gap-y-5 md:flex md:flex-row ">
          <a
            className=" font-medium text-xl text-black cursor-pointer hover:underline "
            onClick={() => navigate("/")}
          >
            Explore
          </a>
          <a
            className=" font-medium text-xl text-black cursor-pointer hover:underline "
            onClick={() => navigate("/offers")}
          >
            Offers
          </a>
          <a
            className=" font-medium text-xl text-black cursor-pointer hover:underline "
            onClick={() => navigate("/profile")}
          >
            Profile
          </a>
          
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
