import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Walk from "./components/Walk";
import Breath from "./components/Breath";
import Stretch from "./components/Stretch"; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/walk" element={<Walk />} />
        <Route path="/breath" element={<Breath />} />
        <Route path="/stretch" element={<Stretch />} />
      </Routes>
    </BrowserRouter>
  );
}
