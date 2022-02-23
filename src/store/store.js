import { configureStore, createSlice } from "@reduxjs/toolkit";

const warehouseSlice = createSlice({
  name: "warehouse",
  initialState: { name: "" },
  reducers: {
    searchName(state, action) {
      state.name = action.payload;
    },
  },
});

const warehouseDetailSlice = createSlice({
  name: "warehouseDetail",
  initialState: { info: {} },
  reducers: {
    warehouseInfo(state, action) {
      state.info = action.payload;
    },
  },
});

export const warehouseAction = warehouseSlice.actions;

export const warehouseInfoAction = warehouseDetailSlice.actions;

const store = configureStore({
  reducer: {
    warehouseName: warehouseSlice.reducer,
    warehouseInfo: warehouseDetailSlice.reducer,
  },
});

export default store;
