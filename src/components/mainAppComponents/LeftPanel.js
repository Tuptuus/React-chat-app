import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import "../../styles/LeftPanel.css";
import Chats from "./LeftPanelComponents/Chats";
import FriendsContainer from "./LeftPanelComponents/FriendsContainer";
import Profile from "./LeftPanelComponents/Profile";

function LeftPanel(props) {
  return (
    <div className="LeftPanel_container">
      <Routes>
        <Route path="/Chats" element={<Chats />} />
        <Route path="/Friends" element={<FriendsContainer />} />
        <Route
          path="/Profile"
          element={
            <Profile
              handleUploadProfilePicture={props.handleUploadProfilePicture}
              currentLoggedUser={props.currentLoggedUser}
              inputFileDialogRef={props.inputFileDialogRef}
            />
          }
        />
        <Route path="*" element={<Navigate to="/ChatApp/Chats" />} />
      </Routes>
    </div>
  );
}

export default LeftPanel;
