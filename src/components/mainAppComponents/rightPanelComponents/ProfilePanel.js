import React from "react";
import "../../../styles/ProfilePanel.css";

function ProfilePanel(props) {
  return (
    <div className="ProfilePanel_MainContainer">
      <div className="ProfileAccInfo_container">
        <div className="AccInfo_top">
          <div className="AccInfo_topTitle">Account</div>
          <div className="AccInfo_topContent">Update personal information</div>
        </div>
        <div className="AccInfo_content">
          <div className="AccInfo_contentRow">
            <div className="Row_container">
              <div className="Row_left">
                <div className="Input_title">First Name</div>
                <input
                  className="AccInfo_input"
                  type="text"
                  placeholder="Type your first name"
                />
              </div>
              <div className="Row_right">
                <div className="Input_title">Last Name</div>
                <input
                  className="AccInfo_input"
                  type="text"
                  placeholder="Type your last name"
                />
              </div>
            </div>
          </div>
          <div className="AccInfo_contentRow">
            <div className="Row_container">
              <div className="Row_left">
                <div className="Input_title">Mobile Number</div>
                <input
                  className="AccInfo_input"
                  type="text"
                  placeholder="Type your mobile number"
                />
              </div>
              <div className="Row_right">
                <div className="Input_title">Birth date</div>
                <input className="AccInfo_input" type="date" />
              </div>
            </div>
          </div>
          <div className="AccInfo_contentRow">
            <div className="Row_container">
              <div className="Row_left">
                <div className="Input_title">Email address</div>
                <input
                  className="AccInfo_input"
                  type="text"
                  placeholder="Type your email address"
                />
              </div>
              <div className="Row_right">
                <div className="Input_title">Website</div>
                <input
                  className="AccInfo_input"
                  type="text"
                  placeholder="Type your website"
                />
              </div>
            </div>
          </div>
          <div className="AccInfo_contentRow">
            <div className="Row_container">
              <div className="Row_right">
                <div className="Input_title">Address</div>
                <input
                  className="AccInfo_inputAddress"
                  type="text"
                  placeholder="Type your address"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="AccInfo_bottom">
          <button className="AccInfo_saveButton">Save Changes</button>
        </div>
      </div>
      <div className="ProfileSocialsInfo_container">
        <div className="AccInfo_top">
          <div className="AccInfo_topTitle">Social Media</div>
          <div className="AccInfo_topContent">
            Update your social media information
          </div>
        </div>
        <div className="AccInfo_content">
          <div className="AccInfo_contentRow">
            <div className="Row_container">
              <div className="Row_left">
                <div className="Input_title">Facebook</div>
                <input
                  className="AccInfo_input"
                  type="text"
                  placeholder="Type your Username"
                />
              </div>
              <div className="Row_right">
                <div className="Input_title">Twitter</div>
                <input
                  className="AccInfo_input"
                  type="text"
                  placeholder="Type your Username"
                />
              </div>
            </div>
          </div>
          <div className="AccInfo_contentRow">
            <div className="Row_container">
              <div className="Row_left">
                <div className="Input_title">Instagram</div>
                <input
                  className="AccInfo_input"
                  type="text"
                  placeholder="Type your Username"
                />
              </div>
              <div className="Row_right">
                <div className="Input_title">LinkedIn</div>
                <input
                  className="AccInfo_input"
                  type="text"
                  placeholder="Type your Username"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="AccInfo_bottom">
          <button className="AccInfo_saveButton">Save Changes</button>
        </div>
      </div>
      <div className="ProfileSocialsInfo_container">
        <div className="AccInfo_top">
          <div className="AccInfo_topTitle">Password</div>
          <div className="AccInfo_topContent">Update your password</div>
        </div>
        <div className="AccInfo_content">
          <div className="AccInfo_contentRow">
            <div className="Row_container">
              <div className="Row_left">
                <div className="Input_title">Current Password</div>
                <input
                  className="AccInfo_input"
                  type="text"
                  placeholder="Type your current password"
                />
              </div>
              <div className="Row_rightPassword">
                <div className="Input_title">Twitter</div>
                <input
                  className="AccInfo_input"
                  type="text"
                  placeholder="Type your Username"
                />
              </div>
            </div>
          </div>
          <div className="AccInfo_contentRow">
            <div className="Row_container">
              <div className="Row_left">
                <div className="Input_title">New Password</div>
                <input
                  className="AccInfo_input"
                  type="text"
                  placeholder="Type your new password"
                />
              </div>
              <div className="Row_right">
                <div className="Input_title">Repeat Password</div>
                <input
                  className="AccInfo_input"
                  type="text"
                  placeholder="Repeat your new password"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="AccInfo_bottom">
          <button className="AccInfo_saveButton">Save Changes</button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePanel;
