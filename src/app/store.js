import { configureStore } from "@reduxjs/toolkit";
import photoReducer from "../features/Photo/photoSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    photos: photoReducer,
    user: userReducer
  }
});

export default store;