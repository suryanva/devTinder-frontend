import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: { data: null },
  reducers: {
    addFeed: (state, action) => {
      if (action.payload && action.payload.data) {
        return action.payload;
      }
      return { data: action.payload };
    },
    removeFeed: (state, action) => {
      if (!state.data) return state;
      const newArray = state.data.filter((item) => item._id !== action.payload);
      return { data: newArray };
    },
  },
});

export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
