import React from "react";
import "../../styles/SignIn.css";
import Register from "./Register";
import Login from "./Login";

function SignIn(props) {
  return (
    <div className="Sign_container">
      <div className="Sign_card">
        <div className="Sign_Card_leftSide">
          <p className="leftSide_welcome">Welcome to</p>
          <p className="leftSide_appName">TupChat</p>
        </div>
        <div className="Sign_Card_rightSide">
          {props.signMode === "register" ? (
            <Register
              RegisterNameValue={props.RegisterNameValue}
              RegisterEmailValue={props.RegisterEmailValue}
              RegisterPasswordValue={props.RegisterPasswordValue}
              handleRegisterUser={props.handleRegisterUser}
              handleRegisterName={props.handleRegisterName}
              handleRegisterEmail={props.handleRegisterEmail}
              handleRegisterPassword={props.handleRegisterPassword}
              handleChangeSignMode={props.handleChangeSignMode}
              RegisterErrorMessage={props.RegisterErrorMessage}
              RegisterLoadingAnimation={props.RegisterLoadingAnimation}
              SignInUserWithGoogle={props.SignInUserWithGoogle}
              SignInUserWithFacebook={props.SignInUserWithFacebook}
              handleEnterRegisterPress={props.handleEnterRegisterPress}
            />
          ) : (
            <Login
              handleLoginEmail={props.handleLoginEmail}
              handleLoginPassword={props.handleLoginPassword}
              handleLoginUser={props.handleLoginUser}
              handleChangeSignMode={props.handleChangeSignMode}
              LoginEmailValue={props.LoginEmailValue}
              LoginPasswordValue={props.LoginPasswordValue}
              LoginErrorMessage={props.LoginErrorMessage}
              LoginLoadingAnimation={props.LoginLoadingAnimation}
              SignInUserWithGoogle={props.SignInUserWithGoogle}
              SignInUserWithFacebook={props.SignInUserWithFacebook}
              handleEnterLoginPress={props.handleEnterLoginPress}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
