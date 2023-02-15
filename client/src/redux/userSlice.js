import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  user: {},
  users: [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      console.log(action.payload);
      state.user = action.payload;
    },

    increment: (state) => {
      state.value += 1;
    },

    decrement: (state) => {
      state.value -= 1;
    },
  },

  extraReducers(builder) {
    builder
      .addMatcher(
        (action) =>
          action.type.startsWith("users/") && action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("users/getUser") &&
          action.type.endsWith("fulfilled"),
        (state, action) => {
          state.status = "succeeded";
          state.user = action.payload;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("users/getUsers") &&
          action.type.endsWith("/fulfilled"),
        (state, action) => {
          state.status = "succeeded";
          state.users = action.payload;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("users/getUser") &&
          action.type.endsWith("fulfilled"),
        (state, action) => {
          state.status = "succeeded";
          state.user = action.payload;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("users/postUser") &&
          action.type.endsWith("fulfilled"),
        (state, action) => {
          state.status = "succeeded";
          state.user = action.payload;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("users/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("user/login") &&
          action.type.endsWith("fulfilled"),
        (state, action) => {
          state.status = "succeeded";
          state.error = action.payload;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("user/updateUser") &&
          action.type.endsWith("fulfilled"),
        (state, action) => {
          state.status = "succeeded";
          state.error = action.payload;
        }
      );
  },
});

export const { increment, decrement, updateUser } = counterSlice.actions;

export default counterSlice.reducer;
