import { configureStore, createSlice } from "@reduxjs/toolkit";

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpdp1UyemLbOMT9tnCvVQ_M-OUyYO3__Q",
  authDomain: "warehouse-project-3699f.firebaseapp.com",
  databaseURL: "https://warehouse-project-3699f-default-rtdb.firebaseio.com",
  projectId: "warehouse-project-3699f",
  storageBucket: "warehouse-project-3699f.appspot.com",
  messagingSenderId: "966856164384",
  appId: "1:966856164384:web:83ff94b0e1202d8bc56845",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/** creating slice */
const warehouseSearchSlice = createSlice({
  name: "warehouse",
  initialState: { name: "" },
  reducers: {
    searchName(state, action) {
      state.name = action.payload;
    },
  },
});

const warehouseSlice = createSlice({
  name: "warehouseDetail",
  initialState: { warehouses: [] },
  reducers: {
    updateWarehouses(state, action) {
      state.warehouses = action.payload;
    },
  },
});

export const warehouseSearchAction = warehouseSearchSlice.actions;
export const warehouseAction = warehouseSlice.actions;

const store = configureStore({
  reducer: {
    warehouseSearch: warehouseSearchSlice.reducer,
    warehouses: warehouseSlice.reducer,
  },
});

export default store;
