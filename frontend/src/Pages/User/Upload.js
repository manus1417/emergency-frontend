import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";

const Upload = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [userData, setUserData] = useState(null);

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
  useEffect(() => {
    fetchUserData();
  }, []);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pmcr8gua"); // Replace with your Cloudinary upload preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dgplustqn/image/upload", // Replace with your Cloudinary URL
        formData
      );
      setImage(response.data.secure_url);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  const handleDelete = async (incidentId) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/incident/delete", // Update with the correct endpoint
        {
          incidentID: incidentId,
        }
      );

      if (response.status === 200) {
        alert("Incident deleted successfully!");
        // Refresh the data after deletion
        setUserData((prevData) => ({
          ...prevData,
          incidents: prevData.incidents.filter(
            (incident) => incident._id !== incidentId
          ),
        }));
      }
    } catch (error) {
      console.error("Error deleting incident:", error);
      alert("Failed to delete incident. Please try again.");
    }
  };

  const handleUpdate = (incidentId) => {
    // Placeholder for update logic
    console.log("Update incident with ID:", incidentId);
  };

  const handleSubmit = async () => {
    if (!image) {
      alert("Please upload an image first.");
      return;
    }

    const userID = localStorage.getItem("user_id");

    try {
      const response = await axios.post(
        "http://localhost:8000/incident/create",
        {
          userID,
          name,
          location,
          date,
          time,
          type,
          image,
        }
      );

      if (response.status === 200) {
        alert("Incident saved successfully!");
        setShowModal(false);
        // Clear form data after submission
        setName("");
        setLocation("");
        setDate("");
        setTime("");
        setType("");
        setImage("");
        setImageFile(null);
        // Fetch user data again to refresh the list of incidents
        fetchUserData();
      }
    } catch (error) {
      console.error("Error saving incident:", error);
      alert("Failed to save incident. Please try again.");
    }
  };

  return (
    <div className="flex">
      <Header />
      <div className="h-screen bg-blue-100 w-full overflow-auto">
        <div className="p-4 flex flex-col">
          <div className="button place-self-center">
            <button
              onClick={handleModal}
              className="p-4 w-[200px] bg-purple-300 rounded-lg flex justify-center items-center gap-1 text-xl font-bold hover:scale-105 hover:opacity-80 cursor-pointer hover:text-white"
            >
              <FaCloudUploadAlt />
              Upload
            </button>
          </div>

          <div className="overflow-auto p-4 flex justify-evenly mt-[50px]">
            <div className="mt-5 rounded-lg flex justify-evenly flex-wrap gap-5">
              {userData && userData.incidents && userData.incidents.length > 0
                ? userData.incidents.map((incident, index) => (
                    <div
                      key={index}
                      className="p-3 mb-2 gap-4 bg-white w-[400px] h-[600px] overflow-auto rounded-xl font-semibold text-[18px] flex flex-col justify-evenly items-start "
                    >
                      {incident.image && (
                        <img
                          src={incident.image}
                          alt={`Incident ${index + 1}`}
                          className="w-full h-[200px] mt-2 rounded"
                        />
                      )}

                      <p className="font-semibold">Name: {incident.name}</p>
                      <p>Location: {incident.location}</p>
                      <p>Date: {incident.date}</p>
                      <p>Time: {incident.time}</p>
                      <p>Type: {incident.type}</p>
                      <div className="flex gap-4 mt-2">
                        <button
                          onClick={() => handleDelete(incident._id)}
                          className="bg-red-500 text-white p-2 rounded hover:bg-red-700 w-full"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 ">
          <div className="w-full h-full backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-[500px] flex flex-col max-h-[700px] overflow-auto mt-5">
              <h1
                className="place-self-end text-3xl font-bold cursor-pointer hover:opacity-60"
                onClick={handleModal}
              >
                X
              </h1>
              <h2 className="text-2xl font-bold mb-4  place-self-center">
                Upload Incident
              </h2>
              <div className="inputs  mt-10  flex flex-col justify-center  items-center gap-5">
                <input
                  className="p-2 rounded-md w-[400px] border-[#478fc2] border-2 outline-none  place-self-center text-lg"
                  placeholder="Incident Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  className="p-2 rounded-md w-[400px] border-[#478fc2] border-2 outline-none  place-self-center text-lg"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />

                <input
                  className="p-2 rounded-md w-[400px] border-[#478fc2] border-2 outline-none  place-self-center text-lg"
                  placeholder="Date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />

                <input
                  className="p-2 rounded-md w-[400px] border-[#478fc2] border-2 outline-none  place-self-center text-lg"
                  placeholder="Time at which incident happened"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />

                <select
                  className="p-2 rounded-md w-[400px] border-[#478fc2] border-2 outline-none  place-self-center text-lg cursor-pointer"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option hidden>Type of incident</option>
                  <option value="General Violation">General Violation</option>
                  <option value="Assault">Assault</option>
                  <option value="Harassment">Harassment</option>
                  <option value="Accident">Accident</option>
                  <option value="Natural Disaster">Natural Disaster</option>
                </select>

                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="p-2 rounded-md w-[400px] border-[#478fc2] border-2 outline-none  place-self-center text-lg cursor-pointer"
                />
                <button
                  onClick={handleSubmit}
                  className="p-2 w-[200px] bg-purple-300 rounded-lg flex justify-center items-center gap-1 text-xl font-bold hover:scale-105 hover:opacity-80 cursor-pointer hover:text-white"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
