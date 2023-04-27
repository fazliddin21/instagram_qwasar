import React, { useState, useEffect, useRef } from "react";

export default function ProfilePic({ changeProfile }) {
  const modalFileInput = useRef(null);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const postDetails = async () => {
    try {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "qwasar-insta");
      data.append("cloud_name", "fazikcloud");
      const response = await fetch("https://api.cloudinary.com/v1_1/fazikcloud/image/upload", { method: "post", body: data });
      setUrl((await response.json()).url);
    } catch (err) {
      console.log(err);
    }
  };

  const postPic = async () => {
    try {
      const response = await fetch("https://inst-back-production.up.railway.app/uploadProfilePic", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({ pic: url }),
      });
      console.log(await response.json());
      changeProfile();
      window.location.reload();
    } catch (err) {
      console.log(err);
      changeProfile();
      window.location.reload();
    }
  };

  const modalClick = () => {
    modalFileInput.current.click();
  };

  useEffect(() => {
    if (image) {
      postDetails();
    }
  }, [image]);

  useEffect(() => {
    if (url) {
      postPic();
    }
  }, [url]);

  return (
    <div className="profile-pic modal-bg">
      <div className="change-img modal-center">
        <div>
          <h2>Change Profile photo</h2>
        </div>
        <div>
          <button className="upload-btn change-btn" onClick={modalClick}>
            Upload Photo
          </button>
          <input
            ref={modalFileInput}
            className="change-input"
            type="file"
            accept="image/*"
            onChange={(evt) => setImage(evt.target.files[0])}
          />
        </div>
        <div>
          <button onClick={() => { setUrl(null); postPic(); }} className="upload-btn delete-btn">Delete Photo</button>
        </div>
        <div>
          <button className="upload-btn" onClick={changeProfile}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
