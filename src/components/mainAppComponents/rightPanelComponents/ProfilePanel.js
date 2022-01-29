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
                  onChange={(e) =>
                    props.handleProfileUpdateInformationsInputs("firstName", e)
                  }
                  className="AccInfo_input"
                  type="text"
                  placeholder="Type your first name"
                />
              </div>
              <div className="Row_right">
                <div className="Input_title">Last Name</div>
                <input
                  onChange={(e) =>
                    props.handleProfileUpdateInformationsInputs("lastName", e)
                  }
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
                  onChange={(e) =>
                    props.handleProfileUpdateInformationsInputs(
                      "mobileNumber",
                      e
                    )
                  }
                  className="AccInfo_input"
                  type="number"
                  placeholder="Type your mobile number"
                />
              </div>
              <div className="Row_right">
                <div className="Input_title">Birth date</div>
                <input
                  className="AccInfo_input"
                  type="date"
                  onChange={(e) =>
                    props.handleProfileUpdateInformationsInputs("birthdate", e)
                  }
                />
              </div>
            </div>
          </div>
          <div className="AccInfo_contentRow">
            <div className="Row_container">
              <div className="Row_left">
                <div className="Input_title">Email address</div>
                <input
                  onChange={(e) =>
                    props.handleProfileUpdateInformationsInputs("email", e)
                  }
                  className="AccInfo_input"
                  type="text"
                  placeholder="Type your email address"
                />
              </div>
              <div className="Row_right">
                <div className="Input_title">Website</div>
                <input
                  onChange={(e) =>
                    props.handleProfileUpdateInformationsInputs("website", e)
                  }
                  className="AccInfo_input"
                  type="text"
                  placeholder="Type your website"
                />
              </div>
            </div>
          </div>
          <div className="AccInfo_contentRow">
            <div className="Row_container">
              <div className="Row_rightAddress">
                <div className="Input_title">Address</div>
                <input
                  onChange={(e) =>
                    props.handleProfileUpdateInformationsInputs("address", e)
                  }
                  className="AccInfo_inputAddress"
                  type="text"
                  placeholder="Type your address"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="AccInfo_bottom">
          <button
            onClick={props.updateProfileInformations}
            className="AccInfo_saveButton"
          >
            Save Changes
          </button>
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
                  onChange={(e) =>
                    props.handleProfileUpdateInformationsInputs(
                      "facebookUsername",
                      e
                    )
                  }
                  className="AccInfo_input"
                  type="text"
                  placeholder="Type your Username"
                />
              </div>
              <div className="Row_right">
                <div className="Input_title">Twitter</div>
                <input
                  onChange={(e) =>
                    props.handleProfileUpdateInformationsInputs(
                      "twitterUsername",
                      e
                    )
                  }
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
                  onChange={(e) =>
                    props.handleProfileUpdateInformationsInputs(
                      "instaUsername",
                      e
                    )
                  }
                  className="AccInfo_input"
                  type="text"
                  placeholder="Type your Username"
                />
              </div>
              <div className="Row_right">
                <div className="Input_title">LinkedIn</div>
                <input
                  onChange={(e) =>
                    props.handleProfileUpdateInformationsInputs(
                      "linkedinUsername",
                      e
                    )
                  }
                  className="AccInfo_input"
                  type="text"
                  placeholder="Type your Username"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="AccInfo_bottom">
          <button
            onClick={props.updateSocialsInformations}
            className="AccInfo_saveButton"
          >
            Save Changes
          </button>
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
              <div className="Row_leftPassword">
                <div className="Input_title">Current Password</div>
                <input
                  onChange={(e) =>
                    props.handleProfileUpdateInformationsInputs(
                      "currentPass",
                      e
                    )
                  }
                  className="AccInfo_input"
                  type="password"
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
                  onChange={(e) =>
                    props.handleProfileUpdateInformationsInputs(
                      "newPassword",
                      e
                    )
                  }
                  className="AccInfo_input"
                  type="password"
                  placeholder="Type your new password"
                />
              </div>
              <div className="Row_right">
                <div className="Input_title">Repeat Password</div>
                <input
                  onChange={(e) =>
                    props.handleProfileUpdateInformationsInputs(
                      "repeatNewPassword",
                      e
                    )
                  }
                  className="AccInfo_input"
                  type="password"
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
