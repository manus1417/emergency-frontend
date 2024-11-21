import React, { useState } from "react";
import bg from "../assets/bg.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for showing password
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      // Send a POST request to the backend to register the user
      const response = await axios.post("http://localhost:8000/user/register", {
        name,
        email,
        password,
      });

      // Navigate to the login page after successful registration
      navigate("/");
    } catch (error) {
      // Handle errors like user already exists
      if (error.response && error.response.data.message === "User already exists") {
        setErrorMessage("User already exists");
      } else {
        setErrorMessage("An error occurred, please try again.");
      }
    }
  };

  return (
    <div className="h-screen bg-[#478fc2] flex justify-center items-center relative">
      <img
        className="h-full w-full object-cover absolute opacity-85"
        src={bg}
        alt="background"
      />
      <div className="bg-white opacity-90 p-6 w-[90%] max-w-[450px] rounded-xl z-10 flex flex-col">
        <h1 className="font-bold text-3xl text-blue-700 text-center underline underline-offset-4">
          SignUp
        </h1>

        {errorMessage && (
          <div className="text-red-500 text-center mt-4">
            {errorMessage}
          </div>
        )}

        <input
          className="p-2 rounded-md w-full border-[#478fc2] border-2 outline-none mt-6 text-lg"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        <input
          className="p-2 rounded-md w-full border-[#478fc2] border-2 outline-none mt-6 text-lg"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative mt-6">
          <input
            className="p-2 rounded-md w-full border-[#478fc2] border-2 outline-none text-lg"
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-2 top-2 text-sm text-blue-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          onClick={handleSignUp}
          className="place-self-center p-2 w-full rounded-lg bg-blue-400 mt-8 font-bold text-xl hover:scale-105 cursor-pointer"
        >
          SignUp
        </button>

        <span className="place-self-center mt-5 text-xl text-center">OR</span>

        <h1 className="mt-5 text-lg font-semibold text-center">
          Already have an account?{" "}
          <Link
            to="/"
            className="hover:underline text-blue-700 underline-offset-2 cursor-pointer"
          >
            Login
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default SignUp;
