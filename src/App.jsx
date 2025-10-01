import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Walk from "./components/Walk";
import Breath from "./components/Breath";
import NeckStretch from "./components/NeckStretch";
import SpinalTwist from "./components/SpinalTwist";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/walk" element={<Walk />} />
        <Route path="/breath" element={<Breath />} />
        <Route path="/neck-stretch" element={<NeckStretch />} />
        <Route path="/spinal-twist" element={<SpinalTwist />} />
      </Routes>
    </BrowserRouter>
  );
}
