import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "../../Components/AdminHeader";

const AllIncidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [filteredIncidents, setFilteredIncidents] = useState([]);
  const [filter, setFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);

  const fetchIncidentsData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/incident/all-Incidents"
      );
      setIncidents(response?.data || []);
      setFilteredIncidents(response?.data || []);
    } catch (error) {
      console.error("Error fetching incidents data:", error);
    }
  };

  useEffect(() => {
    fetchIncidentsData();
  }, []);

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

  const generateGoogleMapsLink = (location) => {
    const query = encodeURIComponent(location);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  const openEmailModal = (incident) => {
    setSelectedIncident(incident);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedIncident(null);
  };

  const sendEmail = (recipient) => {
    if (!selectedIncident) return;

    const query = encodeURIComponent(selectedIncident.location);
    const emailContent = `Incident Details:\nName: ${selectedIncident.name}\nLocation:https://www.google.com/maps/search/?api=1&query=${query} \nDate: ${selectedIncident.date}\nTime: ${selectedIncident.time}\nType: ${selectedIncident.type}`;
    const emailSubject = `Incident Report: ${selectedIncident.name}`;
    const emailAddress = `${recipient}@gmail.com`; // Replace with the desired recipient email address

    const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailContent)}`;
    window.open(mailtoUrl);

    closeModal();
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
              <option value="type">Type</option>
            </select>
          </div>
        </div>
        <div className="p-6 flex justify-evenly gap-2 flex-wrap items-center mt-500">
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
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() =>
                      window.open(
                        generateGoogleMapsLink(incident.location),
                        "_blank"
                      )
                    }
                    className="bg-blue-500 text-white p-2 rounded shadow-md hover:bg-blue-600"
                  >
                    Check Location
                  </button>
                  <button
                    onClick={() => openEmailModal(incident)}
                    className="bg-green-500 text-white p-2 rounded shadow-md hover:bg-green-600"
                  >
                    Send Email
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No incidents found.</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-[400px]">
            <h2 className="text-xl font-semibold mb-4">Select Recipient</h2>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => sendEmail("police")}
                className="bg-blue-500 text-white p-2 rounded shadow-md hover:bg-blue-600"
              >
                Police
              </button>
              <button
                onClick={() => sendEmail("ambulance")}
                className="bg-red-500 text-white p-2 rounded shadow-md hover:bg-red-600"
              >
                Ambulance
              </button>
              <button
                onClick={() => sendEmail("firefighters")}
                className="bg-orange-500 text-white p-2 rounded shadow-md hover:bg-orange-600"
              >
                Firefighters
              </button>
              <button
                onClick={() => sendEmail("rescue_team")}
                className="bg-green-500 text-white p-2 rounded shadow-md hover:bg-green-600"
              >
                Rescue Team
              </button>
            </div>
            <button
              onClick={closeModal}
              className="mt-4 text-gray-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllIncidents;
