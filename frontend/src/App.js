import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Upload from "./Pages/User/Upload";
import Header from "./Components/Header";
import Accidents from "./Pages/User/Accidents";
import Profile from "./Pages/User/Profile";
import AdminAccidents from "./Pages/admin/AdminAccidents";
import DashBoard from "./Pages/admin/DashBoard";
import ChatbotPage from "./Pages/User/ChatbotPage";
import Teams from "./Pages/Team/Teams";
import AllIncidents from "./Pages/Team/AllIncidents";
import OtpPage from "./Pages/admin/OtpPage";
import Emergency from "./Pages/User/Emergency";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/accidents" element={<Accidents />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/adminaccidents" element={<AdminAccidents />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/team" element={<Teams />} />
        <Route path="/emergency" element={<Emergency/>} />
        <Route path="/allincidents" element={<AllIncidents />} />
        <Route path="/otp" element={<OtpPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
