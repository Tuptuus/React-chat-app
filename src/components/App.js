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
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";
import {
  addDoc,
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
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import Chats from "./mainAppComponents/LeftPanelComponents/Chats";
import Friends from "./mainAppComponents/LeftPanelComponents/Friends";
import Profile from "./mainAppComponents/LeftPanelComponents/Profile";
import defaultProfilePic from "../Images/defaultProfilePic.png";
import { useRef } from "react";
import { stringify } from "@firebase/util";

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
      setCurrentPasswordValue("");
      setNewPasswordValue("");
      setNewRepeatPasswordValue("");
    } else if (to === "Friends") {
      navigate("/ChatApp/Friends");
      setCurrentClickedUser("");
      setFoundUsers([]);
      setSearchUserValue("");
      setMode("Friends");
      setCurrentPasswordValue("");
      setNewPasswordValue("");
      setNewRepeatPasswordValue("");
    } else if (to === "Profile") {
      navigate("/ChatApp/Profile");
      setCurrentClickedUser("");
      setFoundUsers([]);
      setSearchUserValue("");
      setMode("Friends");
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

  useEffect(() => {
    let firstName = "";
    let lastName = "";
    if (currentLoggedUserDatabase) {
      if (currentLoggedUserDatabase.name) {
        firstName =
          currentLoggedUserDatabase.name[0].toUpperCase() +
          currentLoggedUserDatabase.name.slice(
            1,
            currentLoggedUserDatabase.name.indexOf(" ")
          );
        lastName =
          currentLoggedUserDatabase.name[
            currentLoggedUserDatabase.name.indexOf(" ") + 1
          ].toUpperCase() +
          currentLoggedUserDatabase.name.slice(
            currentLoggedUserDatabase.name.indexOf(" ") + 2
          );
      }
      setAccInfoMobileNumber(currentLoggedUserDatabase.phoneNumber);
      setAccInfoBirthDate(currentLoggedUserDatabase.birthdate);
      setAccInfoEmail(currentLoggedUserDatabase.email);
      setAccInfoWebsite(currentLoggedUserDatabase.website);
      setAccInfoAddress(currentLoggedUserDatabase.address);
      setFacebookUsername(currentLoggedUserDatabase.facebookNick);
      setTwitterUsername(currentLoggedUserDatabase.twitterNick);
      setInstagramUsername(currentLoggedUserDatabase.instagramNick);
      setLinkedinUsername(currentLoggedUserDatabase.linkedinNick);
      setAccInfoFirstName(firstName);
      setAccInfoLastName(lastName);
    }
  }, [currentLoggedUserDatabase]);

  // UPDATE PROFILE INFORMATIONS
  const [updateProfileError, setUpdateProfileError] = useState(null);
  const [saveUpdateAnimation, setSaveUpdateAnimation] = useState(false);
  const [updatePasswordError, setUpdatePasswordError] = useState(null);
  const [updatePasswordAnimation, setUpdatePasswordAnimation] = useState(false);

  const handleProfileUpdateInformationsInputs = (input, e) => {
    if (input === "firstName") {
      setAccInfoFirstName(e.target.value);
    } else if (input === "lastName") {
      setAccInfoLastName(e.target.value);
    } else if (input === "mobileNumber") {
      if (e.target.value.length >= 0 && e.target.value.length <= 9) {
        setAccInfoMobileNumber(e.target.value);
      }
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
    setSaveUpdateAnimation(true);
    let firstName = "";
    let lastName = "";
    if (AccInfoFirstName) {
      firstName =
        AccInfoFirstName[0].toLowerCase() +
        AccInfoFirstName.slice(1, AccInfoFirstName.indexOf(" ") + 50);
    }
    if (AccInfoLastName) {
      lastName =
        AccInfoLastName[AccInfoLastName.indexOf(" ") + 1].toLowerCase() +
        AccInfoLastName.slice(AccInfoLastName.indexOf(" ") + 2);
    }
    const updateUserInfoCollRef = doc(db, "Users", auth.currentUser.uid);
    const updateUserInfoPayload = {
      UID: auth.currentUser.uid,
      name: firstName + " " + lastName,
      email: AccInfoEmail,
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
    if (AccInfoEmail === "") {
      setSaveUpdateAnimation(false);
      setUpdateProfileError("Email field is required");
      setTimeout(() => {
        setUpdateProfileError("");
      }, 3000);
    } else if (AccInfoFirstName === "" || AccInfoLastName === "") {
      setSaveUpdateAnimation(false);
      setUpdateProfileError("Your first name and last name are required");
      setTimeout(() => {
        setUpdateProfileError("");
      }, 3000);
    } else if (AccInfoEmail !== "") {
      updateEmail(auth.currentUser, AccInfoEmail)
        .then(async () => {
          await setDoc(updateUserInfoCollRef, updateUserInfoPayload);
          setSaveUpdateAnimation(false);
        })
        .catch((error) => {
          if (error.code === "auth/invalid-email") {
            setSaveUpdateAnimation(false);
            setUpdateProfileError("Invalid Email");
            setTimeout(() => {
              setUpdateProfileError("");
            }, 3000);
          } else if (error.code === "auth/email-already-in-use") {
            setSaveUpdateAnimation(false);
            setUpdateProfileError("This email is alredy in use");
            setTimeout(() => {
              setUpdateProfileError("");
            }, 3000);
          } else if (error.code === "auth/requires-recent-login") {
            setSaveUpdateAnimation(false);
            setUpdateProfileError("To update email you need to relogin");
          }
        });
    }
  };

  const updateProfilePassword = () => {
    setUpdatePasswordAnimation(true);
    if (currentPasswordValue !== "") {
      const credential = EmailAuthProvider.credential(
        "tup@gmail.com",
        currentPasswordValue
      );
      reauthenticateWithCredential(auth.currentUser, credential)
        .then(() => {
          if (
            newPasswordValue === newRepeatPasswordValue &&
            newPasswordValue !== "" &&
            newRepeatPasswordValue !== ""
          ) {
            updatePassword(auth.currentUser, newPasswordValue)
              .then(() => {
                setUpdatePasswordAnimation(false);
                setCurrentPasswordValue("");
                setNewPasswordValue("");
                setNewRepeatPasswordValue("");
                setUpdatePasswordError("Correctly changed password");
                setTimeout(() => {
                  setUpdatePasswordError("");
                }, 3000);
              })
              .catch((error) => {
                if (error.code === "auth/weak-password") {
                  setUpdatePasswordAnimation(false);
                  setUpdatePasswordError("To weak password");
                  setTimeout(() => {
                    setUpdatePasswordError("");
                  }, 3000);
                }
              });
          } else if (newPasswordValue !== newRepeatPasswordValue) {
            setUpdatePasswordAnimation(false);
            setUpdatePasswordError("Passwords are not the same");
            setTimeout(() => {
              setUpdatePasswordError("");
            }, 3000);
          } else if (
            currentPasswordValue !== "" ||
            newPasswordValue !== "" ||
            newRepeatPasswordValue !== ""
          ) {
            setUpdatePasswordAnimation(false);
            setUpdatePasswordError("You need to refill all fields");
            setTimeout(() => {
              setUpdatePasswordError("");
            }, 3000);
          }
        })
        .catch((error) => {
          if (error.code === "auth/wrong-password") {
            setUpdatePasswordAnimation(false);
            setUpdatePasswordError("Wrong password");
            setTimeout(() => {
              setUpdatePasswordError("");
            }, 3000);
          } else if (error.code === "auth/too-many-requests") {
            setUpdatePasswordAnimation(false);
            setUpdatePasswordError("To many attempts, please try again later");
            setTimeout(() => {
              setUpdatePasswordError("");
            }, 3000);
          }
        });
    } else if (
      currentPasswordValue === "" ||
      newPasswordValue === "" ||
      newRepeatPasswordValue === ""
    ) {
      setUpdatePasswordAnimation(false);
      setUpdatePasswordError("You need to refill all fields");
      setTimeout(() => {
        setUpdatePasswordError("");
      }, 3000);
    }
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

  // ADD FRIENDS AND FRIENDS REQUESTS SYSTEM
  const [friendRequestFrom, setFriendRequestFrom] = useState([]);
  const [friendActionMode, setFriendActionMode] = useState("Add");
  const [notificationFriendRequest, setNotificationFriendRequest] =
    useState(false);
  const [friendsRequestPanel, setFriendsRequestPanel] = useState(false);

  useEffect(() => {
    let request = "";
    let friendRequests = [];
    if (auth.currentUser) {
      const getRequestRef = collection(
        db,
        "Users",
        auth.currentUser.uid,
        "friendsRequests"
      );
      const getRequestsQuery = query(
        getRequestRef,
        where("to", "==", auth.currentUser.uid)
      );
      onSnapshot(getRequestsQuery, (snapshot) => {
        snapshot.docs.forEach(async (doc) => {
          request = { ...doc.data() };
          if (request.to === auth.currentUser.uid) {
            setNotificationFriendRequest(true);
            await friendRequests.push(request.from);
            if (friendRequests.length !== 0) {
              await setFriendRequestFrom(friendRequests);
            }
          }
        });
      });
    }
  }, [currentLoggedUser]);

  // console.log(friendRequestFrom);

  useEffect(() => {
    if (currentClickedUser) {
      setFriendActionMode("Add");
      const getRequestRef = collection(
        db,
        "Users",
        auth.currentUser.uid,
        "friendsRequests"
      );
      const getRequestsQuery = query(
        getRequestRef,
        where("to", "==", currentClickedUser.UID)
      );
      const getRequestsQuery2 = query(
        getRequestRef,
        where("from", "==", currentClickedUser.UID)
      );
      onSnapshot(getRequestsQuery, (snapshot) => {
        let request = "";
        snapshot.docs.forEach((doc) => {
          request = { ...doc.data() };
          if (request.to === currentClickedUser.UID) {
            setFriendActionMode("requestSend");
          }
        });
      });
      onSnapshot(getRequestsQuery2, (snapshot) => {
        let request = "";
        snapshot.docs.forEach((doc) => {
          request = { ...doc.data() };
          if (request.from === currentClickedUser.UID) {
            setFriendActionMode("Waiting");
          }
        });
      });
    }
  }, [currentClickedUser]);

  const addToFriendsSystem = async (id) => {
    const collectionRef = collection(
      db,
      "Users",
      auth.currentUser.uid,
      "friendsRequests"
    );
    const collectionRef2 = collection(
      db,
      "Users",
      currentClickedUser.UID,
      "friendsRequests"
    );
    const payload = { from: auth.currentUser.uid, to: id };
    await addDoc(collectionRef, payload);
    await addDoc(collectionRef2, payload);
  };

  const handleFriendsRequestPanel = () => {
    if (friendsRequestPanel === false) {
      setFriendsRequestPanel(true);
    } else if (friendsRequestPanel === true) {
      setFriendsRequestPanel(false);
    }
  };

  useEffect(() => {
    if (friendRequestFrom) {
      console.log(friendRequestFrom.map((item) => console.log(item)));
    }
  });
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
              AccInfoMobileNumber={AccInfoMobileNumber}
              AccInfoBirthDate={AccInfoBirthDate}
              AccInfoEmail={AccInfoEmail}
              AccInfoWebsite={AccInfoWebsite}
              AccInfoAddress={AccInfoAddress}
              FacebookUsername={FacebookUsername}
              TwitterUsername={TwitterUsername}
              InstagramUsername={InstagramUsername}
              LinkedInUsername={LinkedInUsername}
              AccInfoFirstName={AccInfoFirstName}
              AccInfoLastName={AccInfoLastName}
              updateProfileError={updateProfileError}
              saveUpdateAnimation={saveUpdateAnimation}
              updateProfilePassword={updateProfilePassword}
              updatePasswordAnimation={updatePasswordAnimation}
              updatePasswordError={updatePasswordError}
              currentPasswordValue={currentPasswordValue}
              newPasswordValue={newPasswordValue}
              newRepeatPasswordValue={newRepeatPasswordValue}
              addToFriendsSystem={addToFriendsSystem}
              friendActionMode={friendActionMode}
              notificationFriendRequest={notificationFriendRequest}
              handleFriendsRequestPanel={handleFriendsRequestPanel}
              friendsRequestPanel={friendsRequestPanel}
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
