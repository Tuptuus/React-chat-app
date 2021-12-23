import React, { useState } from "react";
import "../styles/App.css";
import { db, auth } from "./firebase-config";
import SignIn from "./SignIn";

function App() {
  const [islogin, setIslogin] = useState(true);
  return (
    <div className="App">{islogin === true ? <SignIn /> : <p>główna</p>}</div>
  );
}

export default App;
