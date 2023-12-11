import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

function Doctor() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/doctor");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="ad1">
      <Sidebar />
    </div>
  );
}

export default Doctor;
