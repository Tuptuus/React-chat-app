import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "../../../styles/UpdateProfilePhoto.css";

function UpdateProfilePhoto(props) {
  const close = <FontAwesomeIcon icon={faTimes} />;
  return (
    <div className="uploadNewProfilePic_background">
      <div className="uploadNewProfilePic">
        <div className="newProfilePic_Top">
          Update profile photo
          <span
            onClick={props.handleCloseUploadWindow}
            className="Top_closeTab"
          >
            {close}
          </span>
        </div>
        <div className="newProfilePic_Content">
          <div
            onClick={props.handleOpenUploadFilesPanel}
            className="Content_uploadPhotoButton"
          >
            Upload Photo
          </div>
          <div className="Content_previewNewProfilePhotoContainer">
            <span className="previewNewPhotoTitle">
              Preview new profile photo:
            </span>
            <div className="previewNewPhoto">
              <img
                src={
                  props.newProfilePic === null
                    ? props.currentLoggedUser.photoURL
                    : props.newProfilePic
                }
                alt=""
                className="NewImg"
              />
            </div>
          </div>
        </div>
        <div className="newProfilePic_Bottom">
          <div className="Bottom_cancelButton">
            <span
              onClick={props.handleCloseUploadWindow}
              className="cancelButton"
            >
              Cancel
            </span>
          </div>
          <div className="Bottom_submitButton">
            <button
              onClick={props.handleSetNewProfilePic}
              className="submitButton"
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <input
        type="file"
        accept="image/png, image/jpg, image/jpeg"
        className="inputBrowseImage"
        onChange={props.handleSetPreviewProfilePic}
        id="file"
        ref={props.inputFileDialogRef}
      />
    </div>
  );
}

export default UpdateProfilePhoto;
