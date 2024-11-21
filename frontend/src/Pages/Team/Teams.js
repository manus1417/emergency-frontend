import React from "react";
import TeamHeader from "../../Components/TeamHeader";

// Define a Card component to be reused for each department
const Card = ({ imageSrc, name }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-64 h-[220px] mx-4 my-2">
      <img src={imageSrc} alt={name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-center">{name}</h3>
      </div>
    </div>
  );
};

const Teams = () => {
  return (
    <div className="flex">
      <TeamHeader />
      <div className="flex flex-wrap justify-center items-center mt-[100px] h-full gap-20">
        <Card
          imageSrc="https://www.livelaw.in/cms/wp-content/uploads/2014/01/Indian-Police.jpg"
          name="Police"
        />
        <Card
          imageSrc="https://amandeephospital.org/wp-content/uploads/2022/02/ambulance-ad.jpg"
          name="Ambulance"
        />
        <Card
          imageSrc="https://www.hindustantimes.com/ht-img/img/2023/05/04/1600x900/Fire-operators-Amit-Rana--Neeraj-Sehrawat--Sarvesh_1683202869362.jpg"
          name="Firefighters"
        />
        <Card
          imageSrc="https://www.placer.ca.gov/ImageRepository/Document?documentID=57979"
          name="Rescue Team"
        />
      </div>
    </div>
  );
};

export default Teams;
