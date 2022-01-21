import React from "react";
import "../../../styles/Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

function Profile(props) {
  const changeProfilePic = <FontAwesomeIcon icon={faCamera} />;
  return (
    <div className="Profile_container">
      <div className="Profile_Top">
        <div className="Profile_Top_title">Profile</div>
        <div className="Profile_Bottom_title">
          Personal Information & Settings
        </div>
      </div>
      <div className="Profile_contentContainer">
        <div className="Profile_profilePanel">
          <div
            onClick={props.handleUploadProfilePicture}
            className="Profile_profilePanelPic"
          >
            <img
              src={props.currentLoggedUser.photoURL}
              alt=""
              className="Profile_profileImg"
            />
            <div className="Profile_backgroundPic">
              <div className="Profile_profilePanelPicChange">
                {changeProfilePic}
              </div>
            </div>
          </div>
          <div className="Profile_profilePanelName">
            {props.currentLoggedUser.displayName}
          </div>
          <input
            type="file"
            className="Profile_profilePanelInput"
            id="file"
            ref={props.inputFileDialogRef}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
