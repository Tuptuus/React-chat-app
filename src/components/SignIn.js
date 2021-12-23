import React, { useState } from "react";
import "../styles/SignIn.css";
import Register from "./Register";
import Login from "./Login";

function SignIn() {
  const [signMode, setSignMode] = useState("register");

  const handleChangeSignMode = (e) => {
    e.preventDefault();
    if (signMode === "login") {
      setSignMode("register");
    } else if (signMode === "register") {
      setSignMode("login");
    }
  };
  return (
    <div className="Sign_container">
      <div className="Sign_card">
        <div className="Sign_Card_leftSide">
          <p className="leftSide_welcome">Welcome to</p>
          <p className="leftSide_appName">TupChat</p>
        </div>
        <div className="Sign_Card_rightSide">
          {signMode === "register" ? (
            <Register handleChangeSignMode={handleChangeSignMode} />
          ) : (
            <Login />
          )}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
