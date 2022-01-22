import React from "react";
import "../../styles/LogoutConfirm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function LogoutConfirm(props) {
  const close = <FontAwesomeIcon icon={faTimes} />;

  return (
    <div className="backgroundConfirmLogout">
      <div className="confirmLogout">
        <div className="logout_confirmTop">
          <span className="logoutTop_cancelTitle">Logout?</span>
          <span
            onClick={() => props.handleLogoutUser("closePanel")}
            className="logoutTop_cancelIcon"
          >
            {close}
          </span>
        </div>
        <div className="logout_confirmBottom">
          <div className="logoutBottom_cancelTitle">
            Are you sure you want to logout?
          </div>
          <div className="logoutBottom_buttons">
            <div className="logoutconfirmBottom_cancelButton">
              <span
                onClick={() => props.handleLogoutUser("closePanel")}
                className="logoutconfirmCancelButton"
              >
                Cancel
              </span>
            </div>
            <div className="logoutconfrimBottom_submitButton">
              <button
                onClick={props.LogoutUser}
                className="logoutconfirmSubmitButton"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoutConfirm;
