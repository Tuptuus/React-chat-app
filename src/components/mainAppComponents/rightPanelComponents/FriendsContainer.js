import React from "react";
import SearchedUserProfileCard from "./SearchedUserProfileCard";

function FriendsContainer(props) {
  return (
    <>
      {props.mode === "AddFriends" ? (
        <SearchedUserProfileCard
          currentClickedUser={props.currentClickedUser}
          currentLoggedUser={props.currentLoggedUser}
          addToFriendsSystem={props.addToFriendsSystem}
          friendActionMode={props.friendActionMode}
        />
      ) : null}
    </>
  );
}

export default FriendsContainer;
