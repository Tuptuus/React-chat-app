import React from "react";
import MenuPanel from "./MenuPanel";
import MenuPanelProfile from "./MenuPanelProfile";
import "../../styles/MainApp.css";
import LeftPanel from "./LeftPanel";
import UpdateProfilePhoto from "./LeftPanelComponents/UpdateProfilePhoto";
import LogoutConfirm from "../SignInComponents/LogoutConfirm";
import RightPanelsContainer from "./rightPanelComponents/RightPanelsContainer";
import LeftPanelProfile from "./LeftPanelProfile";
import { useLocation } from "react-router-dom";

function MainApp(props) {
  const location = useLocation();
  return (
    <div className="MainAppContainer">
      {location.pathname === "/ChatApp/Profile" ? (
        <MenuPanelProfile
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
      ) : (
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
      )}

      {location.pathname === "/ChatApp/Profile" ? (
        <LeftPanelProfile
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
          friendsDocs={props.friendsDocs}
          chatsToDisplay={props.chatsToDisplay}
          selectClickedChat={props.selectClickedChat}
          currentChat={props.currentChat}
          lastMsgs={props.lastMsgs}
        />
      ) : (
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
          friendsDocs={props.friendsDocs}
          chatsToDisplay={props.chatsToDisplay}
          selectClickedChat={props.selectClickedChat}
          currentChat={props.currentChat}
          lastMsgs={props.lastMsgs}
        />
      )}

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
        deleteFriend={props.deleteFriend}
        displayEmojiPicker={props.displayEmojiPicker}
        showEmojiPicker={props.showEmojiPicker}
        handleChosenEmoji={props.handleChosenEmoji}
        handleInputValue={props.handleInputValue}
        chatInputValue={props.chatInputValue}
        goToChat={props.goToChat}
        enterPressMessages={props.enterPressMessages}
        messages={props.messages}
        scrollTo={props.scrollTo}
      />
    </div>
  );
}

export default MainApp;
