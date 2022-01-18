import React, { useState } from "react";
import AddFriends from "./AddFriends";
import Friends from "./Friends";

function FriendsContainer() {
  const [mode, setMode] = useState("Friends");
  const handleCurrentModeFriends = () => {
    if (mode === "Friends") {
      setMode("AddFriends");
    } else if (mode === "AddFriends") {
      setMode("Friends");
    }
  };
  return (
    <>
      {mode === "Friends" ? (
        <Friends handleCurrentMode={handleCurrentModeFriends} />
      ) : (
        <AddFriends handleCurrentMode={handleCurrentModeFriends} />
      )}
    </>
  );
}

export default FriendsContainer;
