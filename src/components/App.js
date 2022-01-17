import React, { useEffect, useState } from "react";
import "../styles/App.css";
import { db, auth } from "./firebase-config";
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
  addDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import SignIn from "./SignInComponents/SignIn";
import MainApp from "./mainAppComponents/MainApp";
import { Route, Routes, useNavigate } from "react-router-dom";
import Chats from "./mainAppComponents/LeftPanelComponents/Chats";
import Friends from "./mainAppComponents/LeftPanelComponents/Friends";
import Profile from "./mainAppComponents/LeftPanelComponents/Profile";

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
  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  // STAY LOGIN AFTER REFRESH PAGE
  onAuthStateChanged(auth, (currUser) => {
    setCurrentUser(currUser);
  });

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
      name: auth.currentUser.displayName,
      email: auth.currentUser.email,
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

  // LOGOUT USER
  const LogoutUser = async () => {
    signOut(auth);
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
            <MainApp currentUser={currentUser} LogoutUser={LogoutUser} />
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
