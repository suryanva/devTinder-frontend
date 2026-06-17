import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: { data: null },
  reducers: {
    addConnection: (state, action) => {
      if (action.payload && action.payload.data) {
        return action.payload;
      }
      return { data: action.payload };
    },
    removeConnection: () => {
      return { data: null };
    },
  },
});

export const { addConnection, removeConnection } = connectionSlice.actions;

export default connectionSlice.reducer;
