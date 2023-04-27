import React, { createContext, useState } from "react";
import "./App.css";
import "../src/css/main.css";
import Navbar from "./components/Navbar";
import Home from "./components/home";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Profil from "./components/Profil";
import Addpost from "./components/addpost";
import { Context } from "./components/LoginContext";
import UserProfil from "./components/userProfil"
import Modal from "./components/modal";
import FollowingPost from "./components/followingpost";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";


// ------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------
function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <BrowserRouter>
      <div className="App">
        <Context.Provider value={{ setUserLogin, setModalOpen }}>
          <Navbar login={userLogin} />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/registration" element={<Registration />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route exact path="/profil" element={<Profil />}></Route>
            <Route path="/addpost" element={<Addpost />}></Route>
            <Route path="/profil/:userid" element={<UserProfil />}></Route>
            <Route path="/followingpost" element={<FollowingPost />}></Route>
          </Routes>
          <ToastContainer theme="dark" />

          {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
        </Context.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
