import React, { useState } from "react";
import register from "../images/Instagram_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Registration() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const notify = (msg, isError) => toast[isError ? "error" : "success"](msg);

  const postData = () => {
    if (!emailRegex.test(email)) {
      notify("Invalid email", true);
      return;
    }
    fetch("/Registration", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, userName, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        notify(data.error || data.massage, !!data.error);
        if (!data.error) navigate("/login");
      });
  };

  return (
    <div className="registration">
      <div className="container">
        <div className="registration-box">
          <img className="registration-logo" src={register} />
          <p className="registration-text">Register to use Instagram</p>
          <div>
            <input
              className="main-input"
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className="main-input"
              type="text"
              name="name"
              id="name"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              className="main-input"
              type="text"
              name="username"
              id="username"
              placeholder="Your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            className="submit-btn main-input"
            id="submit"
            value="Registration"
            onClick={postData}
          />
        </div>
      </div>
    </div>
  );
}
