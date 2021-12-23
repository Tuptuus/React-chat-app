import React from "react";
import "../styles/Register.css";
import { FloatingLabel, Form } from "react-bootstrap";
import facebook from "../Images/Facebook_logo.png";
import google from "../Images/Google_logo.png";

function Register(props) {
  return (
    <div className="Register_card">
      <p className="Register_title">
        Register to <span className="title_appName">TupChat</span>
      </p>
      <div className="Register_card_inputs">
        <Form.Floating className="mb-3 register_input_name">
          <Form.Control
            id="floatingInputCustom"
            type="text"
            placeholder="User Name"
          />
          <label htmlFor="floatingInputCustom">Name</label>
        </Form.Floating>
        <Form.Floating className="mb-3 register_input_email">
          <Form.Control
            id="floatingInputCustom"
            type="email"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInputCustom">Email address</label>
        </Form.Floating>
        <Form.Floating className="register_input_password">
          <Form.Control
            id="floatingPasswordCustom"
            type="password"
            placeholder="Password"
          />
          <label htmlFor="floatingPasswordCustom">Password</label>
        </Form.Floating>
      </div>
      <div className="Register_buttons">
        <button className="RegisterUser_button">Register</button>
        <p className="Register_switchToLogin">
          You have account?{" "}
          <a onClick={props.handleChangeSignMode} href="">
            LogIn
          </a>
        </p>
      </div>
      <p className="Register_Or">Or</p>
      <div className="Register_anotherOptions">
        <div className="Register_facebookOption">
          <div className="facebook_logo">
            <img className="facebook_logo_img" src={facebook} alt="" />
          </div>
          <p className="facebook_continue">Continue with Facebook</p>
        </div>
        <div className="Register_googleOption">
          <div className="google_logo">
            <img src={google} alt="" className="google_logo_img" />
          </div>
          <p className="google_continue">Continue with Google</p>
        </div>
      </div>
    </div>
  );
}

export default Register;
