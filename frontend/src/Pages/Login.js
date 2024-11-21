import React, { useState } from "react";
import bg from "../assets/bg.png"; // Ensure the path is correct
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from "@emailjs/browser";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMessage("");

    if (role === "Admin") {
      if (email === "sivasaketh689@gmail.com" && password === "admin123") {
        const digits = "0123456789";
        let otp = "";
        for (let i = 0; i < 6; i++) {
          otp += digits[Math.floor(Math.random() * 10)];
        }
        var data1 = {
          otp: otp,
          email: email,
        };
        emailjs
          .send(
            "service_u17ktod",
            "template_1ujqdfd",
            data1,
            "E227cpqu76H5djOKk"
          )
          .then(
            (result) => {
              alert("Otp sent");
              localStorage.setItem("otp", otp);
              navigate("/otp");
            },
            (error) => {
              console.log(error.text);
            }
          );
      } else {
        setErrorMessage("Invalid Credentials");
      }
    }

    else if (role === "Team") {
      if (email === "team@gmail.com" && password === "team123") {
        navigate("/team");
      } else {
        setErrorMessage("Invalid Credentials");
      }
    }

    else {
      try {
        const response = await axios.post("http://localhost:8000/user/login", {
          email,
          password,
        });

        if (response.data && response.data.user) {
          localStorage.setItem("user_id", response.data.user._id);
          navigate("/profile");
        } else {
          setErrorMessage("No user found");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        setErrorMessage("Wrong credentials");
      }
    }
  };

  return (
    <div
      className="h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-white opacity-90 p-6 w-[90%] max-w-[450px] rounded-xl z-10 flex flex-col">
        <h1 className="font-bold text-3xl text-blue-700 text-center underline underline-offset-4">
          Login
        </h1>

        <input
          className="p-2 mt-6 rounded-md w-full border-[#478fc2] border-2 outline-none text-lg"
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

        <select
          className="p-2 mt-6 rounded-md w-full border-[#478fc2] border-2 outline-none text-lg cursor-pointer"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option hidden>Select Your Role</option>
          <option value="User">User</option>
          <option value="Team">Emergency Team</option>
          <option value="Admin">Administration</option>
        </select>

        {errorMessage && (
          <div className="text-red-500 mt-4 text-center text-sm">{errorMessage}</div>
        )}

        <button
          onClick={handleLogin}
          className="place-self-center p-2 w-full rounded-lg bg-blue-400 mt-8 font-bold text-xl hover:scale-105 cursor-pointer"
        >
          Login
        </button>

        <span className="place-self-center mt-5 text-xl text-center">OR</span>

        <h1 className="mt-5 text-lg font-semibold text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="hover:underline text-blue-700 underline-offset-2 cursor-pointer"
          >
            Register
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Login;
