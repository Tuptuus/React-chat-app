import React, { useState } from "react";
import LeftPanel from "./LeftPanel";
import "../../styles/MainApp.css";

function MainApp(props) {
  const [activePage, setActivePage] = useState("Chats");

  const handleCurrentActivePage = (type) => {
    setActivePage(type);
  };
  return (
    <div className="MainAppContainer">
      <LeftPanel
        handleCurrPage={handleCurrentActivePage}
        activePage={activePage}
        LogoutUser={props.LogoutUser}
      />
      główna {props.currentUser.displayName}{" "}
      {/* <button onClick={props.LogoutUser}>logout</button> */}
    </div>
  );
}

export default MainApp;
