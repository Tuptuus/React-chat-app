import React from "react";
import { useEffect } from "react";
import "../../styles/RequestPanel.css";

let friendsRequests = [];
function RequestPanel(props) {
  if (props.usersRequests !== null) {
    console.log("właśnie na nowo zmapowano");
    console.log(props.usersRequests);
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
              {request.name} wysłał/a Ci zaproszenie do grona znajomych
            </div>
          </div>
          <div className="right_bottom">
            <div className="bottom_buttons">
              <button className="acceptRequest">Accept</button>
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
  return <div className="requestPanel">{friendsRequests}</div>;
}

export default RequestPanel;
