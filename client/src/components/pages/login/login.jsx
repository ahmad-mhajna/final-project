import React, { useEffect, useRef, useState } from "react";
import { apiInstance } from "../../../api/api";
import "./login.css";
import Button from "../../Button/Button";
import Input from "../../input/Input";
import validator from "validator";
import { Redirect } from "react-router-dom";
function Login({ setUser }) {
  const initaluser = {
    username: "",
    email: "",
    age: 18,
    password: "",
    cart: [],
  };
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [register, setRegister] = useState(false);
  const [user, addInfo] = useState(initaluser);
  const [token, gettoken] = useState("");
  const [errormessage, setmessage] = useState("");
  const spinnerRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await apiInstance.post("/users/login", user);
      gettoken(data.token);
      window.localStorage.setItem("token", data.token);
      setIsSubmitted(true);
      apiInstance.defaults.headers = {
        AUTHORIZATION: `Bearer ${data.token}`,
      };
      setUser(data.user);
    } catch (error) {
      setmessage(error.response.data);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const { data } = await apiInstance.post("/users", user);
      gettoken(data.token);
      window.localStorage.setItem("token", data.token);
      setIsSubmitted(true);
      apiInstance.defaults.headers = {
        AUTHORIZATION: `Bearer ${data.token}`,
      };
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <Input
            label="Username"
            placeholder="Enter Username..."
            onChange={(event) => {
              addInfo({
                ...user,
                username: event.target.value,
              });
            }}
          />
        </div>
        <div className="input-container">
          <Input
            label="Password"
            placeholder="Enter password..."
            onChange={(event) => {
              addInfo({
                ...user,
                password: event.target.value,
              });
            }}
          />
        </div>
        <span className="error">{errormessage}</span>
        <div className="button-container">
          <Button type="submit" text="Submit" />
        </div>
      </form>
      <div>
        Don't Have an Account ?{"   "}
        <Button
          type="button"
          text="Register"
          onClick={() => {
            setRegister(true);
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="app">
      {!register && (
        <div className="login-form">
          <div className="title">Sign In</div>
          {isSubmitted ? <Redirect to="/" /> : renderForm}
        </div>
      )}
      {register && (
        <div className="registerForm">
          <h2>Register</h2>
          <form action="/" onSubmit={handleRegister}>
            <Input
              label="Username"
              placeholder="Enter Username..."
              onChange={(event) => {
                addInfo({
                  ...user,
                  username: event.target.value,
                });
              }}
            />
            <Input
              label="email"
              placeholder="Enter email..."
              onChange={(event) => {
                addInfo({
                  ...user,
                  email: event.target.value,
                });
              }}
            />
            {!validator.isEmail(user.email) && user.email !== "" && (
              <span className="error">Email is invalid</span>
            )}
            <Input
              label="age"
              placeholder="Enter age..."
              type="number"
              onChange={(event) => {
                addInfo({
                  ...user,
                  age: +event.target.value,
                });
              }}
            />
            {typeof user.age !== "number" && (
              <span className="error">Age should be a number</span>
            )}
            <Input
              label="password"
              placeholder="Enter password..."
              onChange={(event) => {
                addInfo({
                  ...user,
                  password: event.target.value,
                });
              }}
            />
            {user.password.length < 7 && user.password !== "" && (
              <span className="error">
                Password should be longer than 7 characters
              </span>
            )}
            <Button type="submit" text="Submit" />
            <Button
              type="button"
              text="back"
              onClick={() => {
                setRegister(false);
              }}
            />
          </form>
        </div>
      )}
      <div className="spinner hidden" ref={spinnerRef}>
        <div className="loader">Loading...</div>
      </div>
    </div>
  );
}

export default Login;
