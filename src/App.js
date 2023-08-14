import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Admin from "./components/admin/Admin";
import Doctor from "./components/doctor/Doctor";
import Receptionist from "./components/receptionist/Receptionist";
import Nurse from "./components/nurse/Nurse";
import React from "react";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import Lab from "./components/labtechnician/Lab";
import LoginUser from "./pages/LoginUser";
import Signup from "./pages/Signup";
import Report from "./components/receptionist/Report";
import PatientForm from "./pages/PatientForm";
import Patient from "./components/patients/Patients";
import UserHome from "./components/patients/Home";
import UserProfile from "./components/patients/Profile";
import Sidebar from "./components/zzzzz/Sidebar";
import Report1 from "./components/receptionist/Report";
import Team from "./components/zzzzz/Team";
import Overview from "./components/zzzzz/Overview";
import Product from "./components/zzzzz/Product";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/nurse" element={<Nurse />} />
          <Route path="/receptionist" element={<Receptionist />} />
          <Route path="/changepassword" element={<ResetPassword />} />
          <Route path="/labtech" element={<Lab />} />
          <Route path="loginuser" element={<LoginUser />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/report" element={<Report />} />
          <Route path="/patientform" element={<PatientForm />} />
          <Route path="/patient" element={<Patient />} />
          <Route path="/home" element={<UserHome />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/side" element={<Sidebar />} />
          <Route path="/view" element={<Overview />} />
          <Route path="/report1" element={<Report1 />} />
          <Route path="/product" element={<Product />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
