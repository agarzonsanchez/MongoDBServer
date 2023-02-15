import React, { useState } from "react";
import { login, getUser } from "../redux/userAction";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { updateUser } from "../redux/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({});
  const [error, setError] = useState("");

  function handleInputChange(e) {
    const value = e.target.value;
    const property = e.target.name;
    setInput({ ...input, [property]: value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const data = await dispatch(login(input));
    console.log(data);
    if (data.payload.message === "Email wasn't found") {
      return setError("Email wasn't found");
    }
    if (data.payload.message === "Password incorrect. Try again") {
      return setError("Password incorrect. Try again");
    }

    if (data.payload.email) {
      dispatch(updateUser(input));
      const user = await dispatch(getUser(data.payload._id));
      dispatch(updateUser(user.payload));

      navigate("/dashboard");
      setInput({});
      setError("");
    } else {
      setInput({});
      e.target.reset();
    }
  }
  return (
    <div className="container col-5 border rounded mt-5">
      {error && (
        <div className="alert alert-primary mt-2" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <h2>Login </h2>
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
        <button type="submit" className="btn btn-primary m-2">
          Login
        </button>
      </form>
      <p>
        No account?
        <Link to="/registration">
          <span>Create one!</span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
