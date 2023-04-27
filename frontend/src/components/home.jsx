import React, { useEffect, useState } from "react";
import userpic from "../images/user.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [modal, setModal] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) navigate("./Registration");

    fetch("https://inst-back-production.up.railway.app/allposts", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.log(err));
  }, []);

  const modalComment = (posts) => {
    setModal(!modal);
    setList(posts);
    console.log(list);
  };

  const handlePost = (method, id) => {
    fetch(`https://inst-back-production.up.railway.app/${method}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) =>
          posts._id === result._id ? result : posts
        );
        setData(newData);
        console.log(result);
      });
  };

  const likePost = (id) => handlePost("like", id);

  const unlikePost = (id) => handlePost("unlike", id);

  const makeComment = (text, id) => {
    fetch("https://inst-back-production.up.railway.app/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ text, postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) =>
          posts._id === result._id ? result : posts
        );
        setData(newData);
        setComment("");
        toast.success("Successfully commented");
        console.log(result);
      });
  };
  return (
    <div className="home">
      {/* card */}
      {data.map((post) => (
        <div className="card active-card" key={post._id}>
          <div className="card-header">
            <div className="crad-img">
              <img
                className="card-icon"
                src={post.postedBy.Photo? post.postedBy.Photo: userpic}
                alt=""
                width="60"
                height="60"
              />
            </div>
            <h5 className="card-title">
              <Link to={`/profil/${post.postedBy._id}`}>
                {post.postedBy.name}
              </Link>
            </h5>
          </div>
          <div className="card-image">
            <img className="card-picture" src={post.photo} alt="" />
          </div>
          <div className="card-content">
            <span
              className={`material-symbols-outlined ${
                post.likes.includes(
                  JSON.parse(localStorage.getItem("user"))._id
                )
                  ? "material-symbols-outlined-red"
                  : ""
              }`}
              onClick={() => {
                post.likes.includes(
                  JSON.parse(localStorage.getItem("user"))._id
                )
                  ? unlikePost(post._id)
                  : likePost(post._id);
              }}
            >
              favorite
            </span>
            <p>{post.likes.length} Likes</p>
            <p>{post.body}</p>
            <p className="all-com" onClick={() => modalComment(post)}>
              ALL Commnets
            </p>
          </div>
          <div className="comment">
            <input
              className="comment-input"
              type="text"
              placeholder="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="comment-post"
              onClick={() => makeComment(comment, post._id)}
            >
              Send
            </button>
          </div>
        </div>
      ))}

      {/* all comments modal */}
      {modal && (
        <div className="comment-modal">
          <div className="modal-container">
            <div className="post-img">
              <img src={list.photo} alt="" />
            </div>
            <div className="details">
              <div
                className="card-header"
                style={{ borderBottom: "2px solid #00000029" }}
              >
                <div className="crad-img">
                  <img
                    className="card-icon"
                    src={list.postedBy.Photo? list.postedBy.Photo: userpic}
                    alt=""
                    width="60"
                    height="60"
                  />
                </div>
                <h5 className="card-title">
                  {" "}
                  <Link to={`/profil/${list.postedBy._id}`}>
                    {list.postedBy.name}
                  </Link>
                </h5>
              </div>
              <div
                className="commnet-hero"
                style={{ borderBottom: "2px solid #00000029" }}
              >
                {list.comments.map(({ _id, postedBy, comment }) => (
                  <p className="hero-text" key={_id}>
                    <span className="spanjon">
                      <Link to={`/profil/${postedBy._id}`}>
                        {postedBy.name}
                      </Link>
                    </span>
                    <span className="spanbek"> {comment}</span>
                  </p>
                ))}
              </div>
              <div className="card-content">
                <p>{list.likes.length} Likes</p>
                <p>{list.body}</p>
              </div>
              <div className="comment">
                <input
                  className="comment-input"
                  type="text"
                  placeholder="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  className="comment-post"
                  onClick={() => {
                    makeComment(comment, list._id);
                    modalComment();
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
          <div className="close-modal" onClick={modalComment}>
            <span className="material-symbols-outlined">tab_close_right</span>
          </div>
        </div>
      )}
    </div>
  );
}
