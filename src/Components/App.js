import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Routing/ProtectedRoute";

import LandingPage from "./Info/Landing/LandingPage";
import LoginPage from "./Info/Landing/LoginPage";
import SignupPage from "./Info/Landing/SignupPage";

import MainBoard from "./Discussion/MainBoard";

import NavBoard from "./Navigation/NavBoard"

import AdminPage from "./Admin/AdminPanel";
import ModPanel from "./Admin/CmtMod/ModPanel";

import Error404 from "./Errors/Error404";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<LandingPage />} />
        <Route path={"login"} element={<LoginPage />} />
        <Route path={"signup"} element={<SignupPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path={"home"} element={<NavBoard mode="home" />} />
          <Route path={"search"} element={<NavBoard mode="search" />} />
          <Route path={"collections"} element={<NavBoard mode="collections" />} />
          <Route path={"discussions/:boardId"} element={<MainBoard />} />
        </Route>
        <Route path={"/admin"} element={<AdminPage />} >
          <Route path="/admin" element={<ModPanel />} />
          <Route path={"comments"} element={<ModPanel />} />
        </Route>
        <Route path={"*"} element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
