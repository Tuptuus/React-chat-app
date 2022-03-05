import React from "react";
import "../../../styles/ChatsContainer.css";
import EmojiPicker from "emoji-picker-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faGrinSquint } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../../firebase-config";

const rightArrow = <FontAwesomeIcon icon={faArrowRight} />;
const plusCircle = <FontAwesomeIcon icon={faPlusCircle} />;
const smileEmote = <FontAwesomeIcon icon={faGrinSquint} />;

function ChatsContainer(props) {
  let firstName = "";
  let lastName = "";
  if (props.currentClickedUser) {
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

  const messagesToDisplay = props.sortedMessages.map((message) => (
    <div
      className={
        message.senderID === auth.currentUser.uid
          ? "message_myLine"
          : "message_otherLine"
      }
    >
      <div
        className={
          message.senderID === auth.currentUser.uid
            ? "message_block loggedUserMessage"
            : "message_block otherUserMessage"
        }
        key={message.sendDate}
      >
        <div className="message_text">{message.message}</div>
      </div>
    </div>
  ));

  return (
    <>
      {props.currentClickedUser ? (
        <div className="ChatsContainer">
          <div className="Chats_TopContainer">
            <div className="User_profilePic">
              <img
                className="profileImage"
                src={props.currentClickedUser.profilePhoto}
                alt=""
              />
            </div>
            <div className="User_name">{`${firstName} ${lastName}`}</div>
          </div>
          <div className="Chats_mainContainer">
            {messagesToDisplay}
            {props.showEmojiPicker ? (
              <div className="EmojiPicker">
                <EmojiPicker onEmojiClick={props.handleChosenEmoji} />
              </div>
            ) : null}
            <div ref={props.scrollTo} className="divToScroll"></div>
          </div>
          <div className="Chats_bottomContainer">
            <div className="bottom_plusIcon">{plusCircle}</div>
            <input
              placeholder="Type your message..."
              className="messages_input"
              type="text"
              onChange={props.handleInputValue}
              value={props.chatInputValue}
              onKeyPress={props.enterPressMessages}
            />
            <div onClick={props.displayEmojiPicker} className="messages_emotes">
              {smileEmote}
            </div>
            <button className="messages_sendBtn">{rightArrow}</button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ChatsContainer;
