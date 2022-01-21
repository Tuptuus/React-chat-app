import React from "react";
import MenuPanel from "./MenuPanel";
import "../../styles/MainApp.css";
import LeftPanel from "./LeftPanel";

function MainApp(props) {
  return (
    <div className="MainAppContainer">
      <MenuPanel
        currentLoggedUser={props.currentLoggedUser}
        LogoutUser={props.LogoutUser}
      />
      <LeftPanel
        handleUploadProfilePicture={props.handleUploadProfilePicture}
        currentLoggedUser={props.currentLoggedUser}
        inputFileDialogRef={props.inputFileDialogRef}
      />
    </div>
  );
}

export default MainApp;
