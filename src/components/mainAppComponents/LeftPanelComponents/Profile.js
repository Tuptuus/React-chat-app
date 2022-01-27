import React from "react";
import "../../../styles/Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faPhone,
  faEnvelope,
  faHome,
  faGlobe,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const calendar = <FontAwesomeIcon icon={faCalendarAlt} />;
const phone = <FontAwesomeIcon icon={faPhone} />;
const mail = <FontAwesomeIcon icon={faEnvelope} />;
const address = <FontAwesomeIcon icon={faHome} />;
const website = <FontAwesomeIcon icon={faGlobe} />;
const facebook = <FontAwesomeIcon icon={faFacebookF} />;
const instagram = <FontAwesomeIcon icon={faInstagram} />;
const twitter = <FontAwesomeIcon icon={faTwitter} />;
const linkedIn = <FontAwesomeIcon icon={faLinkedinIn} />;

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
          <div className="Profile_profilePanelPic">
            <img
              src={props.currentLoggedUserDatabase.profilePhoto}
              alt=""
              className="Profile_profileImg"
            />
            <div
              onClick={props.handleOpenUploadWindow}
              className="Profile_backgroundPic"
            >
              <div className="Profile_profilePanelPicChange">
                {changeProfilePic}
              </div>
            </div>
          </div>
          <div className="Profile_profilePanelName">
            {props.currentLoggedUser.displayName}
          </div>
        </div>
        <div className="ProfileInformation_container">
          <div className="ProfileInformation_panel">
            <div className="ProfileInformation_left">
              <div className="ProfileInformation_title">Birthdate</div>
              <div className="ProfileInformation_content">
                {props.currentLoggedUserDatabase.birthdate
                  ? props.currentLoggedUserDatabase.birthdate
                  : "---------------"}
              </div>
            </div>
            <div className="ProfileInformation_right">
              <div className="ProfileInformation_icon">{calendar}</div>
            </div>
          </div>
          <div className="ProfileInformation_panel">
            <div className="ProfileInformation_left">
              <div className="ProfileInformation_title">Phone Number</div>
              <div className="ProfileInformation_content">
                {props.currentLoggedUserDatabase.phoneNumber
                  ? props.currentLoggedUserDatabase.phoneNumber
                  : "---------------"}
              </div>
            </div>
            <div className="ProfileInformation_right">
              <div className="ProfileInformation_icon">{phone}</div>
            </div>
          </div>
          <div className="ProfileInformation_panel">
            <div className="ProfileInformation_left">
              <div className="ProfileInformation_title">E-mail</div>
              <div className="ProfileInformation_content">
                {props.currentLoggedUserDatabase.email
                  ? props.currentLoggedUserDatabase.email
                  : "---------------"}
              </div>
            </div>
            <div className="ProfileInformation_right">
              <div className="ProfileInformation_icon">{mail}</div>
            </div>
          </div>
          <div className="ProfileInformation_panel">
            <div className="ProfileInformation_left">
              <div className="ProfileInformation_title">Address</div>
              <div className="ProfileInformation_content">
                {props.currentLoggedUserDatabase.address
                  ? props.currentLoggedUserDatabase.address
                  : "---------------"}
              </div>
            </div>
            <div className="ProfileInformation_right">
              <div className="ProfileInformation_icon">{address}</div>
            </div>
          </div>
          <div className="ProfileInformation_panel">
            <div className="ProfileInformation_left">
              <div className="ProfileInformation_title">Website</div>
              <div className="ProfileInformation_content">
                {props.currentLoggedUserDatabase.website
                  ? props.currentLoggedUserDatabase.website
                  : "---------------"}
              </div>
            </div>
            <div className="ProfileInformation_right">
              <div className="ProfileInformation_icon">{website}</div>
            </div>
          </div>
          <div className="ProfileSocials_panel">
            <div className="ProfileSocials_left">
              <div className="ProfileSocials_title">Facebook</div>
              <div className="ProfileSocials_content">
                <a
                  href="https://facebook.com/Tuptuus"
                  target="_blank"
                  rel="noreferrer"
                >
                  Tuptuus
                </a>
              </div>
            </div>
            <div className="ProfileSocials_right">
              <div className="ProfileSocials_icon">{facebook}</div>
            </div>
          </div>
          <div className="ProfileSocials_panel">
            <div className="ProfileSocials_left">
              <div className="ProfileSocials_title">Twitter</div>
              <div className="ProfileSocials_content">
                <a
                  href="https://facebook.com/Tuptuus"
                  target="_blank"
                  rel="noreferrer"
                >
                  Tuptuus
                </a>
              </div>
            </div>
            <div className="ProfileSocials_right">
              <div className="ProfileSocials_icon">{twitter}</div>
            </div>
          </div>
          <div className="ProfileSocials_panel">
            <div className="ProfileSocials_left">
              <div className="ProfileSocials_title">Instagram</div>
              <div className="ProfileSocials_content">
                <a
                  href="https://facebook.com/Tuptuus"
                  target="_blank"
                  rel="noreferrer"
                >
                  Tuptuus
                </a>
              </div>
            </div>
            <div className="ProfileSocials_right">
              <div className="ProfileSocials_icon">{instagram}</div>
            </div>
          </div>
          <div className="ProfileSocials_panel">
            <div className="ProfileSocials_left">
              <div className="ProfileSocials_title">LinkedIn</div>
              <div className="ProfileSocials_content">
                <a
                  href="https://facebook.com/Tuptuus"
                  target="_blank"
                  rel="noreferrer"
                >
                  Tuptuus
                </a>
              </div>
            </div>
            <div className="ProfileSocials_right">
              <div className="ProfileSocials_icon">{linkedIn}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
