import React, { useEffect, useState } from "react";
import userpic from "../images/user.png";
import { useParams } from "react-router-dom";

export default function UserProfil() {
  const { userid } = useParams();
  const [isFollow, setisFollow] = useState(false);
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);

  const userFollow = (follow) => {
    fetch(`/${follow}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ followId: userid }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setisFollow(true);
      });
  };

  const userUnfollow = (unfollow) => {
    fetch(`/${unfollow}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ followId: userid }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setisFollow(false);
      });
  };

  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setUser(result.user);
        setPosts(result.post);
        if (result.user.followers.includes(JSON.parse(localStorage.getItem("user"))._id)) {
          setisFollow(true);
        }
      });
  }, [isFollow]);

  return (
    <div className="profil">
      <div className="prifile-inner">
        <div className="prifile-img">
          <img src={user.Photo || userpic} alt="" width="160" height="160" />
        </div>
        <div className="data">
          <div className="fallow-section">
            <h1>{user.name}</h1>
            <button className="follow-btn" onClick={() => isFollow ? userUnfollow("unfollow") : userFollow("follow")}>
              {isFollow ? "Unfollow" : "Follow"}
            </button>
          </div>
          <div className="info">
            <p>{posts.length} posts</p>
            <p>{user.followers ? user.followers.length : "0"} followers</p>
            <p>{user.following ? user.following.length : "0"} following</p>
          </div>
        </div>
      </div>
      <br /> <br />
      <div className="profil-post">
        {posts.map((pic) => (
          <img key={pic._id} src={pic.photo} className="profl-pic delete-img"></img>
        ))}
      </div>
    </div>
  );
}
