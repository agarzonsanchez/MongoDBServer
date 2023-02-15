import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser, getUser } from "../redux/userAction";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.counter.user);
  const [input, setInput] = useState({});
  console.log(user);
  function handleInputChange(e) {
    const value = e.target.value;
    const property = e.target.name;
    setInput({ ...input, [property]: value });
  }
  async function handleSubmit(e) {
    e.preventDefault();

    await dispatch(updateUser({ ...input, data: { id: user._id } }));
    setInput({});
    console.log(user._id);
    await dispatch(getUser(user._id));

    navigate("/dashboard");
    e.target.reset();
  }

  return (
    <div className="container d-flex justify-content-center">
      <form onSubmit={handleSubmit} className="col-6">
        <div className="form-group">
          <h2>Update User Information </h2>
          <label>First Name</label>
          <input
            type="text"
            onChange={handleInputChange}
            className="form-control"
            name="firstName"
            placeholder="First Name"
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            onChange={handleInputChange}
            className="form-control"
            name="lastName"
            placeholder="Last Name"
          />
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            onChange={handleInputChange}
            className="form-control"
            name="email"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            onChange={handleInputChange}
            name="password"
            className="form-control"
            placeholder="Password"
          />
        </div>

        <button type="submit" className="btn btn-primary mb-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
