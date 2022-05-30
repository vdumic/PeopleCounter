import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import GetPeopleNumber from "./components/GetPeopleNumber";
import MaxPeoplePerDay from "./components/MaxPeoplePerDay";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<GetPeopleNumber />} />
        <Route path="/days" element={<MaxPeoplePerDay />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
