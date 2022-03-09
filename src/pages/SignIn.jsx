import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";
const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Bad User Credentials");
    }
  };

  const navigate = useNavigate();
  return (
    <>
      <div className="m-12 text-black flex flex-col mt-8 items-center justify-center">
        <p className=" text-4xl mb-5">Welcome Back!</p>

        <form onSubmit={onSubmit}>
          <input
            type="email"
            className="mt-1 w-52 rounded-2xl p-3 mb-5"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="mt-1 w-52 rounded-2xl p-3 mb-5"
              placeholder="Password"
              id="password"
              value={password}
              onChange={onChange}
            />
            <img
              src={visibilityIcon}
              alt="show password"
              className="absolute left-44 bottom-8"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>
          <Link to="/forgot-password" className="text-red-500 font-semibold ml-2">
            Forgot Password
          </Link>
          <div className="mt-8 flex justify-center items-center">
            <p className="cursor-pointer text-2xl font-bold">Sign In</p>
            <button className="cursor-pointer flex justify-center items-center w-12 h-12 bg-green-400 rounded-full ml-5">
              <ArrowRightIcon fill="#fffff" width="34px" height="34px" />
            </button>
          </div>
          <OAuth />
        </form>
        <div className="bg-white border-solid border-black rounded-3xl mb-3 px-5 py-2">
        <Link to="/sign-up" className="text-green-500 font-bold text-2xl">
          Sign Up Instead
        </Link>
        </div>
      </div>
    </>
  );
};

export default SignIn;
