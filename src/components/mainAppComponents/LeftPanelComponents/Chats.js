import React, { useState } from "react";
import "../../../styles/Chats.css";
import { auth } from "../../firebase-config";

function Chats(props) {
  const [currMode, setCurrMode] = useState("");
  const handleCurrentChatsMode = (e) => {
    setCurrMode(e.target.value);
  };

  let firstName = "";
  let lastName = "";

  const chatsToDisplay = props.chatsToDisplay.map((chat) => {
    if (chat.member1UID === auth.currentUser.uid) {
      firstName =
        chat.member2Name[0].toUpperCase() +
        chat.member2Name.slice(1, chat.member2Name.indexOf(" "));
      lastName =
        chat.member2Name[chat.member2Name.indexOf(" ") + 1].toUpperCase() +
        chat.member2Name.slice(chat.member2Name.indexOf(" ") + 2);
    } else {
      firstName =
        chat.member1Name[0].toUpperCase() +
        chat.member1Name.slice(1, chat.member1Name.indexOf(" "));
      lastName =
        chat.member1Name[chat.member1Name.indexOf(" ") + 1].toUpperCase() +
        chat.member1Name.slice(chat.member1Name.indexOf(" ") + 2);
    }
    return (
      <div
        onClick={() => props.selectClickedChat(chat)}
        className={`Chat_block ${
          props.currentClickedUser.UID === chat.member2UID ? "currActive" : null
        } ${
          props.currentClickedUser.UID === chat.member1UID ? "currActive" : null
        }`}
      >
        <div className="Chat_left">
          <div className="Chat_icon">
            <img
              src={
                chat.member1UID === auth.currentUser.uid
                  ? chat.member2Photo
                  : chat.member1Photo
              }
              alt=""
              className="icon_pic"
            />
          </div>
        </div>
        <div className="Chat_right">
          <div className="Chat_topDetails">
            <div className="leftDetails">
              <span className="Chat_title">{`${firstName} ${lastName}`}</span>
            </div>
            <div className="rightDetails">
              <div className="Chat_date">15/02/22</div>
            </div>
          </div>
          <div className="Chat_bottomDetails">
            <span className="Chat_lastMess">last mess</span>
          </div>
        </div>
      </div>
    );
  });
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
      <div className="Chats_contentContainer">{chatsToDisplay}</div>
    </div>
  );
}

export default Chats;
