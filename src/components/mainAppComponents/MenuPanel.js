import React from "react";
import "../../styles/MenuPanel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
const SignOut = <FontAwesomeIcon icon={faSignOutAlt} />;
const User = <FontAwesomeIcon icon={faUser} />;
const UserFriends = <FontAwesomeIcon icon={faUserFriends} />;
const UserChats = <FontAwesomeIcon icon={faCommentAlt} />;

function MenuPanel(props) {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="MenuPanelContainer">
      <div className="MenuPanel_Icons">
        <span
          onClick={() => {
            navigate("/ChatApp/Chats");
          }}
          title="Chats"
          className={`MenuPanel_UserChatsIcon ${
            location.pathname === "/ChatApp/Chats" ? "currActive" : ""
          }`}
        >
          {UserChats}
        </span>
        <span
          onClick={() => {
            navigate("/ChatApp/Friends");
          }}
          title="Friends"
          className={`MenuPanel_UserFriendsIcon ${
            location.pathname === "/ChatApp/Friends" ? "currActive" : ""
          }`}
        >
          {UserFriends}
        </span>
        <span
          onClick={() => {
            navigate("/ChatApp/Profile");
          }}
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
            onClick={props.LogoutUser}
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
