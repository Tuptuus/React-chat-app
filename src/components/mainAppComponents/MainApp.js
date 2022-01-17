import React, { useState } from "react";
import MenuPanel from "./MenuPanel";
import "../../styles/MainApp.css";
import LeftPanel from "./LeftPanel";
import pic from "../../Images/profilePicture.png";

function MainApp(props) {
  return (
    <div className="MainAppContainer">
      <MenuPanel LogoutUser={props.LogoutUser} />
      <LeftPanel />
    </div>
  );
}

export default MainApp;
