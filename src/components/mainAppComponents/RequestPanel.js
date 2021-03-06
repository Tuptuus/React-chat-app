import React from "react";
import "../../styles/RequestPanel.css";

let friendsRequests = [];
function RequestPanel(props) {
  if (props.usersRequests !== null) {
    friendsRequests = props.usersRequests.map((request) => (
      <div key={request.UID} className="User_container">
        <div className="container_left">
          <div className="left_profPic">
            <img src={request.profilePhoto} alt="" />
          </div>
        </div>
        <div className="container_right">
          <div className="right_top">
            <div className="top_title">
              {request.name[0].toUpperCase() +
                request.name.slice(1, request.name.indexOf(" ")) +
                " " +
                request.name[request.name.indexOf(" ") + 1].toUpperCase() +
                request.name.slice(request.name.indexOf(" ") + 2)}{" "}
              wysłał/a Ci zaproszenie do grona znajomych
            </div>
          </div>
          <div className="right_bottom">
            <div className="bottom_buttons">
              <button
                onClick={() => props.acceptFriendsRequest(request)}
                className="acceptRequest"
              >
                Accept
              </button>
              <button
                onClick={() => props.rejectFriendsRequest(request)}
                className="deleteRequest"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    ));
  }
  return (
    <>
      {props.friendsRequestPanel === true ? (
        <div
          className={`requestPanel ${
            props.friendsRequestPanel === true ? "Active" : "Disable"
          }`}
        >
          {friendsRequests}
        </div>
      ) : null}
    </>
  );
}

export default RequestPanel;
