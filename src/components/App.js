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
import {
  collection,
  doc,
  endAt,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  startAt,
  where,
} from "firebase/firestore";
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
  const [currentClickedUser, setCurrentClickedUser] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // STAY LOGIN AFTER REFRESH OR REOPEN PAGE
  const [currentLoggedUser, setCurrentLoggedUser] = useState({});

  onAuthStateChanged(auth, (currentLoggedUser) => {
    setCurrentLoggedUser(currentLoggedUser);
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
      birthdate: null,
      phoneNumber: null,
      address: null,
      website: null,
      facebookNick: null,
      instagramNick: null,
      twitterNick: null,
      linkedinNick: null,
    };
    await setDoc(registerUserCollRef, registerUserPayload);
  };

  // REGISTER USER WITH EMAIL AND PASSWORD
  const [RegisterName, setRegisterName] = useState("");
  const [RegisterEmail, setRegisterEmail] = useState("");
  const [RegisterPassword, setRegisterPassword] = useState("");
  const [RegisterError, setRegisterError] = useState("");
  const [RegisterloadingAnimation, setRegisterLoadingAnimation] =
    useState(false);

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
  const [LoginEmail, setLoginEmail] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");
  const [LoginLoadingAnimation, setLoginLoadingAnimation] = useState(false);
  const [LoginError, setLoginError] = useState("");

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
  const [confirmLogoutPanel, setConfirmLogoutPanel] = useState(false);

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
    // setCurrentLoggedUserDatabase(null);
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

  // CHANGE FRIENDS MODE BETWEEN FRIENDS OR ADD FRIENDS
  const [mode, setMode] = useState("Friends");

  const handleCurrentModeFriends = () => {
    if (mode === "Friends") {
      setMode("AddFriends");
      setCurrentClickedUser("");
      setFoundUsers([]);
      setSearchUserValue("");
    } else if (mode === "AddFriends") {
      setMode("Friends");
      setCurrentClickedUser("");
      setFoundUsers([]);
      setSearchUserValue("");
    }
  };

  // NAVIGATE TO CHAT, FRIENDS OR PROFILE
  const navigateToOtherComponents = (to) => {
    if (to === "Chats") {
      navigate("/ChatApp/Chats");
      setCurrentClickedUser("");
      setFoundUsers([]);
      setSearchUserValue("");
      setMode("Friends");
      setAccInfoFirstName("");
      setAccInfoLastName("");
      setAccInfoMobileNumber("");
      setAccInfoBirthDate("");
      setAccInfoEmail("");
      setAccInfoWebsite("");
      setAccInfoAddress("");
      setFacebookUsername("");
      setTwitterUsername("");
      setInstagramUsername("");
      setLinkedinUsername("");
      setCurrentPasswordValue("");
      setNewPasswordValue("");
      setNewRepeatPasswordValue("");
    } else if (to === "Friends") {
      navigate("/ChatApp/Friends");
      setCurrentClickedUser("");
      setFoundUsers([]);
      setSearchUserValue("");
      setMode("Friends");
      setAccInfoFirstName("");
      setAccInfoLastName("");
      setAccInfoMobileNumber("");
      setAccInfoBirthDate("");
      setAccInfoEmail("");
      setAccInfoWebsite("");
      setAccInfoAddress("");
      setFacebookUsername("");
      setTwitterUsername("");
      setInstagramUsername("");
      setLinkedinUsername("");
      setCurrentPasswordValue("");
      setNewPasswordValue("");
      setNewRepeatPasswordValue("");
    } else if (to === "Profile") {
      navigate("/ChatApp/Profile");
      setCurrentClickedUser("");
      setFoundUsers([]);
      setSearchUserValue("");
      setMode("Friends");
      setAccInfoFirstName("");
      setAccInfoLastName("");
      setAccInfoMobileNumber("");
      setAccInfoBirthDate("");
      setAccInfoEmail("");
      setAccInfoWebsite("");
      setAccInfoAddress("");
      setFacebookUsername("");
      setTwitterUsername("");
      setInstagramUsername("");
      setLinkedinUsername("");
      setCurrentPasswordValue("");
      setNewPasswordValue("");
      setNewRepeatPasswordValue("");
    }
  };

  // CHANGE PROFILE PICTURE SYSTEM & CONFIRM REJECT CHANGES IN PROFILE PICTURE
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadPrevPicAnimation, setUploadPrevPicAnimation] = useState(false);
  const [uploadNewProfPicAnimation, setUploadNewProfPicAnimation] =
    useState(false);
  const [newPreviewProfilePic, setNewPreviewProfilePic] = useState(null);
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [isConfirmRejectOpen, setIsConfirmRejectOpen] = useState(false);
  const inputFile = useRef(null);

  const handleOpenUploadFilesPanel = async () => {
    await inputFile.current.click();
    handleSetPreviewProfilePic();
  };

  const handleSetPreviewProfilePic = async (e) => {
    const fileRef = ref(
      storage,
      "previewProfilePictures/" + currentLoggedUser.uid + ".png"
    );
    if (e.target.files[0]) {
      setUploadPrevPicAnimation(true);
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

  //SEARCH USERS SYSTEM
  const [searchUserValue, setSearchUserValue] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);

  const handleSearchUserInFriends = (e) => {
    setSearchUserValue(e.target.value);
    setCurrentClickedUser("");
  };
  const colRefSearchUsers = collection(db, "Users");
  const querySearchUsers = query(
    colRefSearchUsers,
    orderBy("name"),
    limit(10),
    startAt(searchUserValue.toLowerCase()),
    endAt(searchUserValue.toLowerCase() + "\uf8ff")
  );
  let foundUsersArray = [];
  useEffect(() => {
    if (searchUserValue !== "") {
      onSnapshot(querySearchUsers, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          foundUsersArray.push({ ...doc.data() });
        });
        setFoundUsers(foundUsersArray);
      });
    } else {
      setFoundUsers([]);
    }
  }, [searchUserValue]);

  const handleCurrentActiveUser = (user) => {
    setCurrentClickedUser(user);
  };

  // GET DATA FROM DATABASE CURRENT LOGGED USER
  const [currentLoggedUserDatabase, setCurrentLoggedUserDatabase] =
    useState(null);

  useEffect(() => {
    if (auth.currentUser) {
      const dataLoggedUserCollRef = collection(db, "Users");
      const dataLoggedUserQuery = query(
        dataLoggedUserCollRef,
        where("UID", "==", auth.currentUser.uid)
      );
      onSnapshot(dataLoggedUserQuery, (snapshot) => {
        let user = [];
        snapshot.docs.forEach((doc) => {
          user.push({ ...doc.data() });
        });
        setCurrentLoggedUserDatabase(user[0]);
      });
    }
  }, [currentLoggedUser]);

  // UPDATE PROFILE INFORMATIONS
  const [AccInfoFirstName, setAccInfoFirstName] = useState("");
  const [AccInfoLastName, setAccInfoLastName] = useState("");
  const [AccInfoMobileNumber, setAccInfoMobileNumber] = useState("");
  const [AccInfoBirthDate, setAccInfoBirthDate] = useState("");
  const [AccInfoEmail, setAccInfoEmail] = useState("");
  const [AccInfoWebsite, setAccInfoWebsite] = useState("");
  const [AccInfoAddress, setAccInfoAddress] = useState("");
  const [FacebookUsername, setFacebookUsername] = useState("");
  const [TwitterUsername, setTwitterUsername] = useState("");
  const [InstagramUsername, setInstagramUsername] = useState("");
  const [LinkedInUsername, setLinkedinUsername] = useState("");
  const [currentPasswordValue, setCurrentPasswordValue] = useState("");
  const [newPasswordValue, setNewPasswordValue] = useState("");
  const [newRepeatPasswordValue, setNewRepeatPasswordValue] = useState("");

  const handleProfileUpdateInformationsInputs = (input, e) => {
    if (input === "firstName") {
      setAccInfoFirstName(e.target.value);
    } else if (input === "lastName") {
      setAccInfoLastName(e.target.value);
    } else if (input === "mobileNumber") {
      setAccInfoMobileNumber(e.target.value);
    } else if (input === "birthdate") {
      setAccInfoBirthDate(e.target.value);
    } else if (input === "email") {
      setAccInfoEmail(e.target.value);
    } else if (input === "website") {
      setAccInfoWebsite(e.target.value);
    } else if (input === "address") {
      setAccInfoAddress(e.target.value);
    } else if (input === "facebookUsername") {
      setFacebookUsername(e.target.value);
    } else if (input === "twitterUsername") {
      setTwitterUsername(e.target.value);
    } else if (input === "instaUsername") {
      setInstagramUsername(e.target.value);
    } else if (input === "linkedinUsername") {
      setLinkedinUsername(e.target.value);
    } else if (input === "currentPass") {
      setCurrentPasswordValue(e.target.value);
    } else if (input === "newPassword") {
      setNewPasswordValue(e.target.value);
    } else if (input === "repeatNewPassword") {
      setNewRepeatPasswordValue(e.target.value);
    }
  };

  const updateProfileInformations = async () => {
    const updateUserInfoCollRef = doc(db, "Users", auth.currentUser.uid);
    const updateUserInfoPayload = {
      UID: auth.currentUser.uid,
      name: auth.currentUser.displayName.toLowerCase(),
      email: auth.currentUser.email,
      profilePhoto: auth.currentUser.photoURL,
      birthdate: AccInfoBirthDate,
      phoneNumber: AccInfoMobileNumber,
      address: AccInfoAddress,
      website: AccInfoWebsite,
      facebookNick: currentLoggedUserDatabase.facebookNick,
      instagramNick: currentLoggedUserDatabase.instagramNick,
      twitterNick: currentLoggedUserDatabase.twitterNick,
      linkedinNick: currentLoggedUserDatabase.linkedinNick,
    };
    await setDoc(updateUserInfoCollRef, updateUserInfoPayload);
  };

  const updateSocialsInformations = async () => {
    const updateSocialsUserInfoCollRef = doc(db, "Users", auth.currentUser.uid);
    const updateSocialsUserInfoPayload = {
      UID: auth.currentUser.uid,
      name: auth.currentUser.displayName.toLowerCase(),
      email: auth.currentUser.email,
      profilePhoto: auth.currentUser.photoURL,
      birthdate: currentLoggedUserDatabase.birthdate,
      phoneNumber: currentLoggedUserDatabase.phoneNumber,
      address: currentLoggedUserDatabase.address,
      website: currentLoggedUserDatabase.website,
      facebookNick: FacebookUsername,
      instagramNick: InstagramUsername,
      twitterNick: TwitterUsername,
      linkedinNick: LinkedInUsername,
    };
    await setDoc(updateSocialsUserInfoCollRef, updateSocialsUserInfoPayload);
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
              foundUsers={foundUsers}
              currentClickedUser={currentClickedUser}
              handleCurrentModeFriends={handleCurrentModeFriends}
              mode={mode}
              handleSearchUserInFriends={handleSearchUserInFriends}
              handleCurrentActiveUser={handleCurrentActiveUser}
              navigateToOtherComponents={navigateToOtherComponents}
              currentLoggedUserDatabase={currentLoggedUserDatabase}
              handleProfileUpdateInformationsInputs={
                handleProfileUpdateInformationsInputs
              }
              updateProfileInformations={updateProfileInformations}
              updateSocialsInformations={updateSocialsInformations}
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
