import React from "react";
import AddFriends from "./AddFriends";
import Friends from "./Friends";

function LeftPanelFriendsContainer(props) {
  return (
    <>
      {props.mode === "Friends" ? (
        <Friends handleCurrentMode={props.handleCurrentModeFriends} />
      ) : (
        <AddFriends
          handleCurrentMode={props.handleCurrentModeFriends}
          showClickedUser={props.showClickedUser}
          foundUsers={props.foundUsers}
          currUser={props.currUser}
          handleSearchUserInFriends={props.handleSearchUserInFriends}
          handleCurrentActiveFriend={props.handleCurrentActiveFriend}
        />
      )}
    </>
  );
}

export default LeftPanelFriendsContainer;
