import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Modal = ({ setModalOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setModalOpen(false);
    localStorage.clear();
    navigate("./Registration");
  };

  return (
    <div className="modal-bg">
      <div className="modal-center">
        <div className="modal-page">
          <div className="modal-header">
            <h5 className="modal-title">Confirm</h5>
          </div>
          <button className="close-btn" onClick={() => setModalOpen(false)}>
            <RiCloseLine />
          </button>
          <div className="modal-hero">are you really want to log out ?</div>
          <div className="modal-active">
            <div className="active-container">
              <button className="modal-btn log_out-btn" onClick={handleLogout}>
                Log out
              </button>
              <button
                className="modal-btn cansel-btn"
                onClick={() => setModalOpen(false)}
              >
                Cansel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
