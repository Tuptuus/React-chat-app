import React from "react";
import "../../styles/MenuPanel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faUser,
  faUserFriends,
  faCommentAlt,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import RequestPanel from "./RequestPanel";
const SignOut = <FontAwesomeIcon icon={faSignOutAlt} />;
const User = <FontAwesomeIcon icon={faUser} />;
const UserFriends = <FontAwesomeIcon icon={faUserFriends} />;
const UserChats = <FontAwesomeIcon icon={faCommentAlt} />;
const Bell = <FontAwesomeIcon icon={faBell} />;

function MenuPanel(props) {
  const location = useLocation();
  return (
    <div className="MenuPanelContainer">
      <div className="MenuPanel_userProfilePhoto">
        <img
          src={props.currentLoggedUser.photoURL}
          alt=""
          className="profilePhoto_pic"
        />
      </div>
      {props.notificationFriendRequest ? (
        <div
          onClick={props.handleFriendsRequestPanel}
          className="Notification_dot"
        >
          {Bell}
        </div>
      ) : null}
      {props.friendsRequestPanel ? (
        <RequestPanel
          rejectFriendsRequest={props.rejectFriendsRequest}
          usersRequests={props.usersRequests}
        />
      ) : null}

      <div className="MenuPanel_Icons">
        <span
          onClick={() => props.navigateToOtherComponents("Chats")}
          title="Chats"
          className={`MenuPanel_UserChatsIcon ${
            location.pathname === "/ChatApp/Chats" ? "currActive" : ""
          }`}
        >
          {UserChats}
        </span>
        <span
          onClick={() => props.navigateToOtherComponents("Friends")}
          title="Friends"
          className={`MenuPanel_UserFriendsIcon ${
            location.pathname === "/ChatApp/Friends" ? "currActive" : ""
          }`}
        >
          {UserFriends}
        </span>
        <span
          onClick={() => props.navigateToOtherComponents("Profile")}
          title="Profile"
          className={`MenuPanel_UserIcon ${
            location.pathname === "/ChatApp/Profile" ? "currActive" : ""
          }`}
        >
          {User}
        </span>
        <div className="MenuPanel_BottomButton">
          <span
            title="SignOut"
            onClick={() => props.handleLogoutUser("openPanel")}
            className="MenuPanel_SignOutIcon"
          >
            {SignOut}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MenuPanel;
