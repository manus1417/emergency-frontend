import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import { IoCall } from "react-icons/io5";

const Emergency = () => {
    const phoneNumber = "7075934043";



  return (
    <div className="flex">
      <Header />
      <div className="flex justify-center mx-auto text-center align-middle items-center">
      <a href={`tel:${phoneNumber}`}>
          <button className="bg-red-700 flex gap-5 text-4xl text-white hover:scale-110 transition-all duration-200 p-5 rounded-xl">
            <IoCall className="translate-y-1" />
            Emergency
          </button>
        </a>
      </div>
    </div>
  );
};

export default Emergency;
