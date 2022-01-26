import React from "react";
import "../../../styles/Friends.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

const addUser = <FontAwesomeIcon icon={faUserPlus} />;
function Friends(props) {
  return (
    <div className="Friends_container">
      <div className="Friends_Top">
        <div className="Friends_Top_title">Friends</div>
        <div className="Friends_Top_chatSelect">
          <input
            // onChange={handleSearchUserInFriends}
            className="Friends_Top_searchInput"
            type="text"
            placeholder="Search friend..."
          />
          <span
            title="click to add friends"
            className="Friends_Top_addIcon"
            onClick={props.handleCurrentMode}
          >
            {addUser}
          </span>
        </div>
      </div>
      <div className="Friends_contentContainer">
        <div className="Friends_dontHaveFriendsSadge">
          You don't have any friends yet <br />
          Just click this icon above
        </div>
      </div>
    </div>
  );
}

export default Friends;
