import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../Components/Header";

const Accidents = () => {
  // State to store incidents data
  const [incidents, setIncidents] = useState([]);

  // Fetch incidents data on component mount
  useEffect(() => {
    const fetchIncidentsData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/incident/all-Incidents"
        );
        console.log(response.data); // Debugging: Log response data to check its structure
        setIncidents(response?.data || []); // Update state with incidents data or empty array if data is undefined
      } catch (error) {
        console.error("Error fetching incidents data:", error);
      }
    };

    fetchIncidentsData();
  }, []);

  return (
    <div className="flex ">
      <Header />
      <div className="mt-10 p-4 flex flex-col w-full overflow-auto h-screen">
        <h1 className="text-[40px] font-semibold place-self-center font-serif underline underline-offset-2">
          All Incidents
        </h1>
        <div className="p-6 flex justify-evenly gap-5 flex-wrap items-center">
          {incidents.length > 0 ? (
            incidents.map((incident, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded p-4 mb-4 w-[400px]"
              >
                {incident.image && (
                  <img
                    src={incident.image}
                    alt={`Incident ${index + 1}`}
                    className="w-full h-[300px] mb-4 rounded"
                  />
                )}
                <p className="font-semibold">Name: {incident.name}</p>
                <p>Location: {incident.location}</p>
                <p>Date: {incident.date}</p>
                <p>Time: {incident.time}</p>
                <p>Type: {incident.type}</p>
              </div>
            ))
          ) : (
            <p>No incidents found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accidents;
