import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainBoard from "./Discussion/TopicBoard/MainBoard";
import NavBoard from "./Discussion/Navigation/NavBoard"
import Error404 from "./Errors/Error404";

function App() {


  return (
    <Router>
      <Routes>
        <Route path={"/home"} element={<NavBoard mode="home" />} />
        <Route path={"/search"} element={<NavBoard mode="search" />} />
        <Route path={"/collections"} element={<NavBoard mode="collections" />} />
        <Route path={"/discussions/:boardId"} element={<MainBoard />} />
        <Route path={"*"} element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
