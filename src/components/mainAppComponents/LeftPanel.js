import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import "../../styles/LeftPanel.css";
import Chats from "./LeftPanelComponents/Chats";
import Friends from "./LeftPanelComponents/Friends";
import Profile from "./LeftPanelComponents/Profile";
import { auth } from "../firebase-config";

function LeftPanel(props) {
  return (
    <div className="LeftPanel_container">
      <Routes>
        <Route path="/Chats" element={<Chats />} />
        <Route path="/Friends" element={<Friends />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/ChatApp/Chats" />} />
      </Routes>
    </div>
  );
}

export default LeftPanel;
