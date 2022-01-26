import React from "react";
import MenuPanel from "./MenuPanel";
import "../../styles/MainApp.css";
import LeftPanel from "./LeftPanel";
import UpdateProfilePhoto from "./LeftPanelComponents/UpdateProfilePhoto";
import LogoutConfirm from "../SignInComponents/LogoutConfirm";
import RightPanelsContainer from "./rightPanelComponents/RightPanelsContainer";

function MainApp(props) {
  return (
    <div className="MainAppContainer">
      <MenuPanel
        currentLoggedUser={props.currentLoggedUser}
        handleLogoutUser={props.handleLogoutUser}
        navigateToOtherComponents={props.navigateToOtherComponents}
      />
      <LeftPanel
        currentLoggedUser={props.currentLoggedUser}
        handleOpenUploadWindow={props.handleOpenUploadWindow}
        showClickedUser={props.showClickedUser}
        foundUsers={props.foundUsers}
        currUser={props.currUser}
        handleSearchUserInFriends={props.handleSearchUserInFriends}
        handleCurrentActiveFriend={props.handleCurrentActiveFriend}
        handleCurrentModeFriends={props.handleCurrentModeFriends}
        mode={props.mode}
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
      <RightPanelsContainer
        clickedUser={props.clickedUser}
        currentLoggedUser={props.currentLoggedUser}
        mode={props.mode}
      />
    </div>
  );
}

export default MainApp;
