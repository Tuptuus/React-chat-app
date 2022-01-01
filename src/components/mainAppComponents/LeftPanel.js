import React from "react";
import "../../styles/LeftPanel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";
const SignOut = <FontAwesomeIcon icon={faSignOutAlt} />;
const User = <FontAwesomeIcon icon={faUser} />;
const UserFriends = <FontAwesomeIcon icon={faUserFriends} />;
const UserChats = <FontAwesomeIcon icon={faCommentAlt} />;

function LeftPanel(props) {
  return (
    <div className="LeftPanelContainer">
      <div className="LeftPanel_Icons">
        <span
          onClick={(type) => props.handleCurrPage("Chats")}
          title="Chats"
          className={`LeftPanel_UserChatsIcon ${
            props.activePage === "Chats" ? "currActive" : ""
          }`}
        >
          {UserChats}
        </span>
        <span
          onClick={(type) => props.handleCurrPage("Friends")}
          title="Friends"
          className={`LeftPanel_UserFriendsIcon ${
            props.activePage === "Friends" ? "currActive" : ""
          }`}
        >
          {UserFriends}
        </span>
        <span
          onClick={(type) => props.handleCurrPage("Profile")}
          title="Profile"
          className={`LeftPanel_UserIcon ${
            props.activePage === "Profile" ? "currActive" : ""
          }`}
        >
          {User}
        </span>
        <div className="LeftPanel_BottomButton">
          <span
            title="SignOut"
            onClick={props.LogoutUser}
            className="LeftPanel_SignOutIcon"
          >
            {SignOut}
          </span>
        </div>
      </div>
    </div>
  );
}

export default LeftPanel;
