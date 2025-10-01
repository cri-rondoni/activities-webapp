import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Walk from "./components/Walk";
import Breath from "./components/Breath";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/walk" element={<Walk />} />
        <Route path="/breath" element={<Breath />} />
      </Routes>
    </BrowserRouter>
  );
}
