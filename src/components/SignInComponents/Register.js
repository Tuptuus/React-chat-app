import React from "react";
import "../../styles/Register.css";
import { Form, Spinner } from "react-bootstrap";
import facebook from "../../Images/Facebook_logo.png";
import google from "../../Images/Google_logo.png";

function Register(props) {
  return (
    <div className="Register_card">
      <p className="Register_title">
        Register to <span className="Register_title_appName">TupChat</span>
      </p>
      <div className="Register_card_inputs">
        <Form.Floating className="mb-3 register_input_name">
          <Form.Control
            onChange={props.handleRegisterName}
            id="floatingNameCustom"
            type="text"
            placeholder="User Name"
            value={props.RegisterNameValue}
          />
          <label htmlFor="floatingInputCustom">First Name and Surname</label>
        </Form.Floating>
        <Form.Floating className="mb-3 register_input_email">
          <Form.Control
            onChange={props.handleRegisterEmail}
            id="floatingInputCustom"
            type="email"
            placeholder="name@example.com"
            value={props.RegisterEmailValue}
          />
          <label htmlFor="floatingInputCustom">Email address</label>
        </Form.Floating>
        <Form.Floating className="register_input_password">
          <Form.Control
            onChange={props.handleRegisterPassword}
            id="floatingPasswordCustom"
            type="password"
            placeholder="Password"
            value={props.RegisterPasswordValue}
          />
          <label htmlFor="floatingPasswordCustom">Password</label>
        </Form.Floating>
      </div>
      <span className="Register_error">{props.RegisterErrorMessage}</span>
      <div className="Register_buttons">
        <button
          className="RegisterUser_button"
          onClick={props.handleRegisterUser}
        >
          Register
        </button>
        {props.RegisterLoadingAnimation === true ? (
          <Spinner
            animation="border"
            variant="danger"
            className="RegisterLoadingAnimation"
          />
        ) : null}
        <p className="Register_switchToLogin">
          You have account?{" "}
          <a onClick={props.handleChangeSignMode} href="">
            LogIn
          </a>
        </p>
      </div>
      <p className="Register_Or">Or</p>
      <div className="Register_anotherOptions">
        <div
          onClick={props.SignInUserWithFacebook}
          className="Register_facebookOption"
        >
          <div className="Register_facebook_logo">
            <img className="Register_facebook_logo_img" src={facebook} alt="" />
          </div>
          <p className="Register_facebook_continue">Continue with Facebook</p>
        </div>
        <div
          onClick={props.SignInUserWithGoogle}
          className="Register_googleOption"
        >
          <div className="Register_google_logo">
            <img src={google} alt="" className="Register_google_logo_img" />
          </div>
          <p className="Register_google_continue">Continue with Google</p>
        </div>
      </div>
    </div>
  );
}

export default Register;
