import React from "react";
import Home from "./pages/Home";
import ToastProvider from "./components/toast/Toast";

function App() {
  return (
    <>
      <ToastProvider />
      <Home />
    </>
  );
}

export default App;
