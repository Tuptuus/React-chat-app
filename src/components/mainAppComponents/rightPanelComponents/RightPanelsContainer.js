import React from "react";
import { useLocation } from "react-router-dom";
import "../../../styles/RightPanelsContainer.css";
import FriendsContainer from "./FriendsContainer";

function RightPanelsContainer(props) {
  const location = useLocation();
  return (
    <div className="rightContainer">
      {location.pathname === "/ChatApp/Friends" ? (
        <FriendsContainer
          clickedUser={props.clickedUser}
          currentLoggedUser={props.currentLoggedUser}
          mode={props.mode}
        />
      ) : null}
    </div>
  );
}

export default RightPanelsContainer;
