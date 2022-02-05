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
        notificationFriendRequest={props.notificationFriendRequest}
        handleFriendsRequestPanel={props.handleFriendsRequestPanel}
        friendsRequestPanel={props.friendsRequestPanel}
        usersRequests={props.usersRequests}
        rejectFriendsRequest={props.rejectFriendsRequest}
        acceptFriendsRequest={props.acceptFriendsRequest}
      />
      <LeftPanel
        currentLoggedUser={props.currentLoggedUser}
        handleOpenUploadWindow={props.handleOpenUploadWindow}
        showClickedUser={props.showClickedUser}
        foundUsers={props.foundUsers}
        currentClickedUser={props.currentClickedUser}
        handleSearchUserInFriends={props.handleSearchUserInFriends}
        handleCurrentActiveUser={props.handleCurrentActiveUser}
        handleCurrentModeFriends={props.handleCurrentModeFriends}
        mode={props.mode}
        currentLoggedUserDatabase={props.currentLoggedUserDatabase}
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
        currentClickedUser={props.currentClickedUser}
        currentLoggedUser={props.currentLoggedUser}
        mode={props.mode}
        handleProfileUpdateInformationsInputs={
          props.handleProfileUpdateInformationsInputs
        }
        updateProfileInformations={props.updateProfileInformations}
        updateSocialsInformations={props.updateSocialsInformations}
        currentLoggedUserDatabase={props.currentLoggedUserDatabase}
        AccInfoMobileNumber={props.AccInfoMobileNumber}
        AccInfoBirthDate={props.AccInfoBirthDate}
        AccInfoEmail={props.AccInfoEmail}
        AccInfoWebsite={props.AccInfoWebsite}
        AccInfoAddress={props.AccInfoAddress}
        FacebookUsername={props.FacebookUsername}
        TwitterUsername={props.TwitterUsername}
        InstagramUsername={props.InstagramUsername}
        LinkedInUsername={props.LinkedInUsername}
        AccInfoFirstName={props.AccInfoFirstName}
        AccInfoLastName={props.AccInfoLastName}
        updateProfileError={props.updateProfileError}
        saveUpdateAnimation={props.saveUpdateAnimation}
        updateProfilePassword={props.updateProfilePassword}
        updatePasswordAnimation={props.updatePasswordAnimation}
        updatePasswordError={props.updatePasswordError}
        currentPasswordValue={props.currentPasswordValue}
        newPasswordValue={props.newPasswordValue}
        newRepeatPasswordValue={props.newRepeatPasswordValue}
        addToFriendsSystem={props.addToFriendsSystem}
        friendActionMode={props.friendActionMode}
      />
    </div>
  );
}

export default MainApp;
