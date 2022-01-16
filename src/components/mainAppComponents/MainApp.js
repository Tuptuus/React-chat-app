import React, { useState } from "react";
import MenuPanel from "./MenuPanel";
import "../../styles/MainApp.css";
import LeftPanel from "./LeftPanel";
// import { db } from "../firebase-config";
// import { collection, query, where, onSnapshot } from "firebase/firestore";
function MainApp(props) {
  // const navigate = useNavigate();
  const [activePage, setActivePage] = useState("Chats");
  // const colRef = collection(db, "Users");
  // const q = query(colRef, where("name", "==", "tuptuus dwa"));
  // onSnapshot(q, (snapshot) => {
  //   let users = [];
  //   snapshot.docs.forEach((doc) => {
  //     users.push({ ...doc.data() });
  //   });
  //   console.log(users);
  // });

  const handleCurrentActivePage = (type) => {
    setActivePage(type);
    // if (activePage === "Chats") {
    //   navigate("/Chats");
    // } else if (props.activePage === "Friends") {
    //   navigate("/Friends");
    // } else if (props.activePage === "Profile") {
    //   navigate("/Profile");
    // }
  };
  return (
    <div className="MainAppContainer">
      <MenuPanel
        handleCurrPage={handleCurrentActivePage}
        activePage={activePage}
        LogoutUser={props.LogoutUser}
      />
      <LeftPanel activePage={activePage} />
    </div>
  );
}

export default MainApp;
