import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "requests",
  initialState: { data: null },
  reducers: {
    addRequests: (state, action) => {
      if (action.payload && action.payload.data) {
        return action.payload;
      }
      return { data: action.payload };
    },
    removeRequests: (state, action) => {
      if (!action.payload) return { data: null };
      if (!state.data) return state;
      const newArray = state.data.filter((item) => item._id !== action.payload);
      return { data: newArray };
    },
  },
});

export const { addRequests, removeRequests } = requestsSlice.actions;

export default requestsSlice.reducer;
