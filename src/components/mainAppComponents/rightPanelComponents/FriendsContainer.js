import React from "react";
import SearchedUserProfileCard from "./SearchedUserProfileCard";

function FriendsContainer(props) {
  let show = "";
  if (props.currentClickedUser === "" && props.mode === "AddFriends") {
    show = "show";
  }
  return (
    <>
      {props.currentClickedUser ? (
        <SearchedUserProfileCard
          currentClickedUser={props.currentClickedUser}
          currentLoggedUser={props.currentLoggedUser}
          addToFriendsSystem={props.addToFriendsSystem}
          friendActionMode={props.friendActionMode}
          deleteFriend={props.deleteFriend}
          goToChat={props.goToChat}
        />
      ) : null}
      {show !== "show" ? null : (
        <div className="searchUserTitle">Search And Pick User You Want</div>
      )}
    </>
  );
}

export default FriendsContainer;
