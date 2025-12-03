import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: [],
  reducers: {
    setOrders: (state, action) => action.payload,
    updateOrder: (state, action) => {
      const index = state.findIndex(o => o.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    }
  }
});

export const { setOrders, updateOrder } = orderSlice.actions;
export default orderSlice.reducer;
