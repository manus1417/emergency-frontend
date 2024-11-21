import React from "react";
import { BsTornado } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaCarCrash } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TbUrgent } from "react-icons/tb";

import { MdOutlineLogout } from "react-icons/md";
const Header = () => {
  return (
    <div className="bg-[#478fc2] p-4 h-screen flex flex-col justify-start items-center text-white ">
      <div className="heading flex justify-center items-center  text-[43px] font-serif  gap-2">
        <BsTornado />
        RescQ
      </div>

      <div className="flex flex-col justify-center items-center gap-[80px]  text-[25px] font-semibold mt-[50px]">
        <Link
          to="/profile"
          className="hover:underline underline-offset-2 hover:scale-105 hover:text-black cursor-pointer flex justify-center items-center gap-1"
        >
          <CgProfile />
          Profile
        </Link>
        <Link
          to="/upload"
          className="hover:underline underline-offset-2 hover:scale-105 hover:text-black cursor-pointer flex justify-center items-center gap-1"
        >
          <FaCloudUploadAlt />
          Upload
        </Link>

        <Link
          to="/chatbot"
          className="hover:underline underline-offset-2 hover:scale-105 hover:text-black cursor-pointer flex justify-center items-center gap-1"
        >
          <FaCloudUploadAlt />
          ChatBot
        </Link>
        {/* <Link
          to="/accidents"
          className="hover:underline underline-offset-2 hover:scale-105 hover:text-black cursor-pointer flex justify-center items-center gap-1"
        >
          <FaCarCrash />
          Accidents
        </Link> */}

        <Link
          to="/"
          className="hover:underline underline-offset-2 hover:scale-105 hover:text-black cursor-pointer flex justify-center items-center gap-1"
        >
          <MdOutlineLogout />
          LogOut
        </Link>

        <Link
        to="/emergency"
        className="hover:underline underline-offset-2 hover:scale-105 hover:text-black cursor-pointer flex justify-center items-center gap-1">
          <TbUrgent size={70} color="red" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
