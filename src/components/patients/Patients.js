import React, { useEffect } from "react";
import Sidebar from "./Sidebar"
import { useNavigate } from "react-router-dom";

function Patient() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/home");
    } else {
      navigate("/loginuser");
    }
  }, []);
  return (
    <div>
    <Sidebar/>
    </div>
    )
}

export default Patient