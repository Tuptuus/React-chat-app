import React, { useState, useEffect } from "react";
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

const changeProfilePic = <FontAwesomeIcon icon={faCamera} />;
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
  const [name, setName] = useState(null);
  const [profilePhotoInfo, setProfilePhotoInfo] = useState(null);
  const [birthdateInfo, setBirthdateInfo] = useState(null);
  const [phoneNumberInfo, setPhoneNumberInfo] = useState(null);
  const [emailInfo, setEmailInfo] = useState(null);
  const [addressInfo, setAddressInfo] = useState(null);
  const [websiteInfo, setWebsiteInfo] = useState(null);
  const [facebookNickInfo, setFacebookNickInfo] = useState(null);
  const [twitterNickInfo, setTwitterNickInfo] = useState(null);
  const [instagramNickInfo, setInstagramNickInfo] = useState(null);
  const [LinkedinNickInfo, setLinkedinNickInfo] = useState(null);
  useEffect(() => {
    if (props.currentLoggedUserDatabase) {
      const firstName =
        props.currentLoggedUserDatabase.name[0].toUpperCase() +
        props.currentLoggedUserDatabase.name.slice(
          1,
          props.currentLoggedUserDatabase.name.indexOf(" ")
        );
      const lastName =
        props.currentLoggedUserDatabase.name[
          props.currentLoggedUserDatabase.name.indexOf(" ") + 1
        ].toUpperCase() +
        props.currentLoggedUserDatabase.name.slice(
          props.currentLoggedUserDatabase.name.indexOf(" ") + 2
        );
      setName(firstName + " " + lastName);
      setProfilePhotoInfo(props.currentLoggedUserDatabase.profilePhoto);
      setBirthdateInfo(props.currentLoggedUserDatabase.birthdate);
      setPhoneNumberInfo(props.currentLoggedUserDatabase.phoneNumber);
      setEmailInfo(props.currentLoggedUserDatabase.email);
      setAddressInfo(props.currentLoggedUserDatabase.address);
      setWebsiteInfo(props.currentLoggedUserDatabase.website);
      setFacebookNickInfo(props.currentLoggedUserDatabase.facebookNick);
      setTwitterNickInfo(props.currentLoggedUserDatabase.twitterNick);
      setInstagramNickInfo(props.currentLoggedUserDatabase.instagramNick);
      setLinkedinNickInfo(props.currentLoggedUserDatabase.linkedinNick);
    }
  }, [props.currentLoggedUserDatabase]);

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
              src={profilePhotoInfo ? profilePhotoInfo : null}
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
          <div className="Profile_profilePanelName">{name ? name : null}</div>
        </div>
        <div className="ProfileInformation_container">
          <div className="ProfileInformation_panel">
            <div className="ProfileInformation_left">
              <div className="ProfileInformation_title">Birthdate</div>
              <div className="ProfileInformation_content">
                {birthdateInfo ? birthdateInfo : "---------------"}
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
                {phoneNumberInfo ? phoneNumberInfo : "---------------"}
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
                {emailInfo ? emailInfo : "---------------"}
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
                {addressInfo ? addressInfo : "---------------"}
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
                {websiteInfo ? websiteInfo : "---------------"}
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
                {facebookNickInfo ? (
                  <a
                    href={`https://facebook.com/${facebookNickInfo}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {facebookNickInfo}
                  </a>
                ) : (
                  "---------------"
                )}
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
                {twitterNickInfo ? (
                  <a
                    href={`https://twitter.com/${twitterNickInfo}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {twitterNickInfo}
                  </a>
                ) : (
                  "---------------"
                )}
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
                {instagramNickInfo ? (
                  <a
                    href={`https://www.instagram.com/${instagramNickInfo}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {instagramNickInfo}
                  </a>
                ) : (
                  "---------------"
                )}
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
                {LinkedinNickInfo ? (
                  <a
                    href={`https://facebook.com/${LinkedinNickInfo}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {LinkedinNickInfo}
                  </a>
                ) : (
                  "---------------"
                )}
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
