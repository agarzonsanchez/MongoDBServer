import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import img1 from "../../src/img/userProfile.png";
import { getUser } from "../redux/userAction";
const UserLogin = () => {
  const user = useSelector((state) => state.counter.user);

  console.log(user);
  const navigate = useNavigate();
  function handleClick() {
    navigate("/login");
  }

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/updateProfile");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          NAVBAR LOGO
        </a>

        <div
          className="collapse ml-auto navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="nav navbar-nav ms-auto me-3">
            <li className="nav-item active">
              <a className="nav-link link-dark " href="/#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>

            <li className="nav-item" onClick={handleClick}>
              <a className="nav-link link-dark pe-auto" href="/login">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <h3>Dashboard User</h3>
      <div className="container d-flex justify-content-center">
        <div className="card col-6 m-3">
          <img
            className="card-img-top"
            src={img1}
            style={{ backgroundColor: "black" }}
            alt="User Profile"
          />
          <p class="card-text">{user.firstName}</p>
          <p class="card-text">{user.lastName}</p>
          <p class="card-text">{user.email}</p>

          <button className="btn btn-primary" onClick={handleSubmit}>
            Update User Information
          </button>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
