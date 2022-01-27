import React from "react";
import "../../../styles/Friends.css";
import { auth } from "../../firebase-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const back = <FontAwesomeIcon icon={faArrowLeft} />;
let foundUsersElement = [];

function AddFriends(props) {
  console.log(props.currentClickedUser);
  if (props.currentClickedUser !== null) {
    foundUsersElement = props.foundUsers.map((user) => {
      const firstName =
        user.name[0].toUpperCase() + user.name.slice(1, user.name.indexOf(" "));
      const lastName =
        user.name[user.name.indexOf(" ") + 1].toUpperCase() +
        user.name.slice(user.name.indexOf(" ") + 2);
      if (user.UID !== auth.currentUser.uid) {
        return (
          <div
            onClick={() => {
              props.handleCurrentActiveUser(user);
              // props.showClickedUser(user);
            }}
            className={`Friend_block ${
              props.currentClickedUser.UID === user.UID
                ? "Friend_currActive"
                : null
            }`}
            key={user.UID}
          >
            <div className="Friend_left">
              <div className="Friend_icon">
                <img
                  src={user.profilePhoto}
                  alt=""
                  className="Friend_icon_pic"
                />
              </div>
            </div>
            <div className="Friend_right">
              <div className="Friend_title">{`${firstName} ${lastName}`}</div>
            </div>
          </div>
        );
      }
    });
  }

  return (
    <div className="Friends_container">
      <div className="Friends_Top">
        <div className="Friends_Top_title">Add Friends</div>
        <div className="Friends_Top_chatSelect">
          <input
            onChange={props.handleSearchUserInFriends}
            className="Friends_Top_searchInput"
            type="text"
            placeholder="Search users..."
          />
          <span
            title="click to back to friends"
            className="Friends_Top_addIcon"
            onClick={props.handleCurrentMode}
          >
            {back}
          </span>
        </div>
      </div>
      <div className="Friends_contentContainer">{foundUsersElement}</div>
    </div>
  );
}

export default AddFriends;
