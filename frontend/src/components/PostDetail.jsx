import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PostDetail({ list, modalDetails }) {
  const navigate = useNavigate();

  const notify = (msg, type) => toast[type](msg);
  const deletePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this post")) {
      fetch(`https://inst-back-production.up.railway.app/deletePost/${postId}`, {
        method: "delete",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          modalDetails();
          navigate("/");
          notify(result.message, "success")
        })
        .catch((error) => notify(error.message, "error"));
    }
  };
  
  return (
    <div className="comment-modal">
      <div className="modal-container">
        <div className="post-img">
          <img src={list.photo} alt="" className="" />
        </div>
        <div className="details">
          {/* card header */}
          <div
            className="card-header"
            style={{ borderBottom: "2px solid #00000029" }}
          >
           
            <h5 className="card-title">{list.postedBy.name}</h5>
          </div>
          <div
            className="commnet-hero"
            style={{ borderBottom: "2px solid #00000029" }}
          >
            {list.comments.map((comment) => (
              <p className="hero-text">
                <span className="spanjon">{comment.postedBy.name} </span>
                <span className="spanbek">{comment.comment}</span>
              </p>
            ))}
          </div>
          <div className="card-content">
            <p>{list.likes.length} Likes</p>
            <p>{list.body}</p>
          </div>
          {/* comment  */}
          
        </div>
      </div>
      <div className="close-modal">
        <span
          className="material-symbols-outlined delete-btn"
          onClick={() => deletePost(list._id)}
        >
          delete
        </span>
        <span
          className="material-symbols-outlined"
          onClick={modalDetails}
        >
          tab_close_right
        </span>
      </div>
    </div>
  );
}
