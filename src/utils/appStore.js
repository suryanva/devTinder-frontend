import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/userSlice";
import feedReducer from "./redux/feedSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
  },
});

export default appStore;
