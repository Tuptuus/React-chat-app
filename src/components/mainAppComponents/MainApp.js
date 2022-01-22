import React from "react";
import MenuPanel from "./MenuPanel";
import "../../styles/MainApp.css";
import LeftPanel from "./LeftPanel";
import UpdateProfilePhoto from "./LeftPanelComponents/UpdateProfilePhoto";
import LogoutConfirm from "../SignInComponents/LogoutConfirm";

function MainApp(props) {
  return (
    <div className="MainAppContainer">
      <MenuPanel
        currentLoggedUser={props.currentLoggedUser}
        handleLogoutUser={props.handleLogoutUser}
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
          newPreviewProfilePic={props.newPreviewProfilePic}
          handleSetNewProfilePic={props.handleSetNewProfilePic}
          isConfirmRejectOpen={props.isConfirmRejectOpen}
          handleConfirmReject={props.handleConfirmReject}
          uploadPrevPicAnimation={props.uploadPrevPicAnimation}
          uploadNewProfPicAnimation={props.uploadNewProfPicAnimation}
        />
      ) : null}
      {props.confirmLogoutPanel === true ? (
        <LogoutConfirm
          LogoutUser={props.LogoutUser}
          handleLogoutUser={props.handleLogoutUser}
        />
      ) : null}
    </div>
  );
}

export default MainApp;
