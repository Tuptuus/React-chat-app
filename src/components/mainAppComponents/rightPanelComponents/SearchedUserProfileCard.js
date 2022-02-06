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
  faUserClock,
  faUserCheck,
  faUserTimes,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const addUser = <FontAwesomeIcon icon={faUserPlus} />;
const waitUser = <FontAwesomeIcon icon={faUserClock} />;
const deleteFriend = <FontAwesomeIcon icon={faUserTimes} />;
const requestSend = <FontAwesomeIcon icon={faUserCheck} />;
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
  console.log(props.friendActionMode);
  let firstName = "";
  let lastName = "";
  if (props.currentClickedUser.name) {
    firstName =
      props.currentClickedUser.name[0].toUpperCase() +
      props.currentClickedUser.name.slice(
        1,
        props.currentClickedUser.name.indexOf(" ")
      );
    lastName =
      props.currentClickedUser.name[
        props.currentClickedUser.name.indexOf(" ") + 1
      ].toUpperCase() +
      props.currentClickedUser.name.slice(
        props.currentClickedUser.name.indexOf(" ") + 2
      );
  }
  return (
    <>
      {props.currentClickedUser ? (
        <div className="ProfileCardContainer">
          <div className="ProfileCard_profileBlock">
            <div className="ProfileBlock_profilePicContainer">
              <img
                src={props.currentClickedUser.profilePhoto}
                alt=""
                className="profileBlock_pic"
              />
              <div className="profileBlock_name">{`${firstName} ${lastName}`}</div>
            </div>
            <div className="profileBlock_actions">
              {props.friendActionMode === "Add" ? (
                <div
                  onClick={() =>
                    props.addToFriendsSystem(props.currentClickedUser.UID)
                  }
                  className="addUser"
                >
                  {addUser}
                </div>
              ) : null}
              {props.friendActionMode === "Waiting" ? (
                <div className="waitUser">{waitUser}</div>
              ) : null}
              {props.friendActionMode === "requestSend" ? (
                <div className="waitUser">{requestSend}</div>
              ) : null}
              {props.friendActionMode === "DeleteFriend" ? (
                <div className="waitUser">{deleteFriend}</div>
              ) : null}
              <div className="message">{message}</div>
            </div>
          </div>
          <div className="ProfileCard_informationsContainer">
            <div className="information_panel">
              <div className="information_left">
                <div className="information_title">Birthdate</div>
                <div className="information_content">
                  {props.currentClickedUser.birthdate
                    ? props.currentClickedUser.birthdate
                    : "---------------"}
                </div>
              </div>
              <div className="information_right">
                <div className="information_icon">{calendar}</div>
              </div>
            </div>
            <div className="information_panel">
              <div className="information_left">
                <div className="information_title">Phone Number</div>
                <div className="information_content">
                  {props.currentClickedUser.phoneNumber
                    ? props.currentClickedUser.phoneNumber
                    : "---------------"}
                </div>
              </div>
              <div className="information_right">
                <div className="information_icon">{phone}</div>
              </div>
            </div>
            <div className="information_panel">
              <div className="information_left">
                <div className="information_title">E-mail</div>
                <div className="information_content">
                  {props.currentClickedUser.email
                    ? props.currentClickedUser.email
                    : "---------------"}
                </div>
              </div>
              <div className="information_right">
                <div className="information_icon">{mail}</div>
              </div>
            </div>
            <div className="information_panel">
              <div className="information_left">
                <div className="information_title">Address</div>
                <div className="information_content">
                  {props.currentClickedUser.address
                    ? props.currentClickedUser.address
                    : "---------------"}
                </div>
              </div>
              <div className="information_right">
                <div className="information_icon">{address}</div>
              </div>
            </div>
            <div className="information_panel">
              <div className="information_left">
                <div className="information_title">Website</div>
                <div className="information_content">
                  {props.currentClickedUser.website
                    ? props.currentClickedUser.website
                    : "---------------"}
                </div>
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
