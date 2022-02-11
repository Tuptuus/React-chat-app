import React from "react";
import SearchedUserProfileCard from "./SearchedUserProfileCard";

function FriendsContainer(props) {
  return (
    <>
      {props.currentClickedUser ? (
        <SearchedUserProfileCard
          currentClickedUser={props.currentClickedUser}
          currentLoggedUser={props.currentLoggedUser}
          addToFriendsSystem={props.addToFriendsSystem}
          friendActionMode={props.friendActionMode}
          deleteFriend={props.deleteFriend}
        />
      ) : null}
      {props.mode === "AddFriends" ? (
        <div className="searchUserTitle">Search And Pick User You Want</div>
      ) : null}
    </>
  );
}

export default FriendsContainer;
