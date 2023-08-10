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
import Home from "./pages/Home";
import Lab from "./components/labtechnician/Lab";
import LoginUser from "./pages/LoginUser";
import Signup from "./pages/Signup";
import Button from "./components/labtechnician/Button";
import Report from './components/receptionist/Report'
import PatientForm from './pages/PatientForm';
import DLogin from "./pages/Design";



function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={< Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/nurse" element={<Nurse />} />
        <Route path="/receptionist" element={<Receptionist />} />
        <Route path="/changepassword" element={<ResetPassword />}/>
        <Route path="/labtech" element={<Lab/>}/>
        <Route path="loginuser" element={<LoginUser />} />
        <Route path="signup" element={<Signup />} />
        <Route path="/bb" element={<Button />}/>
        <Route path="/report" element={<Report />} />
        <Route path="/patientform" element={<PatientForm/>} />
        <Route path="/design" element={< DLogin/>}/>
      </Routes>
    </BrowserRouter>
    <ToastContainer />
    </div>
    
  );
}

export default App;

