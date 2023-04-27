import React, { useEffect, useState } from "react";
import userpic from "../images/user.png";
import PostDetail from "./PostDetail";
import ProfilePic from "./Profilepic";

export default function Profil() {

  // let userpic =  "../images/user.png"
  const [pic, setPic] = useState([]);
  const [modal, setModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");
  const [changePic, setChangePic] = useState(false);

  // ----------------------------
  const modalDetails = (posts) => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
      setPosts(posts);
      // console.log(list);
    }
  };
  const changeProfile = () => {
    if (changePic) {
      setChangePic(false);
    } else {
      setChangePic(true);
    }
  };

  useEffect(() => {
    fetch(
      `https://inst-back-production.up.railway.app/user/${
        JSON.parse(localStorage.getItem("user"))._id
      }`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPic(result.post);
        setUser(result.user)
        console.log(pic);
      });
  }, []);
  return (
    <div className="profil">
      <div className="prifile-inner">
        <div className="prifile-img">
          <img
            style={{ cursor: "pointer" }}
            onClick={changeProfile}
            src={user.Photo? user.Photo: userpic}
            alt=""
            width="160"
            height="160"
          />
        </div>
        <div className="data">
          <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
          <div className="info">
            <p>{pic? pic.length:"0" } posts</p>
            <p>{user.followers? user.followers.length : "0"} fallowers</p>
            <p>{user.following? user.following.length : "0"} following</p>
          </div>
        </div>
      </div>
      <br /> <br />
      <div className="profil-post">
        {pic.map((pics) => {
          return (
            <img
              key={pics._id}
              src={pics.photo}
              onClick={() => {
                modalDetails(pics);
              }}
              className="profl-pic delete-img"
            ></img>
          );
        })}
      </div>
      {modal && <PostDetail list={posts} modalDetails={modalDetails} />}
      {changePic && <ProfilePic changeProfile={changeProfile} />}
    </div>
  );
}
