import React from "react";
import "../../../styles/FriendsList.css";

let FriendsToDisplay = [];
function FriendsList(props) {
  if (props.friendsDocs !== []) {
    FriendsToDisplay = props.friendsDocs.map((item) => {
      const firstName =
        item.name[0].toUpperCase() + item.name.slice(1, item.name.indexOf(" "));
      const lastName =
        item.name[item.name.indexOf(" ") + 1].toUpperCase() +
        item.name.slice(item.name.indexOf(" ") + 2);
      return (
        <div
          onClick={() => {
            props.handleCurrentActiveUser(item);
          }}
          className={`Friend_block`}
          key={item.userUID}
        >
          <div className="Friend_left">
            <div className="Friend_icon">
              <img src={item.profilePhoto} alt="" className="Friend_icon_pic" />
            </div>
          </div>
          <div className="Friend_right">
            <div className="Friend_title">{`${firstName} ${lastName}`}</div>
          </div>
        </div>
      );
    });
  }
  return <>{FriendsToDisplay}</>;
}

export default FriendsList;
