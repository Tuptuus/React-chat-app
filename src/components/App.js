import React, { useEffect, useState } from "react";
import "../styles/App.css";
import { db, auth, storage } from "./firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import SignIn from "./SignInComponents/SignIn";
import MainApp from "./mainAppComponents/MainApp";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Chats from "./mainAppComponents/LeftPanelComponents/Chats";
import Friends from "./mainAppComponents/LeftPanelComponents/Friends";
import Profile from "./mainAppComponents/LeftPanelComponents/Profile";
import defaultProfilePic from "../Images/defaultProfilePic.png";
import { useRef } from "react";

function App() {
  const [signMode, setSignMode] = useState("login");

  const [RegisterName, setRegisterName] = useState("");
  const [RegisterEmail, setRegisterEmail] = useState("");
  const [RegisterPassword, setRegisterPassword] = useState("");
  const [RegisterError, setRegisterError] = useState("");
  const [RegisterloadingAnimation, setRegisterLoadingAnimation] =
    useState(false);
  const [LoginEmail, setLoginEmail] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");
  const [LoginLoadingAnimation, setLoginLoadingAnimation] = useState(false);
  const [LoginError, setLoginError] = useState("");
  const [currentLoggedUser, setCurrentLoggedUser] = useState({});
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadPrevPicAnimation, setUploadPrevPicAnimation] = useState(false);
  const [uploadNewProfPicAnimation, setUploadNewProfPicAnimation] =
    useState(false);
  const [newPreviewProfilePic, setNewPreviewProfilePic] = useState(null);
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [isConfirmRejectOpen, setIsConfirmRejectOpen] = useState(false);
  const [confirmLogoutPanel, setConfirmLogoutPanel] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // STAY LOGIN AFTER REFRESH OR REOPEN PAGE
  onAuthStateChanged(auth, (currUser) => {
    setCurrentLoggedUser(currUser);
  });

  useEffect(() => {
    if (auth.currentUser) {
      if (location.pathname === "/ChatApp/Chats") {
        navigate("/ChatApp/Chats");
      } else if (location.pathname === "/ChatApp/Friends") {
        navigate("/ChatApp/Friends");
      } else if (location.pathname === "/ChatApp/Profile") {
        navigate("/ChatApp/Profile");
      } else {
        navigate("/ChatApp");
      }
    }
  }, [currentLoggedUser]);

  // CHANGE PAGE BETWEEN LOGIN OR REGISTER
  const handleChangeSignMode = (e) => {
    e.preventDefault();
    if (signMode === "login") {
      setSignMode("register");
      setRegisterError("");
      setLoginEmail("");
      setLoginPassword("");
    } else if (signMode === "register") {
      setSignMode("login");
      setLoginError("");
      setRegisterName("");
      setRegisterEmail("");
      setRegisterPassword("");
    }
  };

  // ADDING USER TO DATABASE
  const AddUserToDatabase = async () => {
    const registerUserCollRef = doc(db, "Users", auth.currentUser.uid);
    const registerUserPayload = {
      UID: auth.currentUser.uid,
      name: auth.currentUser.displayName.toLowerCase(),
      email: auth.currentUser.email,
      profilePhoto: auth.currentUser.photoURL,
    };
    await setDoc(registerUserCollRef, registerUserPayload);
  };

  // REGISTER USER WITH EMAIL AND PASSWORD
  const RegisterUser = async () => {
    if (
      RegisterName !== "" &&
      RegisterEmail !== "" &&
      RegisterPassword !== "" &&
      RegisterName.match(" ") &&
      RegisterName[RegisterName.length - 1] !== " "
    ) {
      try {
        setRegisterLoadingAnimation(true);
        await createUserWithEmailAndPassword(
          auth,
          RegisterEmail,
          RegisterPassword
        );
        await updateProfile(auth.currentUser, {
          displayName: RegisterName,
          photoURL: defaultProfilePic,
        }).then(() => {});
        AddUserToDatabase();
        setRegisterName("");
        setRegisterEmail("");
        setRegisterPassword("");
        setRegisterError("");
        setRegisterLoadingAnimation(false);
        navigate("/ChatApp");
      } catch (error) {
        if (error.code === "auth/invalid-email") {
          setRegisterError("Invalid Email");
          setTimeout(() => {
            setRegisterError("");
          }, 3000);
          setRegisterLoadingAnimation(false);
        } else if (error.code === "auth/email-already-in-use") {
          setRegisterError("This email is already in use");
          setTimeout(() => {
            setRegisterError("");
          }, 3000);
          setRegisterLoadingAnimation(false);
        } else if (error.code === "auth/weak-password") {
          setRegisterError("Too weak password");
          setTimeout(() => {
            setRegisterError("");
          }, 3000);
          setRegisterLoadingAnimation(false);
        }
      }
    } else if (
      RegisterName === "" ||
      RegisterEmail === "" ||
      RegisterPassword === ""
    ) {
      setRegisterError("Fill in all data");
      setTimeout(() => {
        setRegisterError("");
      }, 3000);
    } else if (RegisterName[RegisterName.length - 1] === " ") {
      setRegisterError("Remove spaces from behind of your name");
      setTimeout(() => {
        setRegisterError("");
      }, 3000);
    } else {
      setRegisterError("Your name must contains space");
      setTimeout(() => {
        setRegisterError("");
      }, 3000);
    }
  };

  // LOGIN USER WITH EMAIL AND PASSWORD
  const LoginUser = async () => {
    if (LoginEmail !== "" && LoginPassword !== "") {
      try {
        setLoginLoadingAnimation(true);
        await signInWithEmailAndPassword(auth, LoginEmail, LoginPassword);
        setLoginEmail("");
        setLoginPassword("");
        setLoginLoadingAnimation(false);
        navigate("/ChatApp");
      } catch (error) {
        if (error.code === "auth/wrong-password") {
          setLoginError("Invalid Password");
          setTimeout(() => {
            setLoginError("");
          }, 3000);
          setLoginLoadingAnimation(false);
        } else if (error.code === "auth/user-not-found") {
          setLoginError("User not found");
          setTimeout(() => {
            setLoginError("");
          }, 3000);
          setLoginLoadingAnimation(false);
        } else if (error.code === "auth/too-many-requests") {
          setLoginError("Try again later");
          setTimeout(() => {
            setLoginError("");
          }, 3000);
          setLoginLoadingAnimation(false);
        } else if (error.code === "auth/invalid-email") {
          setLoginError("Invalid Email");
          setTimeout(() => {
            setLoginError("");
          }, 3000);
          setLoginLoadingAnimation(false);
        }
      }
    } else {
      setLoginError("Fill in all data");
      setTimeout(() => {
        setLoginError("");
      }, 3000);
    }
  };

  // SIGN IN WITH GOOGLE OPTION
  const SignInUserWithGoogle = async () => {
    try {
      const GoogleProvider = new GoogleAuthProvider();
      await signInWithPopup(auth, GoogleProvider);
      AddUserToDatabase();
      navigate("/ChatApp");
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        setLoginError("account exists with different credential");
        setRegisterError("account exists with different credential");
        setTimeout(() => {
          setLoginError("");
          setRegisterError("");
        }, 3000);
      }
    }
  };

  // SIGN IN WITH FACEBOOK OPTION
  const SignInUserWithFacebook = async () => {
    try {
      const facebookProvider = new FacebookAuthProvider();
      await signInWithPopup(auth, facebookProvider);
      AddUserToDatabase();
      navigate("/ChatApp");
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        setLoginError("account exists with different credential");
        setRegisterError("account exists with different credential");
        setTimeout(() => {
          setLoginError("");
          setRegisterError("");
        }, 3000);
      }
    }
  };

  // LOGOUT USER & CONFIRM LOGOUT

  const handleLogoutUser = (type) => {
    if (type === "openPanel") {
      setConfirmLogoutPanel(true);
    } else if (type === "closePanel") {
      setConfirmLogoutPanel(false);
    }
  };
  const LogoutUser = async () => {
    signOut(auth);
    setConfirmLogoutPanel(false);
    setNewPreviewProfilePic(null);
    setSignMode("login");
    navigate("/");
  };

  // HANDLE ALL INPUTS ON REGISTER AND LOGIN PAGES
  const handleRegisterName = (e) => {
    setRegisterName(e.target.value);
  };
  const handleRegisterEmail = (e) => {
    setRegisterEmail(e.target.value);
  };
  const handleRegisterPassword = (e) => {
    setRegisterPassword(e.target.value);
  };
  const handleLoginEmail = (e) => {
    setLoginEmail(e.target.value);
  };
  const handleLoginPassword = (e) => {
    setLoginPassword(e.target.value);
  };
  const handleEnterLoginPress = (e) => {
    if (e.key === "Enter") {
      LoginUser();
    }
  };
  const handleEnterRegisterPress = (e) => {
    if (e.key === "Enter") {
      RegisterUser();
    }
  };

  // CHANGE PROFILE PICTURE SYSTEM & CONFIRM REJECT CHANGES IN PROFILE PICTURE
  const inputFile = useRef(null);

  const handleOpenUploadFilesPanel = async () => {
    await inputFile.current.click();
    handleSetPreviewProfilePic();
  };

  const handleSetPreviewProfilePic = async (e) => {
    setUploadPrevPicAnimation(true);
    const fileRef = ref(
      storage,
      "previewProfilePictures/" + currentLoggedUser.uid + ".png"
    );
    if (e.target.files[0]) {
      await uploadBytes(fileRef, e.target.files[0]);
      const photoURL = await getDownloadURL(fileRef);
      setNewProfilePic(e.target.files[0]);
      setNewPreviewProfilePic(photoURL);
      setUploadPrevPicAnimation(false);
    }
  };

  const handleSetNewProfilePic = async () => {
    setUploadNewProfPicAnimation(true);
    const fileRef = ref(
      storage,
      "ProfilePictures/" + currentLoggedUser.uid + ".png"
    );
    await uploadBytes(fileRef, newProfilePic);
    const photoURL = await getDownloadURL(fileRef);
    await updateProfile(currentLoggedUser, {
      photoURL: photoURL,
    });
    const registerUserCollRef = doc(db, "Users", auth.currentUser.uid);
    const registerUserPayload = {
      UID: auth.currentUser.uid,
      name: auth.currentUser.displayName.toLowerCase(),
      email: auth.currentUser.email,
      profilePhoto: auth.currentUser.photoURL,
    };
    await setDoc(registerUserCollRef, registerUserPayload);
    setNewProfilePic(null);
    setIsUploadOpen(false);
    setUploadNewProfPicAnimation(false);
  };

  const handleCloseUploadWindow = async () => {
    setNewPreviewProfilePic(null);
    setIsUploadOpen(false);
    setIsConfirmRejectOpen(false);
  };
  const handleOpenUploadWindow = () => {
    setIsUploadOpen(true);
  };

  const handleConfirmReject = (type) => {
    if (type === "open") {
      setIsConfirmRejectOpen(true);
    } else if (type === "close") {
      setIsConfirmRejectOpen(false);
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <SignIn
              signMode={signMode}
              RegisterNameValue={RegisterName}
              RegisterEmailValue={RegisterEmail}
              RegisterPasswordValue={RegisterPassword}
              handleRegisterUser={RegisterUser}
              handleRegisterName={handleRegisterName}
              handleRegisterEmail={handleRegisterEmail}
              handleRegisterPassword={handleRegisterPassword}
              handleChangeSignMode={handleChangeSignMode}
              RegisterErrorMessage={RegisterError}
              RegisterLoadingAnimation={RegisterloadingAnimation}
              handleLoginUser={LoginUser}
              handleLoginEmail={handleLoginEmail}
              handleLoginPassword={handleLoginPassword}
              LoginEmailValue={LoginEmail}
              LoginPasswordValue={LoginPassword}
              LoginErrorMessage={LoginError}
              LoginLoadingAnimation={LoginLoadingAnimation}
              SignInUserWithGoogle={SignInUserWithGoogle}
              SignInUserWithFacebook={SignInUserWithFacebook}
              handleEnterLoginPress={handleEnterLoginPress}
              handleEnterRegisterPress={handleEnterRegisterPress}
            />
          }
        />
        <Route
          path="/ChatApp"
          element={
            <MainApp
              currentLoggedUser={currentLoggedUser}
              LogoutUser={LogoutUser}
              handleOpenUploadFilesPanel={handleOpenUploadFilesPanel}
              inputFileDialogRef={inputFile}
              handleCloseUploadWindow={handleCloseUploadWindow}
              handleOpenUploadWindow={handleOpenUploadWindow}
              isUploadOpen={isUploadOpen}
              handleSetPreviewProfilePic={handleSetPreviewProfilePic}
              newPreviewProfilePic={newPreviewProfilePic}
              handleSetNewProfilePic={handleSetNewProfilePic}
              isConfirmRejectOpen={isConfirmRejectOpen}
              handleConfirmReject={handleConfirmReject}
              uploadPrevPicAnimation={uploadPrevPicAnimation}
              uploadNewProfPicAnimation={uploadNewProfPicAnimation}
              handleLogoutUser={handleLogoutUser}
              confirmLogoutPanel={confirmLogoutPanel}
            />
          }
        >
          <Route path="/ChatApp/Chats" element={<Chats />} />
          <Route path="/ChatApp/Friends" element={<Friends />} />
          <Route path="/ChatApp/Profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
