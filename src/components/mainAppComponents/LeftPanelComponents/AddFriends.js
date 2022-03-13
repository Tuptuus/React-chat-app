import React from "react";
import "../../../styles/Friends.css";
import { auth } from "../../firebase-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const back = <FontAwesomeIcon icon={faArrowLeft} />;
let foundUsersElement = [];

function AddFriends(props) {
  if (props.currentClickedUser !== null) {
    // eslint-disable-next-line array-callback-return
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
            }}
            className={`User_block ${
              props.currentClickedUser.UID === user.UID
                ? "User_currActive"
                : null
            }`}
            key={user.UID}
          >
            <div className="User_left">
              <div className="User_icon">
                <img src={user.profilePhoto} alt="" className="User_icon_pic" />
              </div>
            </div>
            <div className="User_right">
              <div className="User_title">{`${firstName} ${lastName}`}</div>
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
