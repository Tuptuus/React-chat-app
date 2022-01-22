import React, { useState, useEffect } from "react";
import "../../../styles/Friends.css";
import { db, auth } from "../../firebase-config";
import {
  collection,
  query,
  onSnapshot,
  startAt,
  endAt,
  orderBy,
  limit,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const back = <FontAwesomeIcon icon={faArrowLeft} />;

function AddFriends(props) {
  const [userValue, setUserValue] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);
  const [currUser, setCurrUser] = useState({});

  const handleSearchUserInFriends = (e) => {
    setUserValue(e.target.value);
    setCurrUser("");
  };
  const colRef = collection(db, "Users");
  const q = query(
    colRef,
    orderBy("name"),
    limit(10),
    startAt(userValue),
    endAt(userValue + "\uf8ff")
  );
  let foundUsersArray = [];
  useEffect(() => {
    if (userValue !== "") {
      onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          foundUsersArray.push({ ...doc.data() });
        });
        setFoundUsers(foundUsersArray);
      });
    } else {
      setFoundUsers([]);
    }
  }, [userValue]);

  const handleCurrentActiveFriend = (user) => {
    setCurrUser(user);
  };

  const foundUsersElement = foundUsers.map((user) => {
    const firstName =
      user.name[0].toUpperCase() + user.name.slice(1, user.name.indexOf(" "));
    const lastName =
      user.name[user.name.indexOf(" ") + 1].toUpperCase() +
      user.name.slice(user.name.indexOf(" ") + 2);
    if (user.UID !== auth.currentUser.uid) {
      return (
        <div
          onClick={() => handleCurrentActiveFriend(user)}
          className={`Friend_block ${
            currUser.UID === user.UID ? "Friend_currActive" : null
          }`}
          key={user.UID}
        >
          <div className="Friend_left">
            <div className="Friend_icon">
              <img src={user.profilePhoto} alt="" className="Friend_icon_pic" />
            </div>
          </div>
          <div className="Friend_right">
            <div className="Friend_title">{`${firstName} ${lastName}`}</div>
          </div>
        </div>
      );
    }
  });

  return (
    <div className="Friends_container">
      <div className="Friends_Top">
        <div className="Friends_Top_title">Add Friends</div>
        <div className="Friends_Top_chatSelect">
          <input
            onChange={handleSearchUserInFriends}
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
