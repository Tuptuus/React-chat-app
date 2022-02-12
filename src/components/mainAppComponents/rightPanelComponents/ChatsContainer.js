import React from "react";
import "../../../styles/ChatsContainer.css";
import EmojiPicker from "emoji-picker-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faGrinSquint } from "@fortawesome/free-solid-svg-icons";

const rightArrow = <FontAwesomeIcon icon={faArrowRight} />;
const plusCircle = <FontAwesomeIcon icon={faPlusCircle} />;
const smileEmote = <FontAwesomeIcon icon={faGrinSquint} />;

function ChatsContainer(props) {
  return (
    <div className="ChatsContainer">
      <div className="Chats_TopContainer">
        <div className="User_profilePic">
          <img className="profileImage" src="" alt="" />
        </div>
      </div>
      <div className="Chats_mainContainer">
        {props.showEmojiPicker ? (
          <div className="EmojiPicker">
            <EmojiPicker onEmojiClick={props.handleChosenEmoji} />
          </div>
        ) : null}
      </div>
      <div className="Chats_bottomContainer">
        <div className="bottom_plusIcon">{plusCircle}</div>
        <input
          placeholder="Type your message..."
          className="messages_input"
          type="text"
          onChange={props.handleInputValue}
          value={props.chatInputValue}
        />
        <div onClick={props.displayEmojiPicker} className="messages_emotes">
          {smileEmote}
        </div>
        <button className="messages_sendBtn">{rightArrow}</button>
      </div>
    </div>
  );
}

export default ChatsContainer;
