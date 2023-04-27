import React, { useContext } from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { Context } from "./LoginContext";

export default function Navbar({ login }) {
  const { setModalOpen } = useContext(Context);
  const token = localStorage.getItem("jwt");

  return (
    <header>
      <div className="container">
        <div className="nav">
          <Link to="">
            <img className="nav-img" src={logo} alt="insta logo" />{" "}
          </Link>
          <ul className="nav-list">
            {login || token ? (
              <>
                <Link to="/profil">
                  <li className="nav-item">Profil</li>
                </Link>
                <Link to="/addpost">Post</Link>
                <Link to="/followingpost" className="fallow-link">
                  My Following
                </Link>
                <Link to={""}>
                  <button
                    className="primary-btn"
                    onClick={() => setModalOpen(true)}
                  >
                    Log out
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/Registration">
                  <li className="nav-item">Registration</li>
                </Link>
                <Link to="/login">
                  <li className="nav-item">Login</li>
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
