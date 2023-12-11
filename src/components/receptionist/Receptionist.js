import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

function Receptionist() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/receptionist");
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

export default Receptionist;
