import React from "react";
import "../../../styles/SearchedUserProfileCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faComment,
  faCalendarAlt,
  faPhone,
  faEnvelope,
  faHome,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const addUser = <FontAwesomeIcon icon={faUserPlus} />;
const message = <FontAwesomeIcon icon={faComment} />;
const calendar = <FontAwesomeIcon icon={faCalendarAlt} />;
const phone = <FontAwesomeIcon icon={faPhone} />;
const mail = <FontAwesomeIcon icon={faEnvelope} />;
const address = <FontAwesomeIcon icon={faHome} />;
const website = <FontAwesomeIcon icon={faGlobe} />;
const facebook = <FontAwesomeIcon icon={faFacebookF} />;
const instagram = <FontAwesomeIcon icon={faInstagram} />;
const twitter = <FontAwesomeIcon icon={faTwitter} />;
const linkedIn = <FontAwesomeIcon icon={faLinkedinIn} />;

function ProfileCard(props) {
  let firstName = "";
  let lastName = "";
  if (props.clickedUser !== null) {
    firstName =
      props.clickedUser.name[0].toUpperCase() +
      props.clickedUser.name.slice(1, props.clickedUser.name.indexOf(" "));
    lastName =
      props.clickedUser.name[
        props.clickedUser.name.indexOf(" ") + 1
      ].toUpperCase() +
      props.clickedUser.name.slice(props.clickedUser.name.indexOf(" ") + 2);
  }
  return (
    <>
      {props.clickedUser !== null ? (
        <div className="ProfileCardContainer">
          <div className="ProfileCard_profileBlock">
            <div className="ProfileBlock_profilePicContainer">
              <img
                src={props.clickedUser.profilePhoto}
                alt=""
                className="profileBlock_pic"
              />
              <div className="profileBlock_name">{`${firstName} ${lastName}`}</div>
            </div>
            <div className="profileBlock_actions">
              <div className="addUser">{addUser}</div>
              <div className="message">{message}</div>
            </div>
          </div>
          <div className="ProfileCard_informationsContainer">
            <div className="information_panel">
              <div className="information_left">
                <div className="information_title">Birthdate</div>
                <div className="information_content">24/04/2004</div>
              </div>
              <div className="information_right">
                <div className="information_icon">{calendar}</div>
              </div>
            </div>
            <div className="information_panel">
              <div className="information_left">
                <div className="information_title">Phone Number</div>
                <div className="information_content">+48 48848488484</div>
              </div>
              <div className="information_right">
                <div className="information_icon">{phone}</div>
              </div>
            </div>
            <div className="information_panel">
              <div className="information_left">
                <div className="information_title">E-mail</div>
                <div className="information_content">
                  {props.clickedUser.email}
                </div>
              </div>
              <div className="information_right">
                <div className="information_icon">{mail}</div>
              </div>
            </div>
            <div className="information_panel">
              <div className="information_left">
                <div className="information_title">Address</div>
                <div className="information_content">Przeworsk</div>
              </div>
              <div className="information_right">
                <div className="information_icon">{address}</div>
              </div>
            </div>
            <div className="information_panel">
              <div className="information_left">
                <div className="information_title">Website</div>
                <div className="information_content">-------------</div>
              </div>
              <div className="information_right">
                <div className="information_icon">{website}</div>
              </div>
            </div>
            <div className="socials_panel">
              <div className="socials_left">
                <div className="socials_title">Facebook</div>
                <div className="socials_content">
                  <a
                    href="https://facebook.com/Tuptuus"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Tuptuus
                  </a>
                </div>
              </div>
              <div className="socials_right">
                <div className="socials_icon">{facebook}</div>
              </div>
            </div>
            <div className="socials_panel">
              <div className="socials_left">
                <div className="socials_title">Instagram</div>
                <div className="socials_content">
                  <a
                    href="https://facebook.com/Tuptuus"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Tuptuus
                  </a>
                </div>
              </div>
              <div className="socials_right">
                <div className="socials_icon">{instagram}</div>
              </div>
            </div>
            <div className="socials_panel">
              <div className="socials_left">
                <div className="socials_title">Twitter</div>
                <div className="socials_content">
                  <a
                    href="https://facebook.com/Tuptuus"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Tuptuus
                  </a>
                </div>
              </div>
              <div className="socials_right">
                <div className="socials_icon">{twitter}</div>
              </div>
            </div>
            <div className="socials_panel">
              <div className="socials_left">
                <div className="socials_title">LinkedIn</div>
                <div className="socials_content">
                  <a
                    href="https://facebook.com/Tuptuus"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Tuptuus
                  </a>
                </div>
              </div>
              <div className="socials_right">
                <div className="socials_icon">{linkedIn}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="searchUserTitle">Search And Pick User You Want</div>
      )}
    </>
  );
}

export default ProfileCard;
