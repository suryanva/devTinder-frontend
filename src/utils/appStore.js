import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/userSlice";
import feedReducer from "./redux/feedSlice";
import connectionReducer from "./redux/connectionSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection: connectionReducer,
  },
});

export default appStore;
