import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "./LoginContext";

export default function Login() {
  const { setUserLogin } = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const notifyError = (msg) => {
    toast.error(msg);
  };

  const notifySuccess = (msg) => {
    toast.success(msg);
  };

  const validateEmail = (email) => {
    if (!emailRegex.test(email)) {
      notifyError("Invalid email format");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      fetch("/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            notifyError(data.error);
          } else {
            notifySuccess("Login successful!");
            localStorage.setItem("jwt", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setUserLogin(true);
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);
          notifyError("An error occurred while logging in.");
        });
    }
  };
  return (
    <div className="login">
      <div className="container">
        <div className="login-box">
          <div>
            <input
              className="main-input"
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <input
              className="main-input"
              type="password"
              name="password"
              id="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
          <button
            className="submit-btn main-input"
            id="submit"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
