import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Routing/ProtectedRoute";

import LandingPage from "./Info/Landing/LandingPage";
import LoginPage from "./Info/Landing/LoginPage";
import SignupPage from "./Info/Landing/SignupPage";
import MainBoard from "./Discussion/TopicBoard/MainBoard";
import NavBoard from "./Discussion/Navigation/NavBoard"
import Error404 from "./Errors/Error404";

function App() {


  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<LandingPage />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/signup"} element={<SignupPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path={"/home"} element={<NavBoard mode="home" />} />
          <Route path={"/search"} element={<NavBoard mode="search" />} />
          <Route path={"/collections"} element={<NavBoard mode="collections" />} />
          <Route path={"/discussions/:boardId"} element={<MainBoard />} />
        </Route>
        <Route path={"*"} element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
