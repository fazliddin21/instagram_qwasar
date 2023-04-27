import React, { useState, useEffect } from "react";
import addpost from "../images/addpost.svg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Addpost() {
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const notify = (msg, type) => toast[type](msg);

  useEffect(() => {
    if (url) {
      fetch("https://inst-back-production.up.railway.app//createPost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({ body, pic: url }),
      })
        .then((res) => res.json())
        .then((data) => {
          notify(
            data.error || "Post created",
            data.error ? "error" : "success"
          );
          if (!data.error) navigate("/");
        })
        .catch((err) => console.log(err));
    }
  }, [url]);

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "qwasar-insta");
    data.append("cloud_name", "fazikcloud");
    fetch("https://api.cloudinary.com/v1_1/fazikcloud/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    postDetails();
  };

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div className="addpost">
      <h2 style={{ margin: "10px auto" }}>Add New Post</h2>
      <form onSubmit={handleFormSubmit}>
        <textarea
          className="post-body"
          placeholder="What's on your mind?"
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />
        <div className="image-upload">
          {image ? (
            <img
              className="output"
              src={URL.createObjectURL(image)}
              alt="Post"
            />
          ) : (
            <img className="output" src={addpost} alt="Add Post" />
          )}
          <input type="file" onChange={handleFileChange} />
        </div>
        <button className="post-btn" type="submit" disabled={!body || !image}>
          Post
        </button>
      </form>
    </div>
  );
}
