import loadable from "@loadable/component";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Login = loadable(() => import("@pages/LogIn"));
const SignUp = loadable(() => import("@pages/SignUp"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
