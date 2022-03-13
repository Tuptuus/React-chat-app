import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import "../../styles/LeftPanel.css";
import Chats from "./LeftPanelComponents/Chats";
import LeftPanelFriendsContainer from "./LeftPanelComponents/LeftPanelFriendsContainer";
import Profile from "./LeftPanelComponents/Profile";

function LeftPanel(props) {
  return (
    <div className="LeftPanel_container">
      <Routes>
        <Route
          path="/Chats"
          element={
            <Chats
              chatsToDisplay={props.chatsToDisplay}
              selectClickedChat={props.selectClickedChat}
              currentClickedUser={props.currentClickedUser}
              currentChat={props.currentChat}
              lastMsgs={props.lastMsgs}
            />
          }
        />
        <Route
          path="/Friends"
          element={
            <LeftPanelFriendsContainer
              foundUsers={props.foundUsers}
              showClickedUser={props.showClickedUser}
              currentClickedUser={props.currentClickedUser}
              handleSearchUserInFriends={props.handleSearchUserInFriends}
              handleCurrentActiveUser={props.handleCurrentActiveUser}
              handleCurrentModeFriends={props.handleCurrentModeFriends}
              mode={props.mode}
              friendsDocs={props.friendsDocs}
            />
          }
        />
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
        <Route path="*" element={<Navigate to="/ChatApp/Chats" />} />
      </Routes>
    </div>
  );
}

export default LeftPanel;
