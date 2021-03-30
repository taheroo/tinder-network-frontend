import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Main from "../components/Main/Main";
import Sidebar from "../components/Sidebar/Sidebar";
import auth from "../services/authService";
const Dashboard = () => {
  const [user, setUser] = useState("");
  // React Patterns Reactor Container Components
  // React Patterns
  useEffect(() => {
    setUser(auth.getCurrentUser());
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Sidebar user={user}></Sidebar>
        <Main user={user}></Main>
      </BrowserRouter>
    </div>
  );
};

export default Dashboard;
