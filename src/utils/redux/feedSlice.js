import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {},
  reducers: {
    addFeed: (state, action) => {
      // Assuming action.payload has { data: [...] } structure
      return action.payload;
    },
    removeFeed: (state, action) => {
      // Filter the data array within the state
      const newArray = state.data.filter((item) => item._id !== action.payload);
      return { data: newArray };
    },
  },
});

export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
