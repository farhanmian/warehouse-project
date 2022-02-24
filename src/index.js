import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter } from "react-router-dom";
// import { Route, Routes } from "react-router-dom";
// import IndividualWarehouse from "./components/IndividualWarehouse/IndividualWarehouse";

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
// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
