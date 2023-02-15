import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk("users/getUser", async (id) => {
  try {
    const response = await axios.get(`http://localhost:3001/subscribers/${id}`);

    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  try {
    const response = await axios.get("http://localhost:3001/subscribers/");

    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const postUser = createAsyncThunk("users/postUser", async (user) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/subscribers/subscribe",
      user
    );

    return response.data;
  } catch (err) {
    return err.message;
  }
});

export const login = createAsyncThunk("user/login", async (user) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/subscribers/login",
      user
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
});

export const updateUser = createAsyncThunk("user/updateUser", async (user) => {
  console.log(user);
  try {
    const response = await axios.patch(
      `http://localhost:3001/subscribers/${user.data._id}`,
      user,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (err) {
    return err.message;
  }
});
