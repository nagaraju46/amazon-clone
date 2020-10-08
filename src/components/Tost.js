import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Tost() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={900}
      hideProgressBar={false}
      newestOnTop={false}
      rtl={false}
      pauseOnHover={false}
      draggable
    />
  );
}
