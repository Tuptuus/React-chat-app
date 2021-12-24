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
import SignIn from "./SignInComponents/SignIn";

function App() {
  const [currentPage, setcurrentPage] = useState("signIn");
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

  onAuthStateChanged(auth, (currUser) => {
    setCurrentUser(currUser);
  });

  useEffect(() => {
    setcurrentPage(window.localStorage.getItem("currentPage"));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

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

  const RegisterUser = async () => {
    if (
      RegisterName !== "" &&
      RegisterEmail !== "" &&
      RegisterPassword !== ""
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
        setRegisterName("");
        setRegisterEmail("");
        setRegisterPassword("");
        setRegisterError("");
        setRegisterLoadingAnimation(false);
        setcurrentPage("mainApp");
      } catch (error) {
        if (error.code === "auth/invalid-email") {
          setRegisterError("Invalid Email");
          setTimeout(() => {
            setRegisterError("");
          }, 2000);
          setRegisterLoadingAnimation(false);
        } else if (error.code === "auth/email-already-in-use") {
          setRegisterError("This email is already in use");
          setTimeout(() => {
            setRegisterError("");
          }, 2000);
          setRegisterLoadingAnimation(false);
        } else if (error.code === "auth/weak-password") {
          setRegisterError("Too weak password");
          setTimeout(() => {
            setRegisterError("");
          }, 2000);
          setRegisterLoadingAnimation(false);
        }
      }
    } else {
      setRegisterError("Fill in all data");
      setTimeout(() => {
        setRegisterError("");
      }, 2000);
    }
  };

  const LoginUser = async () => {
    if (LoginEmail !== "" && LoginPassword !== "") {
      try {
        setLoginLoadingAnimation(true);
        await signInWithEmailAndPassword(auth, LoginEmail, LoginPassword);
        setLoginEmail("");
        setLoginPassword("");
        setLoginLoadingAnimation(false);
        setcurrentPage("mainApp");
      } catch (error) {
        console.log(error.code);
        if (error.code === "auth/wrong-password") {
          setLoginError("Invalid Password");
          setTimeout(() => {
            setLoginError("");
          }, 2000);
          setLoginLoadingAnimation(false);
        } else if (error.code === "auth/user-not-found") {
          setLoginError("User not found");
          setTimeout(() => {
            setLoginError("");
          }, 2000);
          setLoginLoadingAnimation(false);
        } else if (error.code === "auth/too-many-requests") {
          setLoginError("Try again later");
          setTimeout(() => {
            setLoginError("");
          }, 2000);
          setLoginLoadingAnimation(false);
        } else if (error.code === "auth/invalid-email") {
          setLoginError("Invalid Email");
          setTimeout(() => {
            setLoginError("");
          }, 2000);
          setLoginLoadingAnimation(false);
        }
      }
    } else {
      setLoginError("Fill in all data");
      setTimeout(() => {
        setLoginError("");
      }, 2000);
    }
  };

  const SignInUserWithGoogle = async () => {
    try {
      const GoogleProvider = new GoogleAuthProvider();
      await signInWithPopup(auth, GoogleProvider);
      setcurrentPage("mainApp");
      console.log(auth.currentUser);
    } catch (error) {
      console.log(error);
    }
  };
  const SignInUserWithFacebook = async () => {
    try {
      const facebookProvider = new FacebookAuthProvider();
      await signInWithPopup(auth, facebookProvider);
      setcurrentPage("mainApp");
      console.log(auth.currentUser);
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/account-exists-with-different-credential") {
        setLoginError("account exists with different credential");
        setRegisterError("account exists with different credential");
        setTimeout(() => {
          setLoginError("");
          setRegisterError("");
        }, 2000);
      }
    }
  };

  const LogoutUser = async () => {
    signOut(auth);
    setcurrentPage("signIn");
    window.localStorage.setItem("currentPage", "signIn");
  };

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
  return (
    <div className="App">
      {currentPage === "signIn" ? (
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
        />
      ) : (
        <p>
          główna {currentUser.displayName}{" "}
          <button onClick={LogoutUser}>logout</button>
        </p>
      )}
    </div>
  );
}

export default App;
