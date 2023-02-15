import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {  getUsers, postUser } from "../redux/userAction";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, updateUser } from "../redux/userSlice";
import { useNavigate, Link } from "react-router-dom";

const Counter = () => {
  const form = useRef();
  const firstName = useRef();
  const count = useSelector((state) => state.counter.value);
  const user = useSelector((state) => state.counter.user);
  const [input, setInput] = useState({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();
  console.log(user);

  function handleInputChange(e) {
    const value = e.target.value;
    const property = e.target.name;
    setInput({ ...input, [property]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !input.firstName ||
      !input.lastName ||
      !input.email ||
      !input.password
    ) {
      return setError("Fill all the blanks");
    }

    const data = await dispatch(postUser(input));
    console.log(data);

    if (data.payload.message === "This email was already used") {
      return setError("This email was already used");
    }

    if (data.payload.email) {
      setInput({});
      dispatch(updateUser(data.payload));
      e.target.reset();
      navigate("/dashboard");
    } else {
      console.log(data.payload);
      setInput({});
      e.target.reset();
    }
  }
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <div>
      <div>
        <span>{count}</span>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>

        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Increment
        </button>

        <div className="container col-5 border rounded mt-5">
          {error && (
            <div className="alert alert-primary mt-2" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} ref={form}>
            <div className="form-group">
              <h2>Registration Form </h2>
              <label>First Name</label>
              <input
                type="text"
                ref={firstName}
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
            <div className="form-check">
              <input type="checkbox" className="form-check-input" />
              <label className="form-check-label">
                Acept term and conditions{" "}
              </label>
            </div>
            <button type="submit" className="btn btn-primary mb-2">
              Submit
            </button>
          </form>

          <p>
            You have an account already
            <Link to="/login">
              <span>Sign In!</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Counter;
