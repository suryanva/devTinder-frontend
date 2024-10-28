import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/userSlice";
import feedReducer from "./redux/feedSlice";
import connectionReducer from "./redux/connectionSlice";
import requestsReducer from "./redux/requestsSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection: connectionReducer,
    requests: requestsReducer,
  },
});

export default appStore;
