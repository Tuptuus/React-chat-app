import React from "react";
import MenuPanel from "./MenuPanel";
import "../../styles/MainApp.css";
import LeftPanel from "./LeftPanel";
import UpdateProfilePhoto from "./LeftPanelComponents/UpdateProfilePhoto";

function MainApp(props) {
  return (
    <div className="MainAppContainer">
      <MenuPanel
        currentLoggedUser={props.currentLoggedUser}
        LogoutUser={props.LogoutUser}
      />
      <LeftPanel
        currentLoggedUser={props.currentLoggedUser}
        handleOpenUploadWindow={props.handleOpenUploadWindow}
      />

      {props.isUploadOpen === true ? (
        <UpdateProfilePhoto
          handleOpenUploadFilesPanel={props.handleOpenUploadFilesPanel}
          inputFileDialogRef={props.inputFileDialogRef}
          currentLoggedUser={props.currentLoggedUser}
          handleCloseUploadWindow={props.handleCloseUploadWindow}
          handleSetPreviewProfilePic={props.handleSetPreviewProfilePic}
          newProfilePic={props.newProfilePic}
          handleSetNewProfilePic={props.handleSetNewProfilePic}
        />
      ) : null}
    </div>
  );
}

export default MainApp;
