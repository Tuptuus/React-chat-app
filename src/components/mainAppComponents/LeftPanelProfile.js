import { Routes, Route } from "react-router-dom";
import React from "react";
import "../../styles/LeftPanel.css";
import Profile from "./LeftPanelComponents/Profile";

function LeftPanel(props) {
  return (
    <div className="LeftPanelProfile_container">
      <Routes>
        <Route
          path="/Profile"
          element={
            <Profile
              handleUploadProfilePicture={props.handleUploadProfilePicture}
              currentLoggedUser={props.currentLoggedUser}
              inputFileDialogRef={props.inputFileDialogRef}
              handleOpenUploadWindow={props.handleOpenUploadWindow}
              currentLoggedUserDatabase={props.currentLoggedUserDatabase}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default LeftPanel;
