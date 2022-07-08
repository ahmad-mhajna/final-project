import React, { useEffect, useRef, useState } from "react";
import { apiInstance2 } from "../../../api/api";
import "./login.css";
import Button from "../../Button/Button";
import Input from "../../input/Input";
import { Redirect } from "react-router-dom";

function Login({ setUser }) {
  const initaluser = {
    username: "",
    password: "",
    cart: [],
    ISadmin: false,
  };
  let timerID;
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [register, setRegister] = useState(false);
  const [userDateBase, setDataBase] = useState([]);
  const [user, addInfo] = useState(initaluser);
  const spinnerRef = useRef();
  const getData = async () => {
    try {
      const response = await apiInstance2.get("");
      setDataBase(response.data);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const addUser = async () => {
    spinnerRef.current.classList.remove("hidden");
    try {
      await apiInstance2.post("", user);
      addInfo(initaluser);
      getData();
    } catch (e) {
      console.error(e);
    } finally {
      spinnerRef.current.classList.add("hidden");
    }
  };

  const errors = {
    uname: "Invalid Username",
    pass: "Invalid Password",
    exist: "User Already Exists",
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let { uname, pass } = document.forms[0];

    const userData = userDateBase.find((user) => user.username === uname.value);

    if (userData) {
      if (userData.password !== pass.value) {
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
        setUser(userData);
      }
    } else {
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
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
          <form
            action="/"
            onSubmit={(e) => {
              e.preventDefault();
              if (
                userDateBase.find(
                  (tempUser) => tempUser.username === user.username
                ) === undefined
              ) {
                addUser();
                setRegister(false);
              } else {
                clearTimeout(timerID);
                setErrorMessages({ name: "exists", message: errors.exist });
                timerID = setTimeout(() => {
                  setErrorMessages({});
                }, 3000);
              }
            }}
          >
            <Input
              label="Name"
              placeholder="Enter Name..."
              onChange={(event) => {
                addInfo({
                  ...user,
                  username: event.target.value,
                });
              }}
            />
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
            {renderErrorMessage("exists")}
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
