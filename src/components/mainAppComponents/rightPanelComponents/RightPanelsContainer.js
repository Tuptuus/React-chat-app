import React from "react";
import { useLocation } from "react-router-dom";
import "../../../styles/RightPanelsContainer.css";
import FriendsContainer from "./FriendsContainer";
import ProfilePanel from "./ProfilePanel";

function RightPanelsContainer(props) {
  const location = useLocation();
  return (
    <div className="rightContainer">
      {location.pathname === "/ChatApp/Friends" ? (
        <FriendsContainer
          currentClickedUser={props.currentClickedUser}
          currentLoggedUser={props.currentLoggedUser}
          mode={props.mode}
          addToFriendsSystem={props.addToFriendsSystem}
          friendActionMode={props.friendActionMode}
        />
      ) : null}
      {location.pathname === "/ChatApp/Profile" ? (
        <ProfilePanel
          handleProfileUpdateInformationsInputs={
            props.handleProfileUpdateInformationsInputs
          }
          updateProfileInformations={props.updateProfileInformations}
          updateSocialsInformations={props.updateSocialsInformations}
          currentLoggedUserDatabase={props.currentLoggedUserDatabase}
          AccInfoMobileNumber={props.AccInfoMobileNumber}
          AccInfoBirthDate={props.AccInfoBirthDate}
          AccInfoEmail={props.AccInfoEmail}
          AccInfoWebsite={props.AccInfoWebsite}
          AccInfoAddress={props.AccInfoAddress}
          FacebookUsername={props.FacebookUsername}
          TwitterUsername={props.TwitterUsername}
          InstagramUsername={props.InstagramUsername}
          LinkedInUsername={props.LinkedInUsername}
          AccInfoFirstName={props.AccInfoFirstName}
          AccInfoLastName={props.AccInfoLastName}
          updateProfileError={props.updateProfileError}
          saveUpdateAnimation={props.saveUpdateAnimation}
          updateProfilePassword={props.updateProfilePassword}
          updatePasswordAnimation={props.updatePasswordAnimation}
          updatePasswordError={props.updatePasswordError}
          currentPasswordValue={props.currentPasswordValue}
          newPasswordValue={props.newPasswordValue}
          newRepeatPasswordValue={props.newRepeatPasswordValue}
        />
      ) : null}
    </div>
  );
}

export default RightPanelsContainer;
