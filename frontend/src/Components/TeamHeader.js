import React from "react";
import { BsTornado } from "react-icons/bs";
import { Link } from "react-router-dom";
import { RiTeamFill } from "react-icons/ri";
import { FaCarCrash } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout } from "react-icons/md";
const TeamHeader = () => {
  return (
    <div className="bg-[#478fc2] p-4 h-screen w-[300px] flex flex-col justify-start items-center text-white ">
      <div className="heading flex justify-center items-center  text-[43px] font-serif  gap-2">
        <BsTornado />
        RescQ
      </div>

      <div className="flex flex-col justify-center items-center gap-[80px]  text-[25px] font-semibold mt-[100px]">
        <Link
          to="/allincidents"
          className="hover:underline underline-offset-2 hover:scale-105 hover:text-black cursor-pointer flex justify-center items-center gap-1"
        >
          <FaCarCrash />
          ALL Accidents
        </Link>

        <Link
          to="/team"
          className="hover:underline underline-offset-2 hover:scale-105 hover:text-black cursor-pointer flex justify-center items-center gap-1"
        >
          <RiTeamFill />
          Teams
        </Link>

        <Link
          to="/"
          className="hover:underline underline-offset-2 hover:scale-105 hover:text-black cursor-pointer flex justify-center items-center gap-1"
        >
          <MdOutlineLogout />
          LogOut
        </Link>
      </div>
    </div>
  );
};

export default TeamHeader;
