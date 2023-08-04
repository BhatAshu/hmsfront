import { BrowserRouter, Route, Routes   } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Admin from "./components/admin/Admin"
import Doctor from "./components/doctor/Doctor"
import Receptionist from "./components/receptionist/Receptionist";
import Nurse from "./components/nurse/Nurse";
import React from "react";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/nurse" element={<Nurse />} />
        <Route path="/receptionist" element={<Receptionist />} />
        <Route path="/changepassword" element={<ResetPassword />}/>
      </Routes>
    </BrowserRouter>
    <ToastContainer />
    </div>
    
  );
}

export default App;

