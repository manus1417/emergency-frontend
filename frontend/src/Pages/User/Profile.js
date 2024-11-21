import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("user_id"); // Retrieve user ID from local storage

        if (userId) {
          const response = await axios.post(
            "http://localhost:8000/user/single-user",
            {
              userId: userId,
            }
          );
          console.log(response.data);
          setUserData(response.data); // Store fetched user data in state
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex">
      <Header />

      <div className="flex justify-center items-center gap-[100px]">
        <div className="shadow-xl p-4 h-[400px] w-[400px] ml-5 mt-10 rounded-lg flex flex-col hover:scale-95 hover:shadow-2xl cursor-pointer">
          <img
            className="rounded-full h-[250px] w-[250px] place-self-center"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkZTK04q5MAb3xxGj9xiBt-rOefqwu5X4jtg&s"
            alt="Profile"
          />

          <h1 className="mt-8 text-[20px] font-bold font-sans">
            Username: {userData?.username || "Loading..."}
          </h1>
          <h1 className="mt-5 text-[20px] font-bold font-sans">
            Total number of incidents reported:{" "}
            {userData && userData.incidents ? userData.incidents.length : 0}
          </h1>
        </div>

        <div className="h-[600px] w-[500px] overflow-auto shadow-2xl rounded-xl p-4 flex flex-col">
          <h1 className="text-[30px] font-bold font-serif place-self-center mt-10 underline underline-offset-2">
            Your Reports
          </h1>

          <div className="mt-5">
            {userData && userData.incidents && userData.incidents.length > 0 ? (
              userData.incidents.map((incident, index) => (
                <div key={index} className="border p-3 rounded mb-2">
                  {incident.image && (
                    <img
                      src={incident.image}
                      alt={`Incident ${index + 1}`}
                      className="w-full h-auto mt-2 rounded"
                    />
                  )}
                  <h2 className="font-bold">Incident #{index + 1}</h2>
                  <p className="font-semibold">Name: {incident.name}</p>
                  <p>Location: {incident.location}</p>
                  <p>Date: {incident.date}</p>
                  <p>Time: {incident.time}</p>
                  <p>Type: {incident.type}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-[25px] mt-[100px]">
                No reports uploaded till now
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
