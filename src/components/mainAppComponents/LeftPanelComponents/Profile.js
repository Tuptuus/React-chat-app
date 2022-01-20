import React from "react";
import "../../../styles/Profile.css";

function Profile() {
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
          <div className="Profile_profilePanelPic">
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
