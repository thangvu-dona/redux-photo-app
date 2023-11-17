import { configureStore } from "@reduxjs/toolkit";
import photoReducer from "../features/Photo/photoSlice";

const store = configureStore({
  reducer: {
    photos: photoReducer,
  }
});

export default store;