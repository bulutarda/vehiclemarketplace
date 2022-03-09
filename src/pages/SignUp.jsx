import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
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

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong with registration");
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="m-12 text-black flex flex-col mt-8 items-center justify-center ">
        <header>
          <p className="text-4xl mb-5 ">Welcome Back!</p>
        </header>
        <form onSubmit={onSubmit} className="flex flex-col items-center justify-center">
          <input
            type="text"
            className="mt-1 w-52 rounded-2xl p-3 mb-5"
            placeholder="Name"
            id="name"
            value={name}
            onChange={onChange}
          />
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
              className="cursor-pointer absolute p-4 bottom-4 left-40"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>

          <div className="mt-8 flex justify-center items-center">
            <p className="cursor-pointer text-2xl font-bold">Sign Up</p>
            <button className="cursor-pointer flex justify-center items-center w-12 h-12 bg-green-400 rounded-full ml-5">
              <ArrowRightIcon fill="#fffff" width="34px" height="34px" />
            </button>
          </div>
          <OAuth />
        </form>
        
        <div className="bg-white border-solid border-black rounded-3xl mb-3 px-5 py-2">
        <Link to="/sign-up" className="text-green-500 font-bold text-2xl">
          Sign In Instead
        </Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
