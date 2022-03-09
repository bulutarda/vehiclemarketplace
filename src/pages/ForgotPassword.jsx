import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
    } catch (error) {
      toast.error("Could not send reset email");
    }
  };
  return (
    <div className="m-4">
      <header>
        <p className="font-bold text-4xl">Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            className="mb-4 mt-4 bg-white border-solid border-black rounded-3xl  px-5 py-2"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          ></input>

          <div className="mt-4 flex justify-between items-center ">
            <div className="cursor-pointer text-sm rounded-3xl border-solid text-center block w-40 px-2 py-2 mb-5 bg-green-500 text-black font-medium">
              Send Reset Link
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ForgotPassword;
