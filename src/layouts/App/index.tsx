import loadable from "@loadable/component";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Login = loadable(() => import("@pages/LogIn"));
const SignUp = loadable(() => import("@pages/SignUp"));
const Workspace = loadable(() => import("@layouts/Workspace"));
const Channel = loadable(() => import("@pages/Channel"));
const DirectMessage = loadable(() => import("@pages/DirectMessage"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/workspace" element={<Workspace />}>
        <Route path="/workspace/channel" element={<Channel />} />
        <Route path="/workspace/dm" element={<DirectMessage />} />
      </Route>
    </Routes>
  );
}

export default App;
