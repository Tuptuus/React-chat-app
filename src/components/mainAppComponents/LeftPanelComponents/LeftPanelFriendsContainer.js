import React from "react";
import AddFriends from "./AddFriends";
import Friends from "./Friends";

function LeftPanelFriendsContainer(props) {
  return (
    <>
      {props.mode === "Friends" ? (
        <Friends
          handleCurrentMode={props.handleCurrentModeFriends}
          friendsDocs={props.friendsDocs}
          handleCurrentActiveUser={props.handleCurrentActiveUser}
        />
      ) : (
        <AddFriends
          handleCurrentMode={props.handleCurrentModeFriends}
          showClickedUser={props.showClickedUser}
          foundUsers={props.foundUsers}
          currentClickedUser={props.currentClickedUser}
          handleSearchUserInFriends={props.handleSearchUserInFriends}
          handleCurrentActiveUser={props.handleCurrentActiveUser}
        />
      )}
    </>
  );
}

export default LeftPanelFriendsContainer;
