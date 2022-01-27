import React from "react";
import { useLocation } from "react-router-dom";
import "../../../styles/RightPanelsContainer.css";
import FriendsContainer from "./FriendsContainer";
import ProfilePanel from "./ProfilePanel";

function RightPanelsContainer(props) {
  const location = useLocation();
  return (
    <div className="rightContainer">
      {location.pathname === "/ChatApp/Friends" ? (
        <FriendsContainer
          currentClickedUser={props.currentClickedUser}
          currentLoggedUser={props.currentLoggedUser}
          mode={props.mode}
        />
      ) : null}
      {location.pathname === "/ChatApp/Profile" ? <ProfilePanel /> : null}
    </div>
  );
}

export default RightPanelsContainer;
