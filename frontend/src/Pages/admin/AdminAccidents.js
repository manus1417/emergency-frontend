import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "../../Components/AdminHeader";

const AdminAccidents = () => {
  // State to store incidents data
  const [incidents, setIncidents] = useState([]);
  const [filteredIncidents, setFilteredIncidents] = useState([]); // State to store filtered incidents
  const [filter, setFilter] = useState(""); // State to store the current filter

  // Fetch incidents data on component mount
  useEffect(() => {
    const fetchIncidentsData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/incident/all-Incidents"
        );
        setIncidents(response?.data || []); // Update state with incidents data or empty array if data is undefined
        setFilteredIncidents(response?.data || []); // Initialize filtered incidents
      } catch (error) {
        console.error("Error fetching incidents data:", error);
      }
    };

    fetchIncidentsData();
  }, []);

  // Handle filter change
  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);

    let sortedIncidents = [...incidents];

    switch (selectedFilter) {
      case "latest":
        sortedIncidents.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "oldest":
        sortedIncidents.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "type":
        sortedIncidents.sort((a, b) => a.type.localeCompare(b.type));
        break;
      default:
        break;
    }

    setFilteredIncidents(sortedIncidents);
  };

  // Function to generate Google Maps URL
  const generateGoogleMapsLink = (location) => {
    const query = encodeURIComponent(location);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  return (
    <div className="flex">
      <AdminHeader />
      <div className="mt-10 p-4 flex flex-col w-full overflow-auto h-[720px]">
        <div className="flex justify-between items-center">
          <h1 className="text-[40px] font-semibold place-self-center font-serif underline underline-offset-2">
            All Incidents
          </h1>
          <div className="">
            <select
              value={filter}
              onChange={handleFilterChange}
              className="border p-2 rounded shadow-md"
            >
              <option value="">Filter by</option>
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
        <div className="p-6 flex justify-evenly gap-5 flex-wrap items-center mt-10">
          {filteredIncidents.length > 0 ? (
            filteredIncidents.map((incident, index) => (
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
                <button
                  onClick={() =>
                    window.open(
                      generateGoogleMapsLink(incident.location),
                      "_blank"
                    )
                  }
                  className="mt-4 bg-blue-500 text-white p-2 rounded shadow-md hover:bg-blue-600"
                >
                  Check Location
                </button>
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

export default AdminAccidents;
