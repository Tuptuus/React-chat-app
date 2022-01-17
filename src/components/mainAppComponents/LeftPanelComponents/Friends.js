import React, { useEffect, useState } from "react";
import "../../../styles/Friends.css";
import pic from "../../../Images/profilePicture.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { db } from "../../firebase-config";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const addUser = <FontAwesomeIcon icon={faUserPlus} />;
function Friends(props) {
  const [userValue, setUserValue] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);
  const [currUser, setCurrUser] = useState({});

  const handleSearchUserInFriends = (e) => {
    setUserValue(e.target.value);
    setCurrUser("");
  };
  const colRef = collection(db, "Users");
  const q = query(colRef, where("name", "==", userValue));
  let foundUsersArray = [];
  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        foundUsersArray.push({ ...doc.data() });
      });
      setFoundUsers(foundUsersArray);
    });
  });

  const handleCurrentActiveFriend = (user) => {
    setCurrUser(user);
  };

  const foundUsersElement = foundUsers.map((user) => (
    <div
      onClick={() => handleCurrentActiveFriend(user)}
      className={`Friend_block ${
        currUser.UID === user.UID ? "Friend_currActive" : null
      }`}
      key={user.UID}
    >
      <div className="Friend_left">
        <div className="Friend_icon">
          <img src={pic} alt="" className="Friend_icon_pic" />
        </div>
      </div>
      <div className="Friend_right">
        <div className="Friend_title">{user.name}</div>
      </div>
    </div>
  ));
  return (
    <div className="Friends_container">
      <div className="Friends_Top">
        <div className="Friends_Top_title">Friends</div>
        <div className="Friends_Top_chatSelect">
          <input
            onChange={handleSearchUserInFriends}
            className="Friends_Top_searchInput"
            type="text"
            placeholder="Search friend..."
          />
        </div>
      </div>
      <div className="Friends_contentContainer">{foundUsersElement}</div>
    </div>
  );
}

export default Friends;
