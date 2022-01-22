import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Routing/ProtectedRoute";

import LandingPage from "./Info/Landing/LandingPage";
import LoginPage from "./Info/Landing/LoginPage";
import SignupPage from "./Info/Landing/SignupPage";

import MainBoard from "./Discussion/MainBoard";

import NavPanel from "./Navigation/NavPanel";

import AdminPage from "./Admin/AdminPanel";
import HomePanel from './Admin/Home/HomePanel'
import BoardsPanel from './Admin/UserBoards/BoardsPanel'
import BoardPanel from './Admin/BoardMng/BoardPanel'
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
          <Route path={"home"} element={<NavPanel mode="home" />} />
          <Route path={"search"} element={<NavPanel mode="search" />} />
          <Route path={"collections"} element={<NavPanel mode="collections" />} />
          <Route path={"discussions/:boardId"} element={<MainBoard />} />
        </Route>
        <Route path={"/admin"} element={<AdminPage />} >
          <Route path="/admin" element={<HomePanel />} />
          <Route path={"userboards"} element={<BoardsPanel />} />
          <Route path={"userboards/:boardId"} element={<BoardPanel />} />
          <Route path={"comments"} element={<ModPanel />} />
        </Route>
        <Route path={"*"} element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
