import React, { useState } from "react";
import "../../../styles/Chats.css";
import pic from "../../../Images/profilePicture.png";

function Chats() {
  let mess = "napisałem wiadomość kurwa kurwa kurwa kurwa kurwa";
  let mess2 = mess.slice(0, 28) + "...";
  const [currMode, setCurrMode] = useState("");

  const handleCurrentChatsMode = (e) => {
    setCurrMode(e.target.value);
  };
  return (
    <div className="Chats_container">
      <div className="Chats_Top">
        <div className="Top_title">Chats</div>
        <div className="Top_chatSelect">
          <select
            onChange={handleCurrentChatsMode}
            className="Top_searchType"
            value={currMode}
          >
            <option value="All">All Chats</option>
            <option value="Groups">Groups</option>
            <option value="Priv">Priv</option>
          </select>
          <input
            className="Top_searchInput"
            type="text"
            placeholder="Search chat..."
          />
        </div>
      </div>
      <div className="Chats_contentContainer">
        <div className="Chat_block">
          <div className="Chat_left">
            <div className="Chat_icon">
              <img src={pic} alt="" className="icon_pic" />
            </div>
          </div>
          <div className="Chat_right">
            <div className="Chat_topDetails">
              <div className="leftDetails">
                <span className="Chat_title">ktoś jakis</span>
              </div>
              <div className="rightDetails">
                <div className="Chat_date">15/02/22</div>
              </div>
            </div>
            <div className="Chat_bottomDetails">
              <span className="Chat_lastMess">{mess2}</span>
            </div>
          </div>
        </div>
        <div className="Chat_block">
          <div className="Chat_left">
            <div className="Chat_icon">
              <img src={pic} alt="" className="icon_pic" />
            </div>
          </div>
          <div className="Chat_right">
            <div className="Chat_topDetails">
              <div className="leftDetails">
                <span className="Chat_title">ktoś jakis</span>
              </div>
              <div className="rightDetails">
                <div className="Chat_date">15/02/22</div>
              </div>
            </div>
            <div className="Chat_bottomDetails">
              <span className="Chat_lastMess">{mess2}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chats;
