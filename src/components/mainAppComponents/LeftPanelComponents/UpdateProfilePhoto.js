import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "../../../styles/UpdateProfilePhoto.css";
import { Spinner } from "react-bootstrap";

function UpdateProfilePhoto(props) {
  const close = <FontAwesomeIcon icon={faTimes} />;
  return (
    <div className="uploadNewProfilePic_background">
      <div className="uploadNewProfilePic">
        <div className="newProfilePic_Top">
          <span className="Top_title">Update profile photo</span>
          <span
            onClick={() => props.handleConfirmReject("open")}
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
          {props.uploadPrevPicAnimation === true ? (
            <Spinner
              animation="border"
              variant="danger"
              className="uploadPrevPicLoadingAnimation"
            />
          ) : null}

          <div className="Content_previewNewProfilePhotoContainer">
            <span className="previewNewPhotoTitle">
              Preview new profile photo:
            </span>
            <div className="previewNewPhoto">
              <img
                src={
                  props.newPreviewProfilePic === null
                    ? props.currentLoggedUser.photoURL
                    : props.newPreviewProfilePic
                }
                alt=""
                className="NewImg"
              />
            </div>
          </div>
        </div>
        <div className="newProfilePic_Bottom">
          {props.uploadNewProfPicAnimation === true ? (
            <Spinner
              animation="border"
              variant="danger"
              className="uploadNewPicLoadingAnimation"
            />
          ) : null}

          <div className="Bottom_cancelButton">
            <span
              onClick={() => props.handleConfirmReject("open")}
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
      {props.isConfirmRejectOpen === true ? (
        <div className="backgroundCancelUpload">
          <div className="confirmCancelUpload">
            <div className="confirmTop">
              <span className="Top_cancelTitle">Cancel?</span>
              <span
                onClick={() => props.handleConfirmReject("close")}
                className="Top_cancelIcon"
              >
                {close}
              </span>
            </div>
            <div className="confirmBottom">
              <div className="Bottom_cancelTitle">
                Are you sure you want to discard changes?
              </div>
              <div className="Bottom_buttons">
                <div className="confirmBottom_cancelButton">
                  <span
                    onClick={() => props.handleConfirmReject("close")}
                    className="confirmCancelButton"
                  >
                    Cancel
                  </span>
                </div>
                <div className="confrimBottom_submitButton">
                  <button
                    onClick={props.handleCloseUploadWindow}
                    className="confirmSubmitButton"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default UpdateProfilePhoto;
