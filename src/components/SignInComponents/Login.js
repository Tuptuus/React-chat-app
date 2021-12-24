import React from "react";
import "../../styles/Login.css";
import { Form, Spinner } from "react-bootstrap";
import facebook from "../../Images/Facebook_logo.png";
import google from "../../Images/Google_logo.png";

function Login(props) {
  return (
    <div className="Login_card">
      <p className="Login_title">
        Login to <span className="Login_title_appName">TupChat</span>
      </p>
      <div className="Login_card_inputs">
        <Form.Floating className="mb-3 Login_input_email">
          <Form.Control
            id="floatingInputCustom"
            type="email"
            placeholder="name@example.com"
            onChange={props.handleLoginEmail}
            value={props.LoginEmailValue}
          />
          <label htmlFor="floatingInputCustom">Email address</label>
        </Form.Floating>
        <Form.Floating className="Login_input_password">
          <Form.Control
            id="floatingPasswordCustom"
            type="password"
            placeholder="Password"
            onChange={props.handleLoginPassword}
            value={props.LoginPasswordValue}
          />
          <label htmlFor="floatingPasswordCustom">Password</label>
        </Form.Floating>
      </div>
      <span className="Login_error">{props.LoginErrorMessage}</span>
      <div className="Login_buttons">
        <button onClick={props.handleLoginUser} className="LoginUser_button">
          Login
        </button>
        {props.LoginLoadingAnimation === true ? (
          <Spinner
            animation="border"
            variant="danger"
            className="LoginLoadingAnimation"
          />
        ) : null}
        <p className="Login_switchToRegister">
          If you are new user{" "}
          <a onClick={props.handleChangeSignMode} href="">
            Register
          </a>
        </p>
      </div>
      <p className="Login_Or">Or</p>
      <div className="Login_anotherOptions">
        <div
          onClick={props.SignInUserWithFacebook}
          className="Login_facebookOption"
        >
          <div className="Login_facebook_logo">
            <img className="Login_facebook_logo_img" src={facebook} alt="" />
          </div>
          <p className="Login_facebook_continue">Continue with Facebook</p>
        </div>
        <div
          onClick={props.SignInUserWithGoogle}
          className="Login_googleOption"
        >
          <div className="Login_google_logo">
            <img src={google} alt="" className="Login_google_logo_img" />
          </div>
          <p className="Login_google_continue">Continue with Google</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
